// 일본어 3개월 마스터 프론트엔드 비즈니스 로직

// 애플리케이션 상태 (State)
let state = {
  completedDays: [],   // 완료된 일차 리스트 [1, 2, ...]
  streakDays: 0,       // 연속 학습 일수
  lastLearnDate: null, // 마지막 학습 일자 (YYYY-MM-DD)
  currentDay: 1,       // 현재 대시보드나 미션에서 활성화된 일차
  bookmarks: [],       // 북마크 단어장
  srsWords: [],        // 간격 반복 학습 단어 정보
  selectedVoice: null, // TTS 일본어 보이스 이름
  selectedGender: 'male' // 사용자 성별 설정 ('male' 디폴트, 'female')
};

// 미션 진행 상태
let missionState = {
  active: false,
  timerInterval: null,
  timeLeft: 900,       // 15분 (900초)
  currentStep: 1,      // 1: 단어, 2: 쉐도잉, 3: 롤플레이
  vocabIndex: 0,       // 단어 학습 인덱스
  vocabViewed: new Set(), // 학습 완료한 단어 인덱스들
  shadowIndex: 0,      // 쉐도잉 학습 인덱스
  shadowCount: 0,      // 쉐도잉 체크 횟수
  roleplayNode: null   // 현재 롤플레이 노드 객체
};

// 복습 진행 상태
let reviewState = {
  activeList: [],      // 현재 복습 세션에 들어온 단어 리스트
  currentIndex: 0
};

// 로드맵 필터 단계
let currentRoadmapStage = 1;

// ==========================================
// 1. 초기화 및 이벤트 바인딩
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromLocalStorage();
  initTTS();
  updateProgressStats();
  renderRoadmap();
  checkDailyStreakReset();
  
  // 1초 뒤 한 번 더 보이스 리스트를 가져오는 크롬 호환 패치
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      populateVoiceList();
    };
  }

  // 모바일/사파리 대응: 첫 화면 터치/클릭 제스처 발생 시 음성 목록 로드 및 엔진 잠금 해제(프라이밍)
  const loadVoicesOnGesture = () => {
    if (typeof speechSynthesis !== 'undefined') {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        populateVoiceList();
        
        // 프라이밍 (빈 소리를 내어 모바일 브라우저의 오디오 컨텍스트 강제 활성화)
        try {
          const silentUtterance = new SpeechSynthesisUtterance("");
          silentUtterance.volume = 0;
          speechSynthesis.speak(silentUtterance);
        } catch (e) {
          console.warn("TTS 프라이밍 실패:", e);
        }
        
        // 목록이 한 번 로드되고 활성화되면 리스너 제거
        document.removeEventListener("click", loadVoicesOnGesture);
        document.removeEventListener("touchstart", loadVoicesOnGesture);
      }
    }
  };
  document.addEventListener("click", loadVoicesOnGesture);
  document.addEventListener("touchstart", loadVoicesOnGesture);

  // 윈도우 크기 변화나 탭 포커스 변경 대비 복습 화면 갱신
  refreshReviewStats();
  renderBookmarks();
});

// 로컬 스토리지 데이터 불러오기
function loadStateFromLocalStorage() {
  const savedState = localStorage.getItem("japanese_master_state");
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state.completedDays = parsed.completedDays || [];
      state.streakDays = parsed.streakDays || 0;
      state.lastLearnDate = parsed.lastLearnDate || null;
      state.currentDay = parsed.currentDay || 1;
      state.bookmarks = parsed.bookmarks || [];
      state.srsWords = parsed.srsWords || [];
      state.selectedVoice = parsed.selectedVoice || null;
      state.selectedGender = parsed.selectedGender || 'male';
    } catch (e) {
      console.error("로컬스토리지를 파싱하는데 실패했습니다. 기본값으로 재설정합니다.", e);
    }
  }

  // 성별 UI 연동
  const genderSelect = document.getElementById("tts-gender-select");
  if (genderSelect) {
    genderSelect.value = state.selectedGender;
  }

  // 만약 현재 일차가 완료된 일차에 포함되어 있다면, 다음 학습하지 않은 첫 날을 찾음
  determineNextStudyDay();
}

// 다음 학습 일차 지정
function determineNextStudyDay() {
  if (state.completedDays.length === 0) {
    state.currentDay = 1;
    return;
  }
  
  // 1부터 90까지 중 완료하지 않은 가장 작은 일차를 찾음
  for (let i = 1; i <= 90; i++) {
    if (!state.completedDays.includes(i)) {
      state.currentDay = i;
      return;
    }
  }
  
  // 모두 완료했다면 마지막 90일차로 둔다.
  state.currentDay = 90;
}

// 로컬 스토리지에 데이터 저장
function saveStateToLocalStorage() {
  localStorage.setItem("japanese_master_state", JSON.stringify(state));
}

// 하루가 지나서 연속 일수가 깨졌는지 체크
function checkDailyStreakReset() {
  if (!state.lastLearnDate) return;
  
  const todayStr = getTodayString();
  const lastDate = new Date(state.lastLearnDate);
  const today = new Date(todayStr);
  
  // 두 날짜의 차이 계산 (밀리초 -> 일)
  const diffTime = Math.abs(today - lastDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // 마지막 완료일이 어제 이전(2일 이상 차이)이라면 스트릭을 0으로 초기화
  if (diffDays > 1) {
    state.streakDays = 0;
    saveStateToLocalStorage();
    updateProgressStats();
  }
}

// 오늘 날짜 YYYY-MM-DD 반환
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ==========================================
// 2. 화면 네비게이션 및 진척도 업데이트
// ==========================================

// SPA 탭 스위칭
function switchTab(tabId) {
  // 모든 뷰 비활성화
  const views = document.querySelectorAll(".content-view");
  views.forEach(v => v.classList.remove("active"));
  
  // 모든 네비 버튼 비활성화
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => item.classList.remove("active"));
  
  // 타겟 뷰 및 메뉴 활성화
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) targetView.classList.add("active");
  
  const targetNav = document.getElementById(`nav-${tabId}`);
  if (targetNav) targetNav.classList.add("active");
  
  // 탭 이동 시 미션 타이머 정리 (대시보드로 그냥 나갈 때 대비)
  if (tabId !== 'learn' && missionState.active) {
    pauseTimer();
  }

  // 탭 전환 시 복습 데이터 갱신
  if (tabId === 'review') {
    refreshReviewStats();
  } else if (tabId === 'dictionary') {
    renderBookmarks();
  } else if (tabId === 'dashboard') {
    renderRoadmap();
    updateProgressStats();
  }
}

// 진척도 정보 동기화
function updateProgressStats() {
  const completedCount = state.completedDays.length;
  const percentage = Math.round((completedCount / 90) * 100);
  
  // 사이드바 요소 갱신
  document.getElementById("sidebar-streak-days").innerText = `${state.streakDays}일째`;
  document.getElementById("sidebar-progress-fill").style.width = `${percentage}%`;
  document.getElementById("sidebar-progress-text").innerText = `완료율 ${percentage}% (${completedCount}일/90일)`;
  
  // 대시보드 요약 정보 갱신
  document.getElementById("dash-completed-days-text").innerText = `${completedCount}일 완료`;
  
  // 오늘 미션 완료 여부 파악
  const isTodayDone = state.completedDays.includes(state.currentDay);
  const mStatus = document.getElementById("dash-today-mission-status");
  if (isTodayDone) {
    mStatus.innerText = `오늘 학습 완료! ✨ (Day ${state.currentDay})`;
    mStatus.style.color = "var(--accent-mint)";
  } else {
    mStatus.innerText = `시작 전 (Day ${state.currentDay} - 15분)`;
    mStatus.style.color = "var(--color-text-main)";
  }

  // 현재 스테이지 요약 배지
  const stageBadge = document.getElementById("top-stage-badge");
  if (state.currentDay <= 30) {
    stageBadge.innerText = "1단계: 생존 기초";
  } else if (state.currentDay <= 60) {
    stageBadge.innerText = "2단계: 일상 회화";
  } else {
    stageBadge.innerText = "3단계: 심화 & 여행";
  }
}

// ==========================================
// 3. 로드맵 렌더링
// ==========================================

function filterRoadmapStage(stageNum) {
  currentRoadmapStage = stageNum;
  // 버튼 클래스 변경
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`btn-stage-${i}`);
    if (i === stageNum) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
  renderRoadmap();
}

function renderRoadmap() {
  const gridContainer = document.getElementById("roadmap-grid");
  gridContainer.innerHTML = "";
  
  // 단계별 일차 설정
  let startDay = 1;
  let endDay = 30;
  if (currentRoadmapStage === 2) {
    startDay = 31;
    endDay = 60;
  } else if (currentRoadmapStage === 3) {
    startDay = 61;
    endDay = 90;
  }

  // 그리드 렌더링
  for (let day = startDay; day <= endDay; day++) {
    const btn = document.createElement("button");
    btn.className = "roadmap-day-btn";
    
    const isCompleted = state.completedDays.includes(day);
    const isCurrent = state.currentDay === day;
    const isLocked = day > Math.max(...state.completedDays, 0) + 1 && !isCompleted && !isCurrent;
    
    if (isCompleted) {
      btn.classList.add("done");
      btn.innerHTML = `
        <span class="day-btn-num">${day}</span>
        <span class="day-btn-check">✓</span>
      `;
    } else if (isCurrent) {
      btn.classList.add("current");
      btn.innerHTML = `
        <span class="day-btn-num">${day}</span>
        <span class="day-btn-check">🔥</span>
      `;
    } else if (isLocked) {
      btn.classList.add("locked");
      btn.innerHTML = `
        <span class="day-btn-num">${day}</span>
        <span class="day-btn-lock">🔒</span>
      `;
      btn.disabled = true;
    } else {
      // 해금은 되었으나 아직 안 한 날
      btn.innerHTML = `
        <span class="day-btn-num">${day}</span>
        <span class="day-btn-check">▶</span>
      `;
    }

    if (!isLocked) {
      btn.onclick = () => selectRoadmapDay(day);
    }
    
    gridContainer.appendChild(btn);
  }
}

function selectRoadmapDay(day) {
  state.currentDay = day;
  saveStateToLocalStorage();
  updateProgressStats();
  
  // 선택 효과를 위해 로드맵 다시 그리기
  renderRoadmap();
  
  // 알림 메시지 업데이트 및 안내
  document.getElementById("top-subtitle").innerText = `Day ${day} 학습 코스를 선택하셨습니다.`;
}

// ==========================================
// 4. 오늘의 15분 미션 로직 (Step 1 -> Step 2 -> Step 3)
// ==========================================

// 대시보드 등에서 오늘의 학습 시작 버튼을 누를 때
function startTodayMission() {
  // 현재 일차 데이터 가져오기
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (!dayData) {
    alert("데이터를 찾을 수 없습니다.");
    return;
  }

  // 미션 상태 세팅
  missionState.active = true;
  missionState.timeLeft = 900; // 15분 리셋
  missionState.currentStep = 1;
  missionState.vocabIndex = 0;
  missionState.vocabViewed.clear();
  missionState.vocabViewed.add(0); // 첫 단어는 조회함
  missionState.shadowIndex = 0;
  missionState.shadowCount = 0;
  missionState.roleplayNode = null;
  
  // UI 텍스트 업데이트
  document.getElementById("learn-day-badge").innerText = `Day ${state.currentDay}`;
  document.getElementById("learn-day-title").innerText = dayData.title;
  
  // 스텝 노출 제어
  goStep(1);
  
  // 타이머 작동 시작
  startTimer();

  // 단어 카드 세팅
  renderVocabCard();
  
  // 탭 이동
  switchTab('learn');
}

// 타이머 시작
function startTimer() {
  if (missionState.timerInterval) clearInterval(missionState.timerInterval);
  
  updateTimerUI();
  document.getElementById("timer-toggle-btn").innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  `;

  missionState.timerInterval = setInterval(() => {
    missionState.timeLeft--;
    updateTimerUI();
    
    if (missionState.timeLeft <= 0) {
      clearInterval(missionState.timerInterval);
      alert("⏰ 설정한 15분 학습 시간이 다 되었습니다! 오늘치 학습을 마저 완료하거나 대시보드로 돌아가세요.");
    }
  }, 1000);
}

// 타이머 일시정지
function pauseTimer() {
  clearInterval(missionState.timerInterval);
  missionState.timerInterval = null;
  document.getElementById("timer-toggle-btn").innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  `;
}

// 타이머 재생/정지 토글
function toggleTimer() {
  if (missionState.timerInterval) {
    pauseTimer();
  } else {
    startTimer();
  }
}

// 타이머 리셋 (15분 원상복구)
function resetTimer() {
  pauseTimer();
  missionState.timeLeft = 900;
  updateTimerUI();
}

function updateTimerUI() {
  const min = Math.floor(missionState.timeLeft / 60);
  const sec = missionState.timeLeft % 60;
  document.getElementById("mission-timer").innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// 스텝 변경 제어
function goStep(stepNum) {
  missionState.currentStep = stepNum;
  
  // 단계별 콘텐츠 숨김/노출
  for (let i = 1; i <= 3; i++) {
    const content = document.getElementById(`mission-step-${i}`);
    const indicator = document.getElementById(`step-ind-${i}`);
    const line = document.getElementById(`step-line-${i-1}`);
    
    if (i === stepNum) {
      content.classList.add("active");
      indicator.classList.add("active");
      indicator.classList.remove("done");
    } else if (i < stepNum) {
      content.classList.remove("active");
      indicator.classList.remove("active");
      indicator.classList.add("done");
      if (line) line.classList.add("done");
    } else {
      content.classList.remove("active");
      indicator.classList.remove("active");
      indicator.classList.remove("done");
      if (line) line.classList.remove("done");
    }
  }

  // 스텝별 진입 시 액션
  if (stepNum === 2) {
    // 쉐도잉 시작
    renderShadowingCard();
    resetShadowingCheckboxes();
  } else if (stepNum === 3) {
    // 롤플레이 챗봇 시작
    startRoleplayChat();
  }
}

// ------------------------------------------
// [Step 1] 단어 학습 로직
// ------------------------------------------

function renderVocabCard() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (!dayData || !dayData.vocabulary || dayData.vocabulary.length === 0) return;
  
  const vocab = dayData.vocabulary[missionState.vocabIndex];
  
  // 앞면 뒤집기 복구
  document.getElementById("vocab-card").classList.remove("flipped");
  
  // 바인딩
  document.getElementById("vocab-word").innerText = vocab.word;
  document.getElementById("vocab-kana").innerText = vocab.kana;
  document.getElementById("vocab-romaji").innerText = vocab.romaji;
  
  document.getElementById("vocab-meaning").innerText = vocab.meaning;
  document.getElementById("vocab-example-jp").innerText = vocab.example ? vocab.example.split(" (")[0] : "";
  document.getElementById("vocab-example-ko").innerText = vocab.example ? vocab.example.slice(vocab.example.indexOf("(") + 1, vocab.example.length - 1) : "";

  // 별표(북마크) 상태 체크
  const isBookmarked = state.bookmarks.some(b => b.word === vocab.word);
  const bookmarkBtn = document.getElementById("vocab-bookmark-btn");
  if (isBookmarked) {
    bookmarkBtn.classList.add("active");
    bookmarkBtn.innerText = "★";
  } else {
    bookmarkBtn.classList.remove("active");
    bookmarkBtn.innerText = "☆";
  }

  // 페이징 인디케이터
  document.getElementById("vocab-current-idx").innerText = missionState.vocabIndex + 1;
  document.getElementById("vocab-total-idx").innerText = dayData.vocabulary.length;

  // 다음 스텝 전환 버튼 활성화 조건 체크
  checkVocabCompletion();
}

function flipCard() {
  const card = document.getElementById("vocab-card");
  card.classList.toggle("flipped");
}

function prevVocab() {
  if (missionState.vocabIndex > 0) {
    missionState.vocabIndex--;
    renderVocabCard();
  }
}

function nextVocab() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (missionState.vocabIndex < dayData.vocabulary.length - 1) {
    missionState.vocabIndex++;
    missionState.vocabViewed.add(missionState.vocabIndex);
    renderVocabCard();
  }
}

function checkVocabCompletion() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  const total = dayData.vocabulary.length;
  const viewButton = document.getElementById("btn-goto-step-2");
  
  // 모든 단어를 1회 이상 봤다면 다음 단계 활성화
  if (missionState.vocabViewed.size >= total) {
    viewButton.disabled = false;
  } else {
    viewButton.disabled = true;
  }
}

// 단어 즐겨찾기 북마크 토글
function toggleVocabularyBookmark(event) {
  event.stopPropagation(); // 카드 플립 이벤트 전파 방지
  
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  const vocab = dayData.vocabulary[missionState.vocabIndex];
  
  const idx = state.bookmarks.findIndex(b => b.word === vocab.word);
  const btn = document.getElementById("vocab-bookmark-btn");
  
  if (idx > -1) {
    state.bookmarks.splice(idx, 1);
    btn.classList.remove("active");
    btn.innerText = "☆";
  } else {
    state.bookmarks.push({
      word: vocab.word,
      kana: vocab.kana,
      romaji: vocab.romaji,
      meaning: vocab.meaning,
      example: vocab.example || ""
    });
    btn.classList.add("active");
    btn.innerText = "★";
  }
  
  saveStateToLocalStorage();
  renderBookmarks();
}

// ------------------------------------------
// [Step 2] 오디오 쉐도잉 로직
// ------------------------------------------

function renderShadowingCard() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (!dayData || !dayData.shadowing || dayData.shadowing.length === 0) return;
  
  const shadow = dayData.shadowing[missionState.shadowIndex];
  
  document.getElementById("shadow-kana-text").innerText = shadow.kana;
  document.getElementById("shadow-jp-text").innerText = shadow.jp;
  document.getElementById("shadow-romaji-text").innerText = shadow.romaji;
  document.getElementById("shadow-translation-text").innerText = shadow.translation;
  document.getElementById("shadow-tip-text").innerText = shadow.tip || "입술 모양과 강세를 따라 읊조려보세요.";

  document.getElementById("shadow-current-idx").innerText = missionState.shadowIndex + 1;
  document.getElementById("shadow-total-idx").innerText = dayData.shadowing.length;
}

function prevShadow() {
  if (missionState.shadowIndex > 0) {
    missionState.shadowIndex--;
    renderShadowingCard();
    resetShadowingCheckboxes();
  }
}

function nextShadow() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (missionState.shadowIndex < dayData.shadowing.length - 1) {
    missionState.shadowIndex++;
    renderShadowingCard();
    resetShadowingCheckboxes();
  }
}

function resetShadowingCheckboxes() {
  const checkboxes = document.querySelectorAll(".counter-checkboxes input");
  checkboxes.forEach(cb => cb.checked = false);
  document.getElementById("btn-goto-step-3").disabled = true;
}

function checkShadowCount() {
  const checkboxes = document.querySelectorAll(".counter-checkboxes input");
  let checkedCount = 0;
  checkboxes.forEach(cb => { if (cb.checked) checkedCount++; });
  
  const isLastExpression = (missionState.shadowIndex === (window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay).shadowing.length - 1));
  const step3Btn = document.getElementById("btn-goto-step-3");
  
  // 5번 이상 연습(5번째 체크박스 체크 등)을 완료하고 마지막 쉐도잉 문장일 때 step3 활성화
  if (checkedCount >= 5) {
    if (isLastExpression) {
      step3Btn.disabled = false;
    } else {
      // 다음 표현 학습을 위해 안내
      document.getElementById("shadow-audio-status").innerText = "훌륭합니다! 다음 표현으로 이동해 주세요.";
    }
  }
}

// ------------------------------------------
// [Step 3] 롤플레이 챗봇 로직
// ------------------------------------------

function startRoleplayChat() {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
  if (!dayData || !dayData.roleplay || dayData.roleplay.length === 0) return;
  
  const chatWindow = document.getElementById("chat-window");
  chatWindow.innerHTML = "";
  
  const optionsContainer = document.getElementById("chat-options-container");
  optionsContainer.innerHTML = "";
  
  document.getElementById("btn-complete-mission").style.display = "none";

  // 첫 번째 대사 노드 (보통 id가 없는 첫 객체) 로드
  const startNode = dayData.roleplay[0];
  renderRoleplayNode(startNode);
}

function renderRoleplayNode(node) {
  missionState.roleplayNode = node;
  const chatWindow = document.getElementById("chat-window");
  
  // 상대방 대사 버블 추가
  appendChatBubble("native", node.speaker, node.text, node.translation);
  
  // 대답 패널에 상태 표시 (재생 중 입력 방지)
  const optionsContainer = document.getElementById("chat-options-container");
  optionsContainer.innerHTML = `<p style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic; text-align:center; padding:1rem;">👂 상대방(${node.speaker})이 말하는 중...</p>`;
  
  // 딜레이 재생 (TTS) - 상대방 성별 적용 및 완료 후 옵션 해금
  playTTS(null, null, node.text, 'native').then(() => {
    // 상대방의 말이 끝나면 대답 버튼 노출
    optionsContainer.innerHTML = "";
    
    if (node.options && node.options.length > 0) {
      node.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `
          <span class="opt-jp">${opt.text}</span>
          <span class="opt-tr">${opt.reply}</span>
        `;
        btn.onclick = () => selectRoleplayOption(opt);
        optionsContainer.appendChild(btn);
      });
    } else {
      // 다음 노드가 없고 대화가 끝난 경우
      optionsContainer.innerHTML = "<p style='color:var(--accent-mint); font-weight:700;'>🎉 대화가 완료되었습니다!</p>";
      document.getElementById("btn-complete-mission").style.display = "inline-flex";
    }
  });
}

function selectRoleplayOption(option) {
  // 사용자 버블 추가
  appendChatBubble("user", "나", option.text, option.reply);
  
  // 옵션 패널 비우고 말하기 상태 표시
  const optionsContainer = document.getElementById("chat-options-container");
  optionsContainer.innerHTML = `<p style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic; text-align:center; padding:1rem;">🗣️ 내 대사 말하는 중...</p>`;
  
  // 사용자 음성 재생 - 사용자 성별 적용
  playTTS(null, null, option.text, 'user').then(() => {
    // 내 말이 끝나면 상대방이 생각하는 짧은 정적 딜레이(0.8초) 후 응답 로드
    optionsContainer.innerHTML = `<p style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic; text-align:center; padding:1rem;">💬 상대방이 생각 중...</p>`;
    
    setTimeout(() => {
      const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === state.currentDay);
      if (option.next !== null && option.next !== undefined) {
        const nextNode = dayData.roleplay.find(n => n.id === option.next);
        if (nextNode) {
          renderRoleplayNode(nextNode);
        }
      } else {
        // 대화 종료
        optionsContainer.innerHTML = "<p style='color:var(--accent-mint); font-weight:700;'>🎉 대화가 완료되었습니다!</p>";
        document.getElementById("btn-complete-mission").style.display = "inline-flex";
      }
    }, 800);
  });
}

function appendChatBubble(type, speaker, jpText, trText) {
  const chatWindow = document.getElementById("chat-window");
  const msg = document.createElement("div");
  msg.className = `chat-msg ${type}`;
  
  // HTML dataset을 활용해 따옴표 문자가 JavaScript 인라인 호출을 깨뜨리지 않도록 방어합니다.
  msg.innerHTML = `
    <span class="chat-speaker">${speaker}</span>
    <div class="chat-bubble" data-jp="${jpText}" data-type="${type}" onclick="playChatBubble(this)" title="클릭하면 다시 들을 수 있습니다. 🔊">
      <p class="bubble-jp">${jpText}</p>
      <p class="bubble-tr">${trText}</p>
    </div>
  `;
  
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight; // 자동 스크롤 다운
}

// 롤플레이 챗버블 클릭 시 다시 듣기 기능
function playChatBubble(element) {
  const jpText = element.getAttribute("data-jp");
  const type = element.getAttribute("data-type");
  if (!jpText) return;
  
  // 대화 흐름 동기화를 깨뜨리지 않고 음성만 백그라운드 재생 처리
  playTTS(null, null, jpText, type === 'user' ? 'user' : 'native');
}

// ------------------------------------------
// 미션 완료 및 스트릭 갱신
// ------------------------------------------

function finishTodayMission() {
  pauseTimer();
  
  const todayStr = getTodayString();
  const dayCompleted = state.currentDay;
  
  // 이미 완료한 날이 아니라면 기록 갱신
  if (!state.completedDays.includes(dayCompleted)) {
    state.completedDays.push(dayCompleted);
    
    // 스트릭 계산
    if (state.lastLearnDate === todayStr) {
      // 오늘 학습을 여러 개 했을 땐 스트릭 변화 없음
    } else {
      // 연속 학습 처리
      const lastDate = state.lastLearnDate ? new Date(state.lastLearnDate) : null;
      const today = new Date(todayStr);
      
      if (lastDate && (today - lastDate) / (1000 * 60 * 60 * 24) === 1) {
        state.streakDays++; // 연속 하루 증가
      } else {
        state.streakDays = 1; // 첫 시작 또는 끊김 후 시작
      }
      state.lastLearnDate = todayStr;
    }
    
    // 단어들을 복습 시스템에 등록 (Spaced Repetition)
    addWordsToSRS(dayCompleted);
  }

  saveStateToLocalStorage();
  updateProgressStats();
  
  // 축하 모달 실행
  showSuccessModal();
}

function addWordsToSRS(dayNum) {
  const dayData = window.JAPANESE_CURRICULUM.find(item => item.day === dayNum);
  if (!dayData || !dayData.vocabulary) return;
  
  const todayStr = getTodayString();
  
  dayData.vocabulary.forEach(vocab => {
    // 중복 등록 방지
    const exists = state.srsWords.some(w => w.word === vocab.word);
    if (!exists) {
      state.srsWords.push({
        word: vocab.word,
        kana: vocab.kana,
        romaji: vocab.romaji,
        meaning: vocab.meaning,
        example: vocab.example || "",
        nextReviewDate: todayStr, // 바로 다음 복습 가능하게 설정
        intervalDays: 1,          // 1일 간격 시작
        easeFactor: 2.5           // 기본 쉬움 배율
      });
    }
  });
}

// 모달 다이얼로그 노출
function showSuccessModal() {
  const modal = document.getElementById("success-modal");
  document.getElementById("modal-success-desc").innerHTML = `Day ${state.currentDay} 학습을 훌륭히 마쳤습니다.<br>15분 매일의 힘이 쌓이고 있습니다!`;
  document.getElementById("modal-streak-num").innerText = `${state.streakDays}일째`;
  
  modal.classList.add("active");
  
  // 파티클 축하 효과 작동
  triggerCanvasCelebration();
}

function closeSuccessModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("active");
  
  // 다음 학습 일차 지정
  determineNextStudyDay();
  saveStateToLocalStorage();
  
  // 대시보드로 복귀
  switchTab('dashboard');
}

// ==========================================
// 5. 간격 반복 복습 (Spaced Repetition) 알고리즘
// ==========================================

function refreshReviewStats() {
  const todayStr = getTodayString();
  
  // 복습할 단어 목록 필터링 (nextReviewDate가 오늘이거나 오늘 이전인 것)
  const pendingList = state.srsWords.filter(w => {
    return new Date(w.nextReviewDate) <= new Date(todayStr);
  });
  
  document.getElementById("dash-review-count").innerText = `${pendingList.length} 개`;
  document.getElementById("review-pending-count").innerText = pendingList.length;
  
  const btnReview = document.getElementById("btn-start-review");
  if (pendingList.length === 0) {
    btnReview.innerText = "복습 완료 👍";
    btnReview.disabled = true;
  } else {
    btnReview.innerText = "지금 복습 시작";
    btnReview.disabled = false;
  }
}

function startSpacedReview() {
  const todayStr = getTodayString();
  
  // 복습 대상 단어 추출
  reviewState.activeList = state.srsWords.filter(w => {
    return new Date(w.nextReviewDate) <= new Date(todayStr);
  });
  
  if (reviewState.activeList.length === 0) return;
  
  reviewState.currentIndex = 0;
  
  // 복습 영역 활성화
  document.getElementById("review-dashboard").style.display = "none";
  document.getElementById("spaced-review-area").style.display = "flex";
  
  renderReviewCard();
}

function renderReviewCard() {
  const cardData = reviewState.activeList[reviewState.currentIndex];
  if (!cardData) {
    exitReview();
    return;
  }
  
  // 리셋 플립
  document.getElementById("review-flashcard").classList.remove("flipped");
  
  document.getElementById("review-word").innerText = cardData.word;
  document.getElementById("review-kana").innerText = cardData.kana;
  document.getElementById("review-romaji").innerText = cardData.romaji;
  
  document.getElementById("review-meaning").innerText = cardData.meaning;
  document.getElementById("review-example-jp").innerText = cardData.example ? cardData.example.split(" (")[0] : "";
  document.getElementById("review-example-ko").innerText = cardData.example ? cardData.example.slice(cardData.example.indexOf("(") + 1, cardData.example.length - 1) : "";
}

function flipReviewCard() {
  document.getElementById("review-flashcard").classList.toggle("flipped");
}

// Spaced Repetition Core 알고리즘 (SuperMemo-2 기반 응용)
function submitSRSFeedback(grade) {
  const cardData = reviewState.activeList[reviewState.currentIndex];
  if (!cardData) return;
  
  // 전체 srsWords에서 해당 단어를 찾음
  const wordObj = state.srsWords.find(w => w.word === cardData.word);
  if (!wordObj) return;

  const today = new Date();
  
  // 쉬움, 보통, 어려움에 따른 차등 보상 간격 일수 부여
  if (grade === 'easy') {
    wordObj.easeFactor = Math.max(1.3, wordObj.easeFactor + 0.15);
    wordObj.intervalDays = Math.ceil(wordObj.intervalDays * wordObj.easeFactor);
    if (wordObj.intervalDays < 4) wordObj.intervalDays = 4; // 쉬움은 최소 4일
  } else if (grade === 'medium') {
    wordObj.intervalDays = Math.ceil(wordObj.intervalDays * 1.5);
    if (wordObj.intervalDays < 1) wordObj.intervalDays = 1;
  } else if (grade === 'hard') {
    wordObj.easeFactor = Math.max(1.3, wordObj.easeFactor - 0.2);
    wordObj.intervalDays = 0; // 즉시 혹은 하루 안에 다시 뜨게 함
  }

  // 다음 복습 날짜 계산
  const nextDate = new Date();
  nextDate.setDate(today.getDate() + wordObj.intervalDays);
  
  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const day = String(nextDate.getDate()).padStart(2, '0');
  wordObj.nextReviewDate = `${year}-${month}-${day}`;

  saveStateToLocalStorage();

  // 다음 단어로 진행
  reviewState.currentIndex++;
  if (reviewState.currentIndex < reviewState.activeList.length) {
    renderReviewCard();
  } else {
    alert("오늘의 복습 세션이 전부 끝났습니다! 수고하셨습니다. 👏");
    exitReview();
  }
}

function exitReview() {
  document.getElementById("spaced-review-area").style.display = "none";
  document.getElementById("review-dashboard").style.display = "block";
  refreshReviewStats();
}

// ==========================================
// 6. 나만의 단어장 (Bookmarks)
// ==========================================

function renderBookmarks() {
  const tbody = document.getElementById("dict-list-tbody");
  const emptyState = document.getElementById("dict-empty-state");
  
  tbody.innerHTML = "";
  
  if (state.bookmarks.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  
  emptyState.style.display = "none";
  
  state.bookmarks.forEach(vocab => {
    const tr = document.createElement("tr");
    
    // 예문 가공
    const exJp = vocab.example ? vocab.example.split(" (")[0] : "";
    const exKo = vocab.example ? vocab.example.slice(vocab.example.indexOf("(") + 1, vocab.example.length - 1) : "";

    tr.innerHTML = `
      <td class="dict-word-cell">${vocab.word}</td>
      <td class="dict-kana-cell">${vocab.kana}</td>
      <td class="dict-romaji-cell">${vocab.romaji}</td>
      <td class="dict-meaning-cell">${vocab.meaning}</td>
      <td>
        <div class="dict-ex-jp">${exJp}</div>
        <div class="dict-ex-ko">${exKo}</div>
      </td>
      <td>
        <button class="dict-action-btn" onclick="removeBookmark('${vocab.word}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function removeBookmark(word) {
  const idx = state.bookmarks.findIndex(b => b.word === word);
  if (idx > -1) {
    state.bookmarks.splice(idx, 1);
    saveStateToLocalStorage();
    renderBookmarks();
  }
}

// 검색 필터
function filterDictionary() {
  const query = document.getElementById("dict-search-input").value.toLowerCase();
  const rows = document.querySelectorAll("#dict-list-tbody tr");
  
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(query)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// ==========================================
// 7. TTS 음성 재생 엔진 (Web Speech API)
// ==========================================

function initTTS() {
  if (typeof speechSynthesis === 'undefined') {
    console.warn("이 브라우저는 Web Speech API(음성 합성)를 지원하지 않습니다.");
    return;
  }
  
  populateVoiceList();
}

// 일본어 보이스 성별 분석 유틸리티
function getVoiceGender(voice) {
  const name = voice.name.toLowerCase();
  // 명시적 남성 키워드 매칭
  if (name.includes("keita") || name.includes("daichi") || name.includes("naoki") || name.includes("male") || name.includes("man") || name.includes("ichiro")) {
    return "male";
  }
  // 기본적으로 남성이 아니면 여성/중성으로 간주 (TTS 보이스 대다수가 여성)
  return "female";
}

// 보이스 품질 점수 산정 (자연어 보이스 최우선)
function getVoiceQualityScore(voice) {
  const name = voice.name.toLowerCase();
  let score = 0;
  if (name.includes("natural") || name.includes("online") || name.includes("neural")) {
    score += 100; // Neural/Online/Natural 고품질
  }
  if (name.includes("google")) {
    score += 50;  // Google 고품질 TTS
  }
  if (name.includes("microsoft")) {
    score += 20;  // MS 기본 탑재
  }
  return score;
}

function populateVoiceList() {
  const select = document.getElementById("tts-voice-select");
  if (!select) return;
  
  select.innerHTML = "";
  const voices = speechSynthesis.getVoices();
  
  // 일본어 보이스 필터링 및 고품질 순 정렬 (대소문자 구분 없앰)
  const jaVoices = voices
    .filter(v => {
      const lang = v.lang.toLowerCase();
      return lang.startsWith("ja") || lang.includes("jp");
    })
    .sort((a, b) => getVoiceQualityScore(b) - getVoiceQualityScore(a));
  
  if (jaVoices.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.innerText = "기본 일본어 음성 (미설치)";
    select.appendChild(opt);
    return;
  }

  // 현재 선택된 성별에 맞춰 우선 필터링
  const targetGender = state.selectedGender || 'male';
  const matchingVoices = jaVoices.filter(v => getVoiceGender(v) === targetGender);
  const otherVoices = jaVoices.filter(v => getVoiceGender(v) !== targetGender);
  
  // 최종 정렬된 리스트 (성별 일치 보이스를 위로)
  const sortedVoices = [...matchingVoices, ...otherVoices];
  
  sortedVoices.forEach(voice => {
    const opt = document.createElement("option");
    opt.value = voice.name;
    const genderTag = getVoiceGender(voice) === 'male' ? '남성' : '여성';
    const qualityTag = getVoiceQualityScore(voice) >= 50 ? '⭐ 고음질' : '기본';
    opt.innerText = `${voice.name} (${genderTag} / ${qualityTag})`;
    
    // 이전에 저장된 보이스와 일치하면 선택
    if (state.selectedVoice === voice.name) {
      opt.selected = true;
    }
    
    select.appendChild(opt);
  });

  // 매칭 보이스가 없거나 현재 보이스가 성별 필터에 맞지 않는 경우, 성별 일치 그룹의 첫 번째를 자동 선택
  const currentVoiceObj = jaVoices.find(v => v.name === state.selectedVoice);
  const isGenderMatched = currentVoiceObj && getVoiceGender(currentVoiceObj) === targetGender;
  
  if ((!state.selectedVoice || !isGenderMatched) && matchingVoices.length > 0) {
    state.selectedVoice = matchingVoices[0].name;
    // select 엘리먼트 갱신
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === state.selectedVoice) {
        select.options[i].selected = true;
        break;
      }
    }
    saveStateToLocalStorage();
  } else if (!state.selectedVoice && jaVoices.length > 0) {
    // 남성 전용 보이스가 없는 OS 환경인 경우, 그냥 첫 번째 가용 일본어 보이스 선택
    state.selectedVoice = jaVoices[0].name;
    saveStateToLocalStorage();
  }
}

// 성별 드롭다운 변경 시 트리거
function changeTtsGender() {
  const genderSelect = document.getElementById("tts-gender-select");
  state.selectedGender = genderSelect.value;
  
  // 보이스 설정을 초기화하여 새로운 성별에 어울리는 디폴트가 잡히도록 유도
  state.selectedVoice = null;
  saveStateToLocalStorage();
  
  // 리스트 재배치
  populateVoiceList();
}

function saveVoiceSettings() {
  const select = document.getElementById("tts-voice-select");
  state.selectedVoice = select.value;
  
  // 선택한 보이스의 실제 성별을 파악하여 selectedGender 상태와도 싱크를 맞춰줌
  const voices = speechSynthesis.getVoices();
  const matched = voices.find(v => v.name === state.selectedVoice);
  if (matched) {
    const actualGender = getVoiceGender(matched);
    state.selectedGender = actualGender;
    
    const genderSelect = document.getElementById("tts-gender-select");
    if (genderSelect) genderSelect.value = actualGender;
  }
  
  saveStateToLocalStorage();
}

function toggleTtsSettings() {
  const panel = document.getElementById("tts-settings-panel");
  const isOpen = panel.classList.toggle("open");
  
  // 패널이 열릴 때 최신 음성 목록을 다시 한 번 갱신합니다.
  if (isOpen) {
    populateVoiceList();
  }
}

// 일본어 텍스트 음성 출력 (성별 및 자연어 튜닝 탑재 - Promise 기반 동기화 지원)
function playTTS(event, elementId, rawText = null, forceGender = null) {
  if (event) event.stopPropagation(); // 버튼 이벤트 버블링 방지
  
  return new Promise((resolve) => {
    if (typeof speechSynthesis === 'undefined') {
      resolve();
      return;
    }
    
    let text = rawText;
    if (!text && elementId) {
      text = document.getElementById(elementId).innerText;
    }
    
    if (!text) {
      resolve();
      return;
    }
    
    // 후리가나, 한글 번역, 괄호 등 텍스트 정제
    text = text.replace(/[\u3131-\u318E\uAC00-\uD7A3]/g, ""); // 한글 문자 제거
    text = text.replace(/\([^)]*\)/g, ""); // 괄호 내부 텍스트 제거
    text = text.trim();

    // 음성 합성 발화 객체 생성
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    
    // 가비지 컬렉터(GC)로 인해 재생 도중 콜백이 소멸되는 현상 방지
    window.currentUtterance = utterance;
    
    const voices = speechSynthesis.getVoices();
    const jaVoices = voices.filter(v => v.lang.startsWith("ja") || v.lang.includes("JP"));
    
    let targetVoice = null;

    // 롤플레이 시 화자 구분 재생 처리
    if (forceGender === 'user') {
      // 사용자 대사: 사용자가 설정한 성별 보이스 사용
      const gender = state.selectedGender || 'male';
      targetVoice = jaVoices.find(v => v.name === state.selectedVoice) || jaVoices.find(v => getVoiceGender(v) === gender) || jaVoices[0];
    } else if (forceGender === 'native') {
      // 상대방 대사: 사용자의 반대 성별 보이스를 매칭하여 롤플레이 생동감 부여
      const oppositeGender = (state.selectedGender === 'male') ? 'female' : 'male';
      targetVoice = jaVoices.find(v => getVoiceGender(v) === oppositeGender && v.name !== state.selectedVoice) 
                    || jaVoices.find(v => getVoiceGender(v) === oppositeGender) 
                    || jaVoices.find(v => v.name !== state.selectedVoice)
                    || jaVoices[0];
    } else {
      // 일반 단어/쉐도잉: 사용자가 명시한 보이스 적용
      targetVoice = jaVoices.find(v => v.name === state.selectedVoice) || jaVoices[0];
    }

    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    // ------------------------------------------
    // 목소리 톤 자연화 튜닝 (기계음 감소)
    // ------------------------------------------
    const isOnlineNeural = targetVoice && (targetVoice.name.toLowerCase().includes("natural") || targetVoice.name.toLowerCase().includes("online") || targetVoice.name.toLowerCase().includes("neural"));
    const voiceGender = targetVoice ? getVoiceGender(targetVoice) : 'female';

    if (isOnlineNeural) {
      // 고품질 뉴럴 음성: 최적 품질 유지를 위해 원래 톤 유지
      utterance.rate = 0.98;
      utterance.pitch = 1.0;
    } else {
      // 일반 오프라인 TTS: 속도를 약간 늦추고 성별에 맞는 피치 조절로 기계음 순화
      utterance.rate = 0.92; // 조금 천천히 말해 발음 식별을 쉽게 함
      if (voiceGender === 'male') {
        utterance.pitch = 0.88; // 남성은 차분하고 중후한 저음으로 피치를 낮춤
      } else {
        utterance.pitch = 1.06; // 여성은 명쾌하고 부드러운 고음
      }
    }
    
    // 재생 완료 콜백 바인딩
    const statusEl = document.getElementById("shadow-audio-status");
    if (statusEl) {
      statusEl.innerText = "🔊 음성 재생 중...";
    }

    utterance.onend = () => {
      if (statusEl) statusEl.innerText = "재생 완료. 따라 해보세요!";
      if (window.currentUtterance === utterance) {
        window.currentUtterance = null;
      }
      resolve();
    };

    utterance.onerror = (err) => {
      console.warn("TTS 재생 중 에러 발생:", err);
      if (statusEl) {
        statusEl.innerText = `⚠️ 재생 오류: ${err.error || '지원되지 않는 보이스'}`;
      }
      if (window.currentUtterance === utterance) {
        window.currentUtterance = null;
      }
      resolve();
    };

    // 크롬 및 모바일 브라우저의 cancel - speak 타이밍 버그 해결
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      // cancel() 상태 전이가 완료될 수 있도록 약간의 딜레이 후 speak 호출
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 100);
    } else {
      // 재생 중인 오디오가 없으면 동기식으로 즉시 speak를 호출하여 iOS/Safari의 사용자 액티베이션 정책 만족
      speechSynthesis.speak(utterance);
    }
  });
}

// ==========================================
// 8. Canvas 파티클 축하 효과
// ==========================================

function triggerCanvasCelebration() {
  const canvas = document.getElementById("canvas-particles");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ["#ff7e9e", "#ff4b72", "#34d399", "#4facfe", "#fbbf24"];
  const particles = [];
  
  // 파티클 생성
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: width / 2,
      y: height / 2 + 50,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.005
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    let activeParticles = 0;
    
    particles.forEach(p => {
      if (p.alpha > 0) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // 중력 가속도
        p.vx *= 0.98; // 공기 저항
        p.alpha -= p.decay;
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        activeParticles++;
      }
    });
    
    if (activeParticles > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = "none";
    }
  }
  
  animate();
}
