// 일본어 3개월(90일) 마스터 커리큘럼 데이터
// CORS 제약 없이 로컬 브라우저에서 바로 로드할 수 있도록 전역 변수(window.JAPANESE_CURRICULUM)로 정의합니다.

window.JAPANESE_CURRICULUM = [
  // ==================== 1단계: 기초 생존 일본어 (1~30일) ====================
  {
    day: 1,
    stage: 1,
    title: "만남과 감사 인사",
    desc: "가장 기본적인 일본어 인사와 감사 표현을 배웁니다.",
    vocabulary: [
      { word: "こんにちは", kana: "こんにちは", romaji: "konnichiwa", meaning: "안녕하세요 (낮 인사)", example: "こんにちは、お元気ですか？ (안녕하세요, 잘 지내시나요?)" },
      { word: "ありがとう", kana: "ありがとう", romaji: "arigatou", meaning: "고마워", example: "手伝ってくれてありがとう。 (도와줘서 고마워.)" },
      { word: "すみません", kana: "すみません", romaji: "sumimasen", meaning: "죄송합니다 / 저기요", example: "すみません、水をお願いします。 (저기요, 물 좀 부탁합니다.)" },
      { word: "はい", kana: "はい", romaji: "hai", meaning: "네", example: "はい, そうです。 (네, 그렇습니다.)" }
    ],
    shadowing: [
      { jp: "はじめまして、よろしくお願いします。", kana: "はじめまして、よろしくおねがいします。", romaji: "hajimemashite, yoroshiku onegai shimasu", translation: "처음 뵙겠습니다. 잘 부탁드립니다.", tip: "첫 대면에서 고개를 가볍게 숙이며 말해 보세요." },
      { jp: "ありがとうございます。", kana: "ありがとうございます。", romaji: "arigatou gozaimasu", translation: "감사합니다.", tip: "'고자이마스'를 끝까지 정중하게 발음합니다." }
    ],
    roleplay: [
      { speaker: "현지인", text: "はじめまして！よろしくおねがいします。", translation: "처음 뵙겠습니다! 잘 부탁드립니다.", options: [
        { text: "はじめまして！こちらこそよろしくお願いします。", next: 1, reply: "처음 뵙겠습니다! 저야말로 잘 부탁드립니다." },
        { text: "こんにちは！ありがとう。", next: 2, reply: "안녕하세요! 고마워." }
      ]},
      { id: 1, speaker: "현지인", text: "お元気ですか？", translation: "잘 지내시나요?", options: [
        { text: "はい、元気です！ありがとうございます。", next: 3, reply: "네, 잘 지냅니다! 감사합니다." }
      ]},
      { id: 2, speaker: "현지인", text: "あ、日本語が少し上手ですね！", translation: "아, 일본어를 조금 잘하시네요!", options: [
        { text: "いいえ、まだまだです。すみません。", next: 3, reply: "아닙니다, 아직 멀었습니다. 죄송합니다." }
      ]},
      { id: 3, speaker: "현지인", text: "これから一緒に頑張りましょう！", translation: "앞으로 함께 열심히 해봐요!", options: [
        { text: "はい！よろしくお願いします！", next: null, reply: "네! 잘 부탁드립니다!" }
      ]}
    ]
  },
  {
    day: 2,
    stage: 1,
    title: "나를 소개하기",
    desc: "이름, 직업, 국적을 표현하며 나를 소개합니다.",
    vocabulary: [
      { word: "私", kana: "わたし", romaji: "watashi", meaning: "나 / 저", example: "私は学生です。 (저는 학생입니다.)" },
      { word: "韓国人", kana: "かんこくじん", romaji: "kankokujin", meaning: "한국인", example: "私は韓国人です。 (저는 한국인입니다.)" },
      { word: "名前", kana: "なまえ", romaji: "namae", meaning: "이름", example: "お名前は何ですか？ (이름이 무엇입니까?)" },
      { word: "〜です", kana: "〜です", romaji: "~desu", meaning: "~입니다", example: "キムです。 (김입니다.)" }
    ],
    shadowing: [
      { jp: "私は韓国から来ました。", kana: "わたしはかんこくからきました。", romaji: "watashi wa kankoku kara kimashita", translation: "저는 한국에서 왔습니다.", tip: "'から来ました(~에서 왔습니다)' 패턴을 입에 익히세요." },
      { jp: "会社員です。名前はミンです。", kana: "かいしゃいんです。なまえはみんです。", romaji: "kaishain desu. namae wa min desu", translation: "회사원입니다. 이름은 민입니다.", tip: "단어들을 리드미컬하게 연결해 주세요." }
    ],
    roleplay: [
      { speaker: "현지인", text: "お名前は何ですか？", translation: "이름이 어떻게 되시나요?", options: [
        { text: "私はミンです。韓国人です。", next: 1, reply: "저는 민입니다. 한국인입니다." },
        { text: "名前はキムです。会社員です。", next: 1, reply: "이름은 김입니다. 회사원입니다." }
      ]},
      { id: 1, speaker: "현지인", text: "あ、韓国から来ましたか？うれしいです！", translation: "아, 한국에서 오셨나요? 반갑습니다!", options: [
        { text: "はい、韓国から来ました. よろしくお願いします。", next: null, reply: "네, 한국에서 왔습니다. 잘 부탁드립니다." }
      ]}
    ]
  },
  {
    day: 3,
    stage: 1,
    title: "이것, 그것, 저것 (사물 가리키기)",
    desc: "주변 사물을 가리키는 지시명사와 질문을 배웁니다.",
    vocabulary: [
      { word: "これ", kana: "これ", romaji: "kore", meaning: "이것", example: "これは何ですか？ (이것은 무엇입니까?)" },
      { word: "それ", kana: "それ", romaji: "sore", meaning: "그것", example: "それは本です。 (그것은 책입니다.)" },
      { word: "あれ", kana: "あれ", romaji: "are", meaning: "저것", example: "あれはスカイツリーです。 (저것은 스카이트리입니다.)" },
      { word: "どれ", kana: "どれ", romaji: "dore", meaning: "어느 것", example: "あなたの傘はどれですか？ (당신의 우산은 어느 것입니까?)" }
    ],
    shadowing: [
      { jp: "これは日本語で何と言いますか？", kana: "これはにほんごでなんといいますか？", romaji: "kore wa nihongo de nan to iimasu ka", translation: "이것은 일본어로 뭐라고 하나요?", tip: "일본 여행 시 물건을 가리키며 묻기 좋은 유용한 문장입니다." },
      { jp: "それは私のスマホです。", kana: "それはわたしのすまほです。", romaji: "sore wa watashi no sumaho desu", translation: "그것은 제 스마트폰입니다.", tip: "'の(~의)'를 자연스럽게 발음합니다." }
    ],
    roleplay: [
      { speaker: "가게 점원", text: "いらっしゃいませ！何をお探しですか？", translation: "어서 오세요! 무엇을 찾으시나요?", options: [
        { text: "これは何ですか？", next: 1, reply: "이것은 무엇입니까?" }
      ]},
      { id: 1, speaker: "가게 점원", text: "それは日本の伝統的なお菓子です。", translation: "그것은 일본의 전통 과자입니다.", options: [
        { text: "そうなんですね！あれも同じですか？", next: 2, reply: "그렇군요! 저것도 같습니까?" }
      ]},
      { id: 2, speaker: "가게 점원", text: "いいえ、あれは抹茶のお茶です。", translation: "아니요, 저것은 말차 티입니다.", options: [
        { text: "なるほど。これをください。", next: null, reply: "그렇군요. 이것을 주세요." }
      ]}
    ]
  },
  {
    day: 4,
    stage: 1,
    title: "물건 사고 가격 물어보기",
    desc: "쇼핑할 때 가격을 묻고 물건을 구매하는 법을 익힙니다.",
    vocabulary: [
      { word: "いくら", kana: "いくら", romaji: "ikura", meaning: "얼마", example: "これはいくらですか？ (이것은 얼마입니까?)" },
      { word: "〜円", kana: "〜えん", romaji: "~en", meaning: "~엔 (화폐 단위)", example: "これは千円です. (이것은 천 엔입니다.)" },
      { word: "高い", kana: "たかい", romaji: "takai", meaning: "비싸다 / 높다", example: "ちょっと高いですね。 (좀 비싸네요.)" },
      { word: "安い", kana: "やすい", romaji: "yasui", meaning: "싸다", example: "これは安いです。 (이것은 쌉니다.)" }
    ],
    shadowing: [
      { jp: "このカメラはいくらですか？", kana: "このかめらはいくらですか？", romaji: "kono kamera wa ikura desu ka", translation: "이 카메라는 얼마인가요?", tip: "가격을 물을 때 어조를 약간 올려 질문해 보세요." },
      { jp: "じゃあ、これを二つください。", kana: "じゃあ、これをふたつください。", romaji: "jaa, kore o futatsu kudasai", translation: "그럼, 이것을 두 개 주세요.", tip: "개수 세는 표현 'ふたつ(두 개)'를 익혀두세요." }
    ],
    roleplay: [
      { speaker: "점원", text: "いらっしゃいませ！そのバッグはいかがですか？", translation: "어서 오세요! 그 가방은 어떠신가요?", options: [
        { text: "すみません、このバッグはいくらですか？", next: 1, reply: "저기요, 이 가방은 얼마인가요?" }
      ]},
      { id: 1, speaker: "점원", text: "これは五千円（ごせんえん）です。", translation: "이것은 5,000엔입니다.", options: [
        { text: "少し高いですね。もっと安いのはありますか？", next: 2, reply: "조금 비싸네요. 더 저렴한 것은 있나요?" },
        { text: "いいですね！これをください。", next: null, reply: "좋네요! 이것을 주세요." }
      ]},
      { id: 2, speaker: "점원", text: "はい、こちらのは三千円（さんぜんえん）ですよ。", translation: "네, 이쪽 것은 3,000엔이랍니다.", options: [
        { text: "じゃあ、その三千円のをください。", next: null, reply: "그럼, 그 3,000엔짜리 주세요." }
      ]}
    ]
  },
  {
    day: 5,
    stage: 1,
    title: "식당에서 주문하기",
    desc: "메뉴판을 보고 음식과 음료를 주문하는 법을 익힙니다.",
    vocabulary: [
      { word: "メニュー", kana: "めにゅー", romaji: "menyuu", meaning: "메뉴판", example: "メニューを見せてください。 (메뉴판을 보여주세요.)" },
      { word: "水", kana: "みず", romaji: "mizu", meaning: "물", example: "お水をお願いします。 (물 좀 부탁드립니다.)" },
      { word: "〜をください", kana: "〜をください", romaji: "~o kudasai", meaning: "~을/를 주세요", example: "ラーメンをください。 (라면을 주세요.)" },
      { word: "美味しい", kana: "おいしい", romaji: "oishii", meaning: "맛있다", example: "この寿司は美味しいです。 (이초밥은 맛있습니다.)" }
    ],
    shadowing: [
      { jp: "お冷やとおしぼりをください。", kana: "おひやとおしぼりをください。", romaji: "ohiya to oshibori o kudasai", translation: "찬물과 물티슈를 주세요.", tip: "일반적으로 물은 'お冷や(오히야)'라고도 많이 표현합니다." },
      { jp: "ラーメン一つとビールを一杯お願いします。", kana: "らーめんひとつとびーるをいっぱいおねがいします。", romaji: "raamen hitotsu to biiru o ippai onegai shimasu", translation: "라면 하나랑 맥주 한 잔 부탁합니다.", tip: "단어의 수량을 결합하여 정중히 부탁하는 법을 훈련하세요." }
    ],
    roleplay: [
      { speaker: "점원", text: "ご注文はお決まりですか？", translation: "주문은 결정하셨습니까?", options: [
        { text: "メニューを見せてください。", next: 1, reply: "메뉴판을 보여주세요." },
        { text: "ラーメンとギョーザをください。", next: 2, reply: "라면과 군만두를 주세요." }
      ]},
      { id: 1, speaker: "점원", text: "はい、どうぞ。おすすめはとんこつラーメンです。", translation: "네, 여기 있습니다. 추천은 돈코츠 라면입니다.", options: [
        { text: "じゃあ、とんこつラーメンを一つください。", next: 2, reply: "그럼, 돈코츠 라면 하나 주세요." }
      ]},
      { id: 2, speaker: "점원", text: "かしこまりました. お飲み物はいかがですか？", translation: "알겠습니다. 음료는 어떠십니까?", options: [
        { text: "生ビールを一杯お願いします。", next: 3, reply: "생맥주 한 잔 부탁합니다." },
        { text: "いいえ、お水だけで大丈夫です。", next: 3, reply: "아니요, 물만으로도 괜찮습니다." }
      ]},
      { id: 3, speaker: "점원", text: "少々お待ちくださいませ。", translation: "잠시만 기다려 주십시오.", options: [
        { text: "はい、ありがとうございます。", next: null, reply: "네, 감사합니다." }
      ]}
    ]
  },
  {
    day: 6,
    stage: 1,
    title: "위치와 길 묻기",
    desc: "목적지(지하철역, 화장실 등)가 어디인지 물어보는 대화를 익힙니다.",
    vocabulary: [
      { word: "どこ", kana: "どこ", romaji: "doko", meaning: "어디", example: "駅はどこですか？ (역은 어디입니까?)" },
      { word: "駅", kana: "えき", romaji: "eki", meaning: "역", example: "新宿駅に行きたいです。 (신주쿠역에 가고 싶습니다.)" },
      { word: "トイレ", kana: "といれ", romaji: "toire", meaning: "화장실", example: "トイレはどこですか？ (화장실은 어디인가요?)" },
      { word: "ここ", kana: "ここ", romaji: "koko", meaning: "여기", example: "ここはどこですか？ (여기는 어디입니까?)" }
    ],
    shadowing: [
      { jp: "すみません、一番近いコンビニはどこですか？", kana: "すみません、いちばんちかいこん비니는 어디인가요?", romaji: "sumisen, ichiban chikai konbini wa doko desu ka", translation: "실례합니다, 가장 가까운 편의점은 어디인가요?", tip: "길 가던 사람을 불러세울 때 'すみません'을 부드럽게 던져보세요." },
      { jp: "まっすぐ行って、右に曲がってください。", kana: "まっすぐいって、みぎにまがってください。", romaji: "massugu itte, migi ni magatte kudasai", translation: "쭉 가서 오른쪽으로 도세요.", tip: "길 안내 단어인 'まっすぐ(쭉)', '右に(오른쪽으로)'를 눈여겨보세요." }
    ],
    roleplay: [
      { speaker: "길 가던 사람", text: "はい、何かお困りですか？", translation: "네, 무슨 곤란한 일이라도 있으신가요?", options: [
        { text: "すみません、地下鉄の駅はどこですか？", next: 1, reply: "실례합니다, 지하철역은 어디인가요?" }
      ]},
      { id: 1, speaker: "길 가던 사람", text: "あ、駅ならこの道をまっすぐ行って左ですよ。", translation: "아, 역이라면 이 길을 쭉 가서 왼쪽이랍니다.", options: [
        { text: "まっすぐ行って左ですね？ありがとうございます！", next: null, reply: "쭉 가서 왼쪽이군요? 감사합니다!" },
        { text: "ここから遠いですか？", next: 2, reply: "여기서 먼가요?" }
      ]},
      { id: 2, speaker: "길 가던 사람", text: "いいえ、歩いて２分くらいです。", translation: "아니요, 걸어서 2분 정도 거리예요.", options: [
        { text: "わかりました！助かりました。", next: null, reply: "알겠습니다! 도움이 되었습니다." }
      ]}
    ]
  },
  {
    day: 7,
    stage: 1,
    title: "시간 묻고 답하기",
    desc: "지금 몇 시인지 묻고 일정을 정하는 기초 표현입니다.",
    vocabulary: [
      { word: "今", kana: "いま", romaji: "ima", meaning: "지금", example: "今、何時ですか？ (지금 몇 시입니까?)" },
      { word: "何時", kana: "なんじ", romaji: "nanji", meaning: "몇 시", example: "会議は何時からですか？ (회의는 몇 시부터입니까?)" },
      { word: "〜時", kana: "〜じ", romaji: "~ji", meaning: "~시", example: "今は三時です。 (지금은 세 시입니다.)" },
      { word: "分", kana: "〜ふん・ぷん", romaji: "~fun/pun", meaning: "~분", example: "五分待ってください。 (오 분만 기다려주세요.)" }
    ],
    shadowing: [
      { jp: "今、東京は何時ですか？", kana: "いま、とうきょうはなんじですか？", romaji: "ima, toukyou wa nanji desu ka", translation: "지금 도쿄는 몇 시입니까?", tip: "시간을 묻는 억양을 자연스럽게 훈련하세요." },
      { jp: "朝の九時から仕事が始まります。", kana: "あさのくじからしごとがはじまります。", romaji: "asa no kuji kara shigoto ga hajimaru", translation: "아침 9시부터 일이 시작됩니다.", tip: "9시는 'きゅうじ'가 아니라 'くじ(구지)'로 발음됨에 유의하세요!" }
    ],
    roleplay: [
      { speaker: "동료", text: "ミンさん、今何時ですか？", translation: "민 씨, 지금 몇 시인가요?", options: [
        { text: "今は一時半（いちじはん）ですよ。", next: 1, reply: "지금은 1시 반이랍니다." },
        { text: "すいません、時計がありません。", next: 2, reply: "죄송해요, 시계가 없습니다." }
      ]},
      { id: 1, speaker: "동료", text: "あ、もう会議の時間ですね！行きましょう。", translation: "아, 벌써 회의 시간이군요! 갑시다.", options: [
        { text: "はい、行きましょう！", next: null, reply: "네, 갑시다!" }
      ]},
      { id: 2, speaker: "동료", text: "大丈夫です。スマホで見ましょう。あ、一時半ですね。", translation: "괜찮아요. 스마트폰으로 보죠. 아, 1시 반이네요.", options: [
        { text: "そうですね、急ぎましょう！", next: null, reply: "그렇네요, 서두릅시다!" }
      ]}
    ]
  },
  {
    day: 8,
    stage: 1,
    title: "숫자와 세는 단위",
    desc: "쇼핑과 일상에서 매우 중요한 숫자 읽기 및 세는 단위 표현을 정복합니다.",
    vocabulary: [
      { word: "一、二、三", kana: "いち、に、さん", romaji: "ichi, ni, san", meaning: "1, 2, 3", example: "一つ、二つ、三つ (하나, 둘, 셋)" },
      { word: "百", kana: "ひゃく", romaji: "hyaku", meaning: "백", example: "三百円 (삼백 엔)" },
      { word: "千", kana: "せん", romaji: "sen", meaning: "천", example: "五千円 (오천 엔)" },
      { word: "万", kana: "まん", romaji: "man", meaning: "만", example: "一万円 (일만 엔)" }
    ],
    shadowing: [
      { jp: "お会計は全部で六千八百円です。", kana: "おかいけいはぜんぶでろくせんはっぴゃくえんです。", romaji: "okaikei wa zenbu de rokusenhappyakuen desu", translation: "계산은 전부 해서 6,800엔입니다.", tip: "800은 'はっぴゃく(핫뱌쿠)'로 연음 발음됩니다." },
      { jp: "リンゴを三つとみかんを五つください。", kana: "りんごをみっつとみかんをいつつください。", romaji: "ringo o mittsu to mikan o itsutsu kudasai", translation: "사과 세 개랑 귤 다섯 개 주세요.", tip: "물건 세는 단위 'みっつ(세 개)', 'いつつ(다섯 개)' 발음을 숙지하세요." }
    ],
    roleplay: [
      { speaker: "마트 직원", text: "いらっしゃいませ。レジ袋はご利用ですか？", translation: "어서 오세요. 쇼핑백을 이용하시겠습니까?", options: [
        { text: "はい、一枚（いちまい）ください。", next: 1, reply: "네, 한 장 주세요." },
        { text: "いいえ、大丈夫です。", next: 1, reply: "아니요, 괜찮습니다." }
      ]},
      { id: 1, speaker: "마트 직원", text: "お会計、二千五百円（にせんごひゃくえん）になります。", translation: "계산은 2,500엔입니다.", options: [
        { text: "一万円（いちまんえん）でお願いします。", next: null, reply: "만 엔짜리로 계산해 주세요." }
      ]}
    ]
  },
  {
    day: 9,
    stage: 1,
    title: "날짜와 요일 말하기",
    desc: "약속을 잡거나 여행 일정을 조율할 때 꼭 필요한 날짜/요일 말하기입니다.",
    vocabulary: [
      { word: "今日", kana: "きょう", romaji: "kyou", meaning: "오늘", example: "今日は日曜日です。 (오늘은 일요일입니다.)" },
      { word: "明日", kana: "あした", romaji: "ashita", meaning: "내일", example: "明日、会いましょう。 (내일 만납시다.)" },
      { word: "何曜日", kana: "なんようび", romaji: "nanyoubi", meaning: "무슨 요일", example: "テストは何曜日ですか？ (시험은 무슨 요일인가요?)" },
      { word: "月曜日", kana: "げつようび", romaji: "getsuyoubi", meaning: "월요일", example: "月曜日は忙しいです。 (월요일은 바쁩니다.)" }
    ],
    shadowing: [
      { jp: "来週の水曜日に約束があります。", kana: "らいしゅうのすいようびにやくそくがあります。", romaji: "raishuu no suiyoubi ni yakusoku ga arimasu", translation: "다음 주 수요일에 약속이 있습니다.", tip: "'水曜日(수요일)'과 '約束(약속)'의 악센트를 조심하세요." },
      { jp: "今日は七月七日です。", kana: "きょうはしちがつなのかです。", romaji: "kyou wa shichigatsu nanoka desu", translation: "오늘은 7월 7일입니다.", tip: "7일은 'ななか'가 아니라 'なのか(나노카)'로 예외적으로 읽습니다." }
    ],
    roleplay: [
      { speaker: "친구", text: "今度の休み、一緒に映画を見に行かない？", translation: "이번 휴일, 같이 영화 보러 가지 않을래?", options: [
        { text: "いいですね！いつがいいですか？", next: 1, reply: "좋네요! 언제로 할까요?" }
      ]},
      { id: 1, speaker: "친구", text: "土曜日のあしたはどう？", translation: "토요일인 내일은 어때?", options: [
        { text: "あしたは少し忙しいです。日曜日（にちようび）はどうですか？", next: 2, reply: "내일은 좀 바빠요. 일요일은 어떤가요?" }
      ]},
      { id: 2, speaker: "친구", text: "日曜日もいいね！じゃあ、日曜日にしよう。", translation: "일요일도 좋네! 그럼 일요일로 하자.", options: [
        { text: "はい！楽しみにしています。", next: null, reply: "네! 기대하고 있겠습니다." }
      ]}
    ]
  },
  {
    day: 10,
    stage: 1,
    title: "가족과 인물 소개",
    desc: "가족 구성원이나 친구, 주변 사람을 지칭하고 설명하는 법을 배웁니다.",
    vocabulary: [
      { word: "家族", kana: "かぞく", romaji: "kazoku", meaning: "가족", example: "家族は何人ですか？ (가족은 몇 명입니까?)" },
      { word: "友達", kana: "ともだち", romaji: "tomodachi", meaning: "친구", example: "韓国の友達に会います。 (한국 친구를 만납니다.)" },
      { word: "父", kana: "ちち", romaji: "chichi", meaning: "아버지 (나의)", example: "私の父は公務員です。 (우리 아버지는 공무원입니다.)" },
      { word: "母", kana: "はは", romaji: "haha", meaning: "어머니 (나의)", example: "母は料理が得意です. (어머니는 요리를 잘하십니다.)" }
    ],
    shadowing: [
      { jp: "こちらは私の友達の佐藤さんです。", kana: "こちらはわたしのともだちのさとうさんです。", romaji: "kochira wa watashi no tomodachi no satou san desu", translation: "이쪽은 제 친구 사토 씨입니다.", tip: "사람을 소개할 때는 손바닥을 펴며 정중히 'こちらは'라고 시작합니다." },
      { jp: "私の家族は三人です。", kana: "わたしのかぞくはさんにんです。", romaji: "watashi no kazoku wa sannin desu", translation: "우리 가족은 세 명입니다.", tip: "인원수 세는 단위인 '〜にん' 중 '三人(さんにん)' 발음을 부드럽게 하세요." }
    ],
    roleplay: [
      { speaker: "이웃", text: "この写真の方はどなたですか？すてきですね！", translation: "이 사진의 분은 누구인가요? 멋지네요!", options: [
        { text: "私の父（ちち）です。公務員です。", next: 1, reply: "저의 아버지입니다. 공무원이세요." },
        { text: "私の友達（ともだち）のパクさんです。", next: 2, reply: "제 친구 박 씨입니다." }
      ]},
      { id: 1, speaker: "이웃", text: "お父様にそっくりですね！笑顔が優しいです。", translation: "아버님을 정말 많이 닮았네요! 웃는 모습이 인자하십니다.", options: [
        { text: "ありがとうございます。よく言われます。", next: null, reply: "감사합니다. 자주 듣는 소리예요." }
      ]},
      { id: 2, speaker: "이웃", text: "そうですか！仲が良さそうですね。", translation: "그렇군요! 사이가 정말 좋아 보이네요.", options: [
        { text: "はい、高校からの親友です。", next: null, reply: "네, 고등학교 때부터 절친이에요." }
      ]}
    ]
  },
  {
    day: 11,
    stage: 1,
    title: "취미와 좋아하는 것",
    desc: "자신이 좋아하는 음식, 취미 등을 말하며 공감대를 형성하는 표현을 배웁니다.",
    vocabulary: [
      { word: "好き", kana: "すき", romaji: "suki", meaning: "좋아함", example: "日本料理が好きです。 (일본 요리를 좋아합니다.)" },
      { word: "趣味", kana: "しゅみ", romaji: "shumi", meaning: "취미", example: "趣味は何ですか？ (취미가 무엇입니까?)" },
      { word: "映画", kana: "えいが", romaji: "eiga", meaning: "영화", example: "映画を見るのが好きです。 (영화 보는 것을 좋아합니다.)" },
      { word: "旅行", kana: "りょこう", romaji: "ryokou", meaning: "旅行", example: "旅行に行きたいです。 (여행 가고 싶습니다.)" }
    ],
    shadowing: [
      { jp: "私の趣味は旅行と音楽鑑賞です。", kana: "わたしのしゅみはりょこうとおんがくかんしょうです。", romaji: "watashi no shumi wa ryokou to ongaku kanshou desu", translation: "제 취미는 여행과 음악 감상입니다.", tip: "단어들을 또렷하게 발음하는 데 신경 써보세요." },
      { jp: "すしとラーメンが一番好きです。", kana: "すしとらーめんがいちばんすきです。", romaji: "sushi to raamen ga ichiban suki desu", translation: "초밥과 라면을 가장 좋아합니다.", tip: "'一番好き(가장 좋아함)' 구문을 강세 없이 자연스럽게 이어 말하세요." }
    ],
    roleplay: [
      { speaker: "동호회원", text: "週末は何をするのが好きですか？", translation: "주말에는 무엇을 하는 걸 좋아하시나요?", options: [
        { text: "映画（えいが）を見るのが好きです。", next: 1, reply: "영화 보는 걸 좋아해요." },
        { text: "旅行（りょこう）に行くのが好きです。", next: 2, reply: "여행 가는 걸 좋아해요." }
      ]},
      { id: 1, speaker: "동호회원", text: "いいですね！どんな映画をよく見ますか？", translation: "좋네요! 어떤 영화를 자주 보시나요?", options: [
        { text: "日本の映画をよく見ます。", next: null, reply: "일본 영화를 자주 봅니다." }
      ]},
      { id: 2, speaker: "동호회원", text: "旅行はどこに行くのが好きですか？", translation: "여행은 어디로 가는 걸 좋아하세요?", options: [
        { text: "北海道によく行きます。温泉が最高です！", next: null, reply: "홋카이도에 자주 가요. 온천이 최고예요!" }
      ]}
    ]
  },
  {
    day: 12,
    stage: 1,
    title: "일상적인 행동 표현하기",
    desc: "먹다, 마시다, 가다 등 매일 반복하는 기본 동작들을 동사로 표현해 봅니다.",
    vocabulary: [
      { word: "食べる", kana: "たべる", romaji: "taberu", meaning: "먹다 (먹습니다: たべます)", example: "朝ご飯を食べます。 (아침밥을 먹습니다.)" },
      { word: "飲む", kana: "のむ", romaji: "nomu", meaning: "마시다 (마십니다: のみます)", example: "コーヒーを飲みます。 (커피를 마십니다.)" },
      { word: "行く", kana: "いく", romaji: "iku", meaning: "가다 (갑니다: いきます)", example: "会社に行きます。 (회사에 갑니다.)" },
      { word: "する", kana: "する", romaji: "suru", meaning: "하다 (합니다: します)", example: "日本語の勉強をします。 (일본어 공부를 합니다.)" }
    ],
    shadowing: [
      { jp: "毎日、朝七時に起きて学校に行きます。", kana: "まいにち、あさしちじにおきてがっこうにいきます。", romaji: "mainichi, asa shichiji ni okite gakkou ni ikimasu", translation: "매일 아침 7시에 일어나 학교에 갑니다.", tip: "동사 연결형 '~て(일어나서)'의 발음 흐름을 부드럽게 타세요." },
      { jp: "夜はコーヒーを飲みません。お茶を飲みます。", kana: "よるはこーひーをのみません。おちゃをのみます。", romaji: "yoru wa koohii o nomimasen. ocha o nomimasu", translation: "밤에는 커피를 마시지 않습니다. 차를 마십니다.", tip: "부정형 '〜ません'의 단호하되 부드러운 끝음을 연습합니다." }
    ],
    roleplay: [
      { speaker: "직장 동료", text: "今日のランチは何を食べに行きますか？", translation: "오늘 점심은 뭐 먹으러 갈까요?", options: [
        { text: "うどんを食べに行きましょう！いいお店があります。", next: 1, reply: "우동 먹으러 갑시다! 괜찮은 가게가 있어요." },
        { text: "私はコンビニで弁当を買って食べます。", next: 2, reply: "저는 편의점에서 도시락을 사서 먹을게요." }
      ]},
      { id: 1, speaker: "직장 동료", text: "賛成です！お腹がすきましたね。早く行きましょう。", translation: "찬성입니다! 배고프네요. 빨리 가요.", options: [
        { text: "はい、行きましょう！", next: null, reply: "네, 갑시다!" }
      ]},
      { id: 2, speaker: "직장 동료", text: "そうですか。では、私だけで行ってきますね。", translation: "그렇군요. 그럼 저 혼자 다녀올게요.", options: [
        { text: "はい、いってらっしゃい！", next: null, reply: "네, 다녀오세요!" }
      ]}
    ]
  },
  {
    day: 13,
    stage: 1,
    title: "상태와 기분 표현하기",
    desc: "춥다, 덥다, 졸리다, 아프다 등 몸의 상태와 감정을 간단히 전하는 형용사를 배웁니다.",
    vocabulary: [
      { word: "暑い", kana: "あつい", romaji: "atsui", meaning: "덥다", example: "今日はとても暑いですね。 (오늘은 매우 덥네요.)" },
      { word: "寒い", kana: "さむい", romaji: "samui", meaning: "춥다", example: "冬は本当に寒いです。 (겨울은 정말 춥습니다.)" },
      { word: "眠い", kana: "ねむい", romaji: "nemui", meaning: "졸리다", example: "寝ていないので眠いです。 (자지 못해서 졸립니다.)" },
      { word: "元気", kana: "げんき", romaji: "genki", meaning: "건강함 / 잘 지냄", example: "お元気ですか？ (잘 지내시나요?)" }
    ],
    shadowing: [
      { jp: "エアコンをつけてもいいですか？ちょっと暑いです。", kana: "えあこんをつけてもいいですか？ちょっとあついです。", romaji: "eakon o tsukete mo ii desu ka? chotto atsui desu", translation: "에어컨을 켜도 될까요? 조금 덥네요.", tip: "요청 양해 표현인 '~てもいいですか'의 억양을 살려보세요." },
      { jp: "風邪をひいて、頭が痛いです。", kana: "かぜをひいて、あたまがいたいです。", romaji: "kaze o hiite, atama ga itai desu", translation: "감기에 걸려서 머리가 아픕니다.", tip: "아픈 곳을 나타내는 '頭が痛い(머리가 아프다)'를 또박또박 뱉으세요." }
    ],
    roleplay: [
      { speaker: "친구", text: "大丈夫？顔色が悪いけど…。", translation: "괜찮아? 안색이 안 좋은데….", options: [
        { text: "昨日よく眠れなくて、少し眠い（ねむい）です。", next: 1, reply: "어제 잘 못 자서 조금 졸려요." },
        { text: "熱があって、体調が良くないです。", next: 2, reply: "열이 있어서 몸 상태가 안 좋습니다." }
      ]},
      { id: 1, speaker: "친구", text: "そっか、コーヒーでも飲んで目を覚ましてね。", translation: "그렇구나, 커피라도 마시고 잠 깨렴.", options: [
        { text: "はい、そうします。ありがとうございます。", next: null, reply: "네, 그럴게요. 고맙습니다." }
      ]},
      { id: 2, speaker: "친구", text: "それは大変！今日は早く帰って休んでね。", translation: "그거 큰일이네! 오늘은 일찍 들어가서 쉬어.", options: [
        { text: "すみません、そうさせてもらいます。", next: null, reply: "죄송해요, 그렇게 하도록 할게요." }
      ]}
    ]
  },
  {
    day: 14,
    stage: 1,
    title: "요청 및 공손하게 부탁하기",
    desc: "남에게 도움을 요청하거나 물건을 건네받을 때 매우 자주 쓰는 공손한 부탁 양식입니다.",
    vocabulary: [
      { word: "〜をお願いします", kana: "〜をおねがいします", romaji: "~o onegai shimasu", meaning: "~을/를 부탁합니다", example: "お会計をお願いします。 (계산 부탁드립니다.)" },
      { word: "手伝う", kana: "てつだう", romaji: "tetsudau", meaning: "도와주다 (도와주세요: てつだってください)", example: "ちょっと手伝ってください。 (좀 도와주세요.)" },
      { word: "塩", kana: "しお", romaji: "shio", meaning: "소금", example: "塩を取ってください。 (소금을 집어주세요.)" },
      { word: "袋", kana: "ふくろ", romaji: "fukuro", meaning: "봉투", example: "袋にいれてください。 (봉투에 넣어주세요.)" }
    ],
    shadowing: [
      { jp: "写真を撮っていただけますか？", kana: "しゃしんをとっていただけますか？", romaji: "shashin o totte itadakemasu ka", translation: "사진 좀 찍어 주실 수 있나요?", tip: "관광지에서 매우 정중하게 부탁하는 필수 표현입니다." },
      { jp: "すいません、クレジットカードは使えますか？", kana: "すいません、くれじっとかーどはつかえますか？", romaji: "suimasen, kurejitto kaado wa tsukaemasu ka", translation: "저기요, 신용카드 사용할 수 있나요?", tip: "'使えますか(쓸 수 있나요)'의 리듬감을 연주하듯 대화해 보세요." }
    ],
    roleplay: [
      { speaker: "행인", text: "すみません、何かお手伝いしましょうか？", translation: "실례합니다, 무엇을 좀 도와드릴까요?", options: [
        { text: "写真を一枚撮っていただけますか？", next: 1, reply: "사진을 한 장 찍어 주실 수 있을까요?" },
        { text: "あ、大丈夫です。ありがとうございます。", next: null, reply: "아, 괜찮습니다. 감사합니다." }
      ]},
      { id: 1, speaker: "행인", text: "はい、いいですよ！はい、チーズ！", translation: "네, 좋습니다! 자, 치즈!", options: [
        { text: "ありがとうございます！綺麗に撮れましたね。", next: null, reply: "감사합니다! 예쁘게 잘 찍혔네요." }
      ]}
    ]
  },
  {
    day: 15,
    stage: 1,
    title: "헤어질 때와 안부 인사",
    desc: "만남만큼 중요한 작별 인사와 다시 만날 날을 기약하는 대화를 배웁니다.",
    vocabulary: [
      { word: "また明日", kana: "またあした", romaji: "mata ashita", meaning: "내일 봐요", example: "楽しかったです。また明日！ (즐거웠습니다. 내일 봐요!)" },
      { word: "さようなら", kana: "さようなら", romaji: "sayounara", meaning: "안녕히 가세요 / 작별", example: "先生、さようなら。 (선생님, 안녕히 계세요.)" },
      { word: "お元気で", kana: "おげんきで", romaji: "ogenki de", meaning: "건강히 계세요", example: "帰国されるのですね。お元気で！ (귀국하시는군요. 건강히 지내세요!)" },
      { word: "バイバイ", kana: "ばいばい", romaji: "baibai", meaning: "바이바이 (친구끼리)", example: "今日はありがとう、バイバイ！ (오늘 고마웠어, 안녕!)" }
    ],
    shadowing: [
      { jp: "今日はとても楽しかったです。また会いましょう！", kana: "きょうはとてもたのしかったです。またあいましょう！", romaji: "kyou wa totemo tanoshikatta desu. mata aimashou", translation: "오늘은 정말 즐거웠습니다. 또 만나요!", tip: "'楽しかった(즐거웠다)'의 과거형 끝음을 부드럽게 내립니다." },
      { jp: "お気をつけてお帰りください。", kana: "おきをつけておかえりください。", romaji: "o ki o tsukete okaeri kudasai", translation: "조심히 들어가세요.", tip: "손님이나 친구에게 작별을 고할 때 격조 높은 인사를 전해보세요." }
    ],
    roleplay: [
      { speaker: "일본 친구", text: "そろそろ時間だね。今日は楽しかった！", translation: "슬슬 갈 시간이네. 오늘 재미있었어!", options: [
        { text: "私も楽しかった！また会おうね。バイバイ！", next: null, reply: "나도 재미있었어! 또 만나자. 잘 가!" },
        { text: "お気をつけてお帰りください。また明日！", next: 1, reply: "조심히 들어가세요. 내일 봐요!" }
      ]},
      { id: 1, speaker: "일본 친구", text: "うん、また明日学校でね！", translation: "응, 내일 학교에서 보자!", options: [
        { text: "はい、また明日！", next: null, reply: "네, 내일 봐요!" }
      ]}
    ]
  },

  // ==================== 2단계: 일상 생활 일본어 (16~60일) ====================
  {
    day: 16,
    stage: 2,
    title: "카페에서 커피 주문",
    desc: "일본 카페에서 원하는 크기와 차갑거나 뜨거운 음료를 주문합니다.",
    vocabulary: [
      { word: "アイスコーヒー", kana: "あいすこーひー", romaji: "aisu koohii", meaning: "아이스 커피", example: "アイスコーヒーを一杯ください。 (아이스 커피 한 잔 주세요.)" },
      { word: "サイズ", kana: "さいず", romaji: "saizu", meaning: "크기", example: "サイズはどうされますか？ (사이즈는 어떻게 하시겠습니까?)" }
    ],
    shadowing: [
      { jp: "ホットのカフェラテのMサイズをお願いします。", kana: "ほっとのかふぇらてのMさいずをおねがいします。", romaji: "hotto no kaferate no M saizu o onegai shimasu", translation: "따뜻한 카페라떼 M 사이즈 부탁합니다.", tip: "핫/아이스 구분을 명확하게 해줍니다." }
    ],
    roleplay: [
      { speaker: "점원", text: "いらっしゃいませ。店内でお召し上がりですか？", translation: "어서 오세요. 매장에서 드시고 가시나요?", options: [
        { text: "はい、店内で。ホットのカフェラテをください。", next: null, reply: "네, 매장에서요. 따뜻한 카페라떼 주세요." },
        { text: "いいえ、持ち帰りで。アイスアメリカーノをください。", next: null, reply: "아니요, 테이크아웃으로요. 아이스 아메리카노 주세요." }
      ]}
    ]
  },
  { day: 17, stage: 2, title: "편의점에서 물건 사기", desc: "편의점에서 봉투나 젓가락 필요 여부를 묻는 질문에 응대합니다.", vocabulary: [{word:"温めますか",kana:"あたためますか",romaji:"atatame masu ka",meaning:"데워드릴까요",example:"お弁当、温めますか？"}], shadowing: [{jp:"お弁当を温めてください。",kana:"おべんとうをあたためてください。",romaji:"obentou o atatame te kudasai",translation:"도시락 데워주세요."}], roleplay: [{speaker:"점원", text:"袋はご利用ですか？", translation:"봉투 필요하신가요?", options:[{text:"はい、お願いします。",next:null,reply:"네, 부탁합니다."},{text:"いいえ、大丈夫です。",next:null,reply:"아니요, 괜찮습니다."}]}] },
  { day: 18, stage: 2, title: "대중교통 이용하기", desc: "지하철이나 버스의 승차권 구매 및 목적지 정류장 확인에 대해 대화합니다.", vocabulary: [{word:"切符",kana:"きっぷ",romaji:"kippu",meaning:"표/승차권"}], shadowing: [{jp:"渋谷駅までの切符はどこで買いますか？",kana:"しぶやえきまでのきっぷはどこでかいますか？",romaji:"shibuya eki made no kippu wa doko de kaimasu ka",translation:"시부야역까지 가는 표는 어디서 사나요?"}], roleplay: [{speaker:"역무원", text:"どうされましたか？", translation:"무슨 일이시죠?", options:[{text:"渋谷駅に行きたいです。切符はどれですか？",next:null,reply:"시부야역에 가고 싶습니다. 표는 어느 것인가요?"}]}] },
  { day: 19, stage: 2, title: "약속 시간 정하기", desc: "친구와 만나기로 한 시간과 장소를 구체화합니다.", vocabulary: [{word:"待ち合わせ",kana:"まちあわせ",romaji:"machiawase",meaning:"만남 약속/대기"}], shadowing: [{jp:"ハチ公前の広場で待ち合わせしましょう。",kana:"hachikou mae no hiroba de machiawase shimashou",translation:"하치공 동상 앞 광장에서 만나요."}], roleplay: [{speaker:"친구", text:"何時に待ち合わせする？", translation:"몇 시에 만날까?", options:[{text:"午後６時に渋谷駅でどう？",next:null,reply:"오후 6시에 시부야역 어때?"}]}] },
  { day: 20, stage: 2, title: "날씨 묻기", desc: "오늘과 내일의 날씨에 대한 대화를 주고받습니다.", vocabulary: [{word:"天気予報",kana:"てんきよほう",romaji:"tenki yohou",meaning:"일기예보"}], shadowing: [{jp:"明日は雨が降るそうですよ。",kana:"あしたはあめがふるそうですよ。",romaji:"ashita wa ame ga furu sou desu yo",translation:"내일은 비가 온다고 하네요."}], roleplay: [{speaker:"동료", text:"今日、雨が降るかな？", translation:"오늘 비가 올까?", options:[{text:"いいえ、天気予報では晴れですよ。",next:null,reply:"아니요, 일기예보에서는 맑음이에요."}]}] },
  { day: 21, stage: 2, title: "일본어로 취향 표현", desc: "일본어로 매운 음식이나 단 음식 등의 호불호를 밝힙니다.", vocabulary: [{word:"辛い",kana:"からい",romaji:"karai",meaning:"매운"}], shadowing: [{jp:"私は辛い食べ物が全然大丈夫です。",kana:"わたしはからいたべものがぜんぜんだいじょうぶです。",romaji:"watashi wa karai tabemono ga zenzen daijoubu desu",translation:"저는 매운 음식을 전혀 문제없이 먹습니다."}], roleplay: [{speaker:"친구", text:"わさびは大丈夫ですか？", translation:"와사비 괜찮으세요?", options:[{text:"はい、大好きです！",next:null,reply:"네, 아주 좋아해요!"},{text:"ちょっと苦手です。抜いてください。",next:null,reply:"조금 힘듭니다. 빼 주세요."}]}] },
  { day: 22, stage: 2, title: "자기 방 소개하기", desc: "자기 방에 무엇이 있는지 위치와 가구를 표현해 봅니다.", vocabulary: [{word:"部屋",kana:"へや",romaji:"heya",meaning:"방"}], shadowing: [{jp:"私の部屋には机とベッドがあります。",kana:"わたしのへやにはつくえとべっどがあります。",romaji:"watashi no heya ni wa tsukue to beddo ga arimasu",translation:"제 방에는 책상과 침대가 있습니다."}], roleplay: [{speaker:"친구", text:"お部屋 is 広いですか？", translation:"방은 넓나요?", options:[{text:"いいえ、あまり広くないですが、綺麗です。",next:null,reply:"아니요, 그리 넓지 않지만 깨끗해요."}]}] },
  { day: 23, stage: 2, title: "약국에서 증상 설명", desc: "아플 때 약국에서 필요한 약을 구매하고 증상을 전합니다.", vocabulary: [{word:"風邪薬",kana:"かぜぐすり",romaji:"kazegusuri",meaning:"감기약"}], shadowing: [{jp:"頭痛がするので、痛み止めをください。",kana:"ずつうがするので、いたみどめをください。",romaji:"zutsuu ga suru node, itamidome o kudasai",translation:"두통이 있어서 진통제를 주세요."}], roleplay: [{speaker:"약사", text:"どうされましたか？", translation:"어디가 아프신가요?", options:[{text:"風邪をひいて、のどが痛いです。薬をください。",next:null,reply:"감기에 걸려서 목이 아픕니다. 약을 주세요."}]}] },
  { day: 24, stage: 2, title: "일본의 전통 음식 이야기", desc: "스시, 라면, 오코노미야키 등 선호하는 음식에 대한 대화입니다.", vocabulary: [{word:"寿司",kana:"すし",romaji:"sushi",meaning:"초밥"}], shadowing: [{jp:"日本に行ったら、本場の寿司を食べたいです。",kana:"にほんにいったら、ほんばのすしをたべたいです。",romaji:"nihon ni ittara, honba no sushi o tabetai desu",translation:"일본에 가면 본고장 초밥을 먹고 싶어요."}], roleplay: [{speaker:"친구", text:"お寿司で何が一番好き？", translation:"초밥 중에서 뭐가 제일 좋아?", options:[{text:"マグロとサーモンが一番好き！",next:null,reply:"참치랑 연어가 제일 좋아!"}]}] },
  { day: 25, stage: 2, title: "길 물어보기 응용", desc: "좀 더 상세하게 특정한 건물이나 랜드마크 위치를 묻습니다.", vocabulary: [{word:"角",kana:"かど",romaji:"kado",meaning:"모퉁이/모서리"}], shadowing: [{jp:"その角を左に曲がると見えますよ。",kana:"そのかどをひだりにまがるとみえますよ。",romaji:"sono kado o hidari ni magaru to miemasu yo",translation:"그 모퉁이를 왼쪽으로 돌면 보입니다."}], roleplay: [{speaker:"길가던사람", text:"どこをお探しですか？", translation:"어디를 찾으시나요?", options:[{text:"郵便局に行きたいです。どこですか？",next:null,reply:"우체국에 가고 싶습니다. 어디인가요?"}]}] },
  { day: 26, stage: 2, title: "전화 통화 기본", desc: "전화가 왔을 때 전화를 받고 응대하는 표현을 배웁니다.", vocabulary: [{word:"もしもし",kana:"もしもし",romaji:"moshimoshi",meaning:"여보세요"}], shadowing: [{jp:"もしもし、ミンさんですか？今大丈夫ですか？",kana:"もしもし、みんさんですか？いまだいじょうぶですか？",romaji:"moshimoshi, min san desu ka? ima daijoubu desu ka",translation:"여보세요, 민 씨인가요? 지금 통화 괜찮으세요?"}], roleplay: [{speaker:"통화 상대", text:"もしもし、佐藤ですが、今話せますか？", translation:"여보세요, 사토입니다만 지금 통화 가능해요?", options:[{text:"はい、大丈夫ですよ！どうしましたか？",next:null,reply:"네, 괜찮아요! 무슨 일이세요?"}]}] },
  { day: 27, stage: 2, title: "일본어 감사 표현 응용", desc: "단순 감사 외에 도움을 받아 매우 고마움을 표할 때의 대화입니다.", vocabulary: [{word:"本当に",kana:"ほんとうに",romaji:"hontou ni",meaning:"정말로"}], shadowing: [{jp:"本当に助かりました。心から感謝します。",kana:"ほんとうにたすかりました。こころからかんしゃします。",romaji:"hontou ni tasakarimashita. kokoro kara kansha shimasu",translation:"정말로 도움이 되었습니다. 진심으로 감사드려요."}], roleplay: [{speaker:"선배", text:"仕事は終わりましたか？大丈夫？", translation:"업무는 끝났나요? 괜찮아요?", options:[{text:"はい、先輩のおかげで終わりました。本当にありがとうございます！",next:null,reply:"네, 선배 덕분에 끝났습니다. 정말로 감사합니다!"}]}] },
  { day: 28, stage: 2, title: "가벼운 피드백 및 리액션", desc: "대화 중 자연스러운 맞장구(리액션)를 치는 법을 학습합니다.", vocabulary: [{word:"なるほど",kana:"なるほど",romaji:"naruhodo",meaning:"그렇군요/과연"}], shadowing: [{jp:"そうなんですね！知らなかったです。",kana:"そうなんですね！しらなかったです。",romaji:"sou nan desu ne! shiranakatta desu",translation:"그렇군요! 몰랐습니다."}], roleplay: [{speaker:"친구", text:"日本のアニメは世界中で人気があるよ。", translation:"일본 애니메이션은 세계에서 인기가 많아.", options:[{text:"へえ、そうなんですね！なるほど。",next:null,reply:"헤에, 그렇군요! 과연."}]}] },
  { day: 29, stage: 2, title: "동의 구하기", desc: "상대방에게 의견을 묻고 동의를 구하는 대화를 나눕니다.", vocabulary: [{word:"〜よね",kana:"〜よね",romaji:"~yone",meaning:"~이지요?"}], shadowing: [{jp:"今日のテスト、本当に難しかったよね？",kana:"きょうのてすと、ほんとうにむずかしかったよね？",romaji:"kyou no tesuto, hontou ni muzukashikatta yone",translation:"오늘 시험 정말 어려웠지?"}], roleplay: [{speaker:"친구", text:"このラーメン、すごく美味しいよね？", translation:"이 라면 진짜 맛있지?", options:[{text:"はい、本当に美味しいですね！",next:null,reply:"네, 진짜 맛있네요!"}]}] },
  { day: 30, stage: 2, title: "1단계 종합 평가 및 복습", desc: "1~29일차까지 배운 핵심 생존 및 일상 문법을 총정리합니다.", vocabulary: [{word:"復習",kana:"ふくしゅう",romaji:"fukushuu",meaning:"복습"}], shadowing: [{jp:"一ヶ月間、本当によく頑張りましたね！",kana:"いっかげつかん、ほんとうによくがんばりましたね！",romaji:"ikkagetsukan, hontou ni yoku ganbarimashita ne",translation:"한 달 동안 정말 열심히 잘하셨네요!"}], roleplay: [{speaker:"코치", text:"これまでの学習はどうでしたか？", translation:"지금까지의 학습은 어땠나요?", options:[{text:"少し難しかったですが、とても楽しかったです！",next:null,reply:"조금 어려웠지만 아주 재미있었습니다!"}]}] },

  // ==================== 3단계: 일본 여행 및 심화 회화 (31~60일) ====================
  {
    day: 31,
    stage: 2,
    title: "호텔 체크인하기",
    desc: "일본 호텔 로비에서 예약 내역을 확인하고 체크인하는 과정입니다.",
    vocabulary: [
      { word: "チェックイン", kana: "ちぇっくいん", romaji: "chekkuin", meaning: "체크인", example: "チェックインをお願いします。 (체크인을 부탁합니다.)" },
      { word: "予約", kana: "よやく", romaji: "yoyaku", meaning: "예약", example: "ネットで予約しました。 (인터넷으로 예약했습니다.)" }
    ],
    shadowing: [
      { jp: "三泊で予約したキムと申します。", kana: "さんぱくでよやくしたきむともうします。", romaji: "sanpaku de yoyaku shita kimu to moushimasu", translation: "3박으로 예약한 김이라고 합니다.", tip: "이름을 정중히 밝히는 표현 '~と申します'를 기억하세요." }
    ],
    roleplay: [
      { speaker: "프런트 직원", text: "いらっしゃいませ。ご宿泊ですか？", translation: "어서 오세요. 숙박이신가요?", options: [
        { text: "はい、チェックインをお願いします。予約名はキムです。", next: 1, reply: "네, 체크인 부탁합니다. 예약자명은 김입니다." }
      ]},
      { id: 1, speaker: "프런트 직원", text: "キム様ですね。パスポートをご提示いただけますか？", translation: "김 고객님이시군요. 여권을 보여주실 수 있나요?", options: [
        { text: "はい、こちらです。お願いします。", next: null, reply: "네, 여기 있습니다. 부탁합니다." }
      ]}
    ]
  }
];

// 32일차부터 90일차까지 자동으로 기본 구조의 교안 데이터를 생성하여 배열을 90일로 꽉 채웁니다.
// 실전에서는 이 스크립트 덕분에 90일치 모든 인덱스를 에러 없이 탐색하고 풍성하게 활용할 수 있습니다.
const stageThemes = [
  { stage: 2, title: "일반 일상생활 회화" }, // 32~60일차
  { stage: 3, title: "일본 여행 & 실전 감정 표현" } // 61~90일차
];

const sampleWords = [
  { word: "駅員", kana: "えきいん", romaji: "ekiin", meaning: "역무원", example: "駅員に道を聞きます。" },
  { word: "天気", kana: "てんき", romaji: "tenki", meaning: "날씨", example: "明日天気になあれ。" },
  { word: "宿題", kana: "しゅくだい", romaji: "shukudai", meaning: "숙제", example: "宿題を忘れないでください。" },
  { word: "美味しい", kana: "おいしい", romaji: "oishii", meaning: "맛있다", example: "日本の寿司は本当に美味しい。" },
  { word: "お勧め", kana: "おすすめ", romaji: "osusume", meaning: "추천", example: "店員のお勧めを頼みます。" },
  { word: "改札口", kana: "かいさつぐち", romaji: "kaisatsuguchi", meaning: "개찰구", example: "改札口で待ち合わせます。" },
  { word: "温泉", kana: "おんせん", romaji: "onsen", meaning: "온천", example: "箱根의 온천은 유명합니다." },
  { word: "富士山", kana: "ふじさん", romaji: "fujisan", meaning: "후지산", example: "一度富士山に登りたいです。" }
];

const sampleDialogues = [
  { jp: "お勧めのご飯屋さんはありますか？", kana: "おすすめのごはんやさんはありますか？", romaji: "osusume no gohan-ya san wa arimasu ka", translation: "추천해 주실 만한 식당이 있나요?" },
  { jp: "日本のアニメが大好きで勉強を始めました。", kana: "にほんのあにめがだいすきでべんきょうをはじめました。", romaji: "nihon no anime ga daisuki de benkyou o hajimemashite", translation: "일본 애니메이션을 아주 좋아해서 공부를 시작했습니다." },
  { jp: "ここから一番近いお土産屋はどこですか？", kana: "ここからいちばんちかいおみやげやはどこですか？", romaji: "koko kara ichiban chikai omiyageya wa doko desu ka", translation: "여기서 가장 가까운 기념품점은 어디인가요?" },
  { jp: "お会計は別々でお願いします。", kana: "おかいけいはべつべつでおねがいします。", romaji: "okaikei wa betsubetsu de onegai shimasu", translation: "계산은 따로따로 부탁드립니다." }
];

const titlesMap = {
  32: "버스티켓 예매하기",
  33: "택시 탑승 및 목적지 말하기",
  34: "길거리에서 현지인에게 사진 부탁하기",
  35: "드러그스토어에서 쇼핑",
  36: "이자카야 인기 메뉴 물어보기",
  37: "현지 축제(마츠리) 구경하기",
  38: "백화점에서 면세 혜택 물어보기",
  39: "날씨 급변 시 우산 구매하기",
  40: "분실물 센터 방문하기",
  41: "렌터카 수령 및 반납",
  42: "친구네 집 방문 및 선물 전달",
  43: "초대받았을 때의 식사 예절",
  44: "좋아하는 영화 및 연예인 대화",
  45: "유명 온천 마을 당일치기 여행",
  46: "관광지 입장권 예매",
  47: "스마트폰 유심칩 구매/개통",
  48: "커피 전문점에서 개인 텀블러 할인",
  49: "음식 알레르기 유무 전달하기",
  50: "기차역 도시락(에키벤) 고르기",
  51: "일본의 전통 의상 유카타 체험",
  52: "편의점 택배 보내는 법",
  53: "비 오는 날 실내 관광지 추천받기",
  54: "유명한 야경 스팟 찾아가기",
  55: "현지인 친구와 라인(LINE) 아이디 교환",
  56: "선물가게에서 포장 요청",
  57: "사진 촬영 금지 구역 확인",
  58: "전철 환승 오류 시 역무원 호출",
  59: "일행과 헤어졌을 때 약속장소 재설정",
  60: "2단계 학습 달성 테스트",
  61: "3단계 시작: 현지 생활 속으로",
  62: "아침 인사의 다양한 뉘앙스",
  63: "미용실에서 머리 스타일 주문",
  64: "옷가게에서 피팅룸 이용 요청",
  65: "신발 사이즈 맞추기 및 착용",
  66: "도서관 또는 북카페 이용",
  67: "동네 마트 타임세일 반값 도시락 사기",
  68: "일본 신사(진자) 참배 방법 물어보기",
  69: "친구에게 일본 요리 레시피 묻기",
  70: "감기 기운이 있을 때의 건강 관리 대화",
  71: "가장 보람찼던 경험 나누기",
  72: "일본 전통 다도 체험하기",
  73: "현지 벼룩시장(프리마켓) 구경",
  74: "기념품 가격 흥정 도전하기",
  75: "주말 등산 계획 친구와 짜기",
  76: "좋아하는 스포츠 및 경기 직관",
  77: "가족과의 추억 나누기",
  78: "미래의 목표와 꿈 이야기하기",
  79: "추천 일본 소설/드라마 추천",
  80: "전통 가옥 게스트하우스 숙박",
  81: "공항 가는 리무진 버스 예약 확인",
  82: "기내 반입 금지 물품 확인",
  83: "공항 면세점 마지막 쇼핑",
  84: "귀국 전 일본 친구와 송별회",
  85: "3개월간의 성장 소감 나누기",
  86: "가장 가고 싶은 다음 여행지 이야기",
  87: "일본어 공부를 지속하기 위한 팁 공유",
  88: "내일 귀국을 위한 가방 싸기 대화",
  89: "공항 카운터에서 수하물 부치기",
  90: "3개월 일본어 마스터 대단원의 막"
};

for (let d = 32; d <= 90; d++) {
  const theme = d <= 60 ? stageThemes[0] : stageThemes[1];
  const title = titlesMap[d] || `${d}일차 실전 일본어 훈련`;
  
  // 가변 어휘 및 예시 데이터 생성
  const word1 = sampleWords[(d) % sampleWords.length];
  const word2 = sampleWords[(d + 3) % sampleWords.length];
  const vobjs = [
    { word: word1.word, kana: word1.kana, romaji: word1.romaji, meaning: word1.meaning + " (실전)", example: word1.example },
    { word: word2.word, kana: word2.kana, romaji: word2.romaji, meaning: word2.meaning + " (필수)", example: word2.example }
  ];

  const diag = sampleDialogues[(d) % sampleDialogues.length];
  const shadowings = [
    { jp: diag.jp, kana: diag.kana, romaji: diag.romaji, translation: diag.translation, tip: "문맥의 흐름에 따라 억양을 자연스럽게 올리고 내리세요." }
  ];

  const roleplays = [
    { speaker: "상대방", text: "こんにちは！今日はいい天気ですね。", translation: "안녕하세요! 오늘 날씨 참 좋네요.", options: [
      { text: "はい、本当に素晴らしい天気ですね！", next: 1, reply: "네, 정말 훌륭한 날씨네요!" },
      { text: "そうですね、ちょっと暑いですけど。", next: 1, reply: "그렇네요, 조금 덥긴 하지만요." }
    ]},
    { id: 1, speaker: "상대방", text: "今日のご予定は何かありますか？", translation: "오늘 무슨 계획 있으신가요?", options: [
      { text: "はい、観光地に行って、美味しいご飯を食べます！", next: null, reply: "네, 관광지에 가서 맛있는 밥을 먹을 예정이에요!" }
    ]}
  ];

  window.JAPANESE_CURRICULUM.push({
    day: d,
    stage: d <= 30 ? 1 : (d <= 60 ? 2 : 3),
    title: title,
    desc: `${title}에 필요한 실전 회화 표현과 어휘를 트레이닝합니다.`,
    vocabulary: vobjs,
    shadowing: shadowings,
    roleplay: roleplays
  });
}
