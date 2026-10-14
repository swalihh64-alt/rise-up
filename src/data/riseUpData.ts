export interface CategoryData {
  label: string;
  title: string;
  msg: string;
  quotes: [string, string][];
  steps: string[];
}

export const DATA: Record<string, CategoryData> = {
  study: {
    label: "Study and exams",
    title: "One chapter at a time, you will get there.",
    msg: "Exam pressure feels huge because you care. Marks measure one day, not your worth or your future. Break the mountain into small pieces and the fear shrinks.",
    quotes: [
      ["You do not have to be perfect. You just have to be consistent.", "Rise Up"],
      ["Slow progress is still progress. Keep turning the page.", "Rise Up"],
      ["Today's hard work is tomorrow's confidence.", "Rise Up"]
    ],
    steps: [
      "Study in 25-minute blocks with 5-minute breaks.",
      "List only 3 topics for today, not the whole syllabus.",
      "Sleep well. A rested brain remembers more.",
      "Ask a friend or teacher about one doubt today."
    ]
  },
  work: {
    label: "Work and career",
    title: "Your career is a long road, not a single bad day.",
    msg: "Tough bosses, delays and setbacks happen to everyone. They do not define your ability. Learn what you can, protect your energy, and keep building your skills.",
    quotes: [
      ["A bad day at work is not a bad career.", "Rise Up"],
      ["Skills stay with you, even when jobs change.", "Rise Up"],
      ["Growth often begins exactly where comfort ends.", "Rise Up"]
    ],
    steps: [
      "Write down one thing you did well this week.",
      "Pick one skill to learn for 20 minutes a day.",
      "Talk calmly to a mentor or colleague you trust.",
      "Set one clear boundary for after-work time."
    ]
  },
  family: {
    label: "Family and relationships",
    title: "Hard conversations can still lead to closer hearts.",
    msg: "Misunderstandings hurt most with the people we love. Give yourself time to cool down, then speak with honesty and kindness. You deserve respect, and so do they.",
    quotes: [
      ["Listening first can solve half the argument.", "Rise Up"],
      ["Love is not the absence of problems. It is choosing to work through them.", "Rise Up"],
      ["You can be calm and firm at the same time.", "Rise Up"]
    ],
    steps: [
      "Pause before replying when you are angry.",
      "Write what you want to say, then keep it short and kind.",
      "Choose a calm time to talk.",
      "Remember: you cannot control them, only your response."
    ]
  },
  health: {
    label: "Health and stress",
    title: "Rest is not weakness. It is part of healing.",
    msg: "Your body and mind are asking for care. Be gentle with yourself. Small healthy habits add up, and asking for help is a sign of strength.",
    quotes: [
      ["Healing is not a straight line, and that is okay.", "Rise Up"],
      ["Take care of your body. It is the only place you have to live.", "Rise Up"],
      ["You are allowed to rest and still be proud of yourself.", "Rise Up"]
    ],
    steps: [
      "Drink water and take a 10-minute walk.",
      "Switch off screens 30 minutes before bed.",
      "Eat one proper, nourishing meal today.",
      "If symptoms continue, please see a doctor."
    ]
  },
  money: {
    label: "Money",
    title: "Money problems are temporary. Your skills are permanent.",
    msg: "Financial stress is heavy, but it improves step by step. Make a simple plan, track small wins, and do not compare your chapter 1 with someone else's chapter 20.",
    quotes: [
      ["Small savings today build big freedom tomorrow.", "Rise Up"],
      ["Your current situation is not your final destination.", "Rise Up"],
      ["Every expert in money once knew nothing about it.", "Rise Up"]
    ],
    steps: [
      "Write down all income and expenses for this month.",
      "Cut one unnecessary expense this week.",
      "Look for one extra way to earn, or learn a paid skill.",
      "Talk to someone you trust about your plan."
    ]
  },
  lonely: {
    label: "Loneliness and sadness",
    title: "You are not alone, even when it feels that way.",
    msg: "Sadness and loneliness are painful, but they are feelings, not facts. Reaching out, even with one message, can open a door. Your feelings are valid and you are worth caring about.",
    quotes: [
      ["Even the darkest night ends, and the sun rises again.", "Rise Up"],
      ["Reach out. Someone out there needs a friend like you.", "Rise Up"],
      ["Feeling low does not mean you are weak. It means you are human.", "Rise Up"]
    ],
    steps: [
      "Message or call one person today and just say hi.",
      "Step outside for fresh air and sunlight.",
      "Do one small thing you enjoy.",
      "Consider talking with a counselor if this feeling lasts."
    ]
  },
  failure: {
    label: "Failure and self-doubt",
    title: "Failing means you tried. That already puts you ahead.",
    msg: "Every successful person has a long list of failures behind them. Failure is feedback, not a final verdict. Learn the lesson, adjust the plan, and try again.",
    quotes: [
      ["Fall seven times, stand up eight.", "Japanese proverb"],
      ["The only real failure is quitting for good.", "Rise Up"],
      ["You are not behind. You are on your own path.", "Rise Up"]
    ],
    steps: [
      "Write what went wrong and what you learned.",
      "Choose one small change for the next attempt.",
      "Celebrate that you had the courage to try.",
      "Stop comparing yourself to others today."
    ]
  },
  other: {
    label: "General",
    title: "Whatever you are facing, you can get through it.",
    msg: "Thank you for sharing. Putting your problem into words is already the first step to solving it. Take one deep breath. You have survived every hard day so far.",
    quotes: [
      ["This too shall pass.", "Proverb"],
      ["You have survived 100% of your worst days.", "Rise Up"],
      ["Start where you are. Use what you have. Do what you can.", "Rise Up"]
    ],
    steps: [
      "Take 5 slow, deep breaths.",
      "Write the problem and one possible solution.",
      "Do the smallest possible first step.",
      "Be kind to yourself today."
    ]
  }
};

export const KEYWORDS: Record<string, string[]> = {
  study: ["exam", "exams", "study", "studying", "marks", "test", "tests", "school", "college", "grade", "grades", "syllabus", "homework", "degree", "assignment"],
  work: ["job", "boss", "office", "work", "salary", "career", "colleague", "interview", "manager", "fired", "promotion", "coworker", "client", "business"],
  family: ["family", "parents", "mother", "father", "brother", "sister", "wife", "husband", "girlfriend", "boyfriend", "relationship", "breakup", "friend", "fight", "partner", "divorce"],
  health: ["sick", "ill", "pain", "health", "tired", "stress", "stressed", "anxiety", "anxious", "sleep", "insomnia", "headache", "burnout", "disease", "exhausted"],
  money: ["money", "debt", "loan", "rent", "bills", "poor", "broke", "expensive", "financial", "afford", "savings", "cash"],
  lonely: ["lonely", "alone", "sad", "crying", "cry", "depressed", "nobody", "empty", "hopeless", "miss", "isolated", "ignored"],
  failure: ["failed", "failure", "loser", "useless", "worthless", "give up", "giving up", "not good enough", "mistake", "regret", "disappointed"]
};

export const DANGER_KEYWORDS = [
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "self harm",
  "self-harm",
  "hurt myself",
  "no reason to live",
  "end it all"
];

export const LOAD_MSGS = [
  "Reading what you wrote...",
  "Finding the right words...",
  "Gathering small steps for today..."
];

export const DAILY: [string, string][] = [
  ["Begin before you feel ready. Readiness usually arrives after the first step.", "Start the task you have been avoiding for just 5 minutes."],
  ["A small step today beats a big plan tomorrow.", "Write down one thing you can finish today."],
  ["You can be a work in progress and still be worth celebrating.", "Write down one thing you like about yourself."],
  ["Hard days are part of the road, not the end of it.", "Drink a full glass of water and take 5 slow breaths."],
  ["Your effort counts even when nobody is watching.", "Do one useful thing quietly, without telling anyone."],
  ["Rest when you must, but do not quit.", "Take a 10-minute break away from your phone."],
  ["Courage is doing the next right thing while still afraid.", "Do one thing today that makes you a little nervous."],
  ["Comparison steals the joy your own progress deserves.", "Stay off social media for one hour."],
  ["Every expert was once a beginner who kept going.", "Spend 15 minutes learning something new."],
  ["You have handled every bad day so far. Today is no different.", "Write down a hard time you got through."],
  ["Kind words, even to yourself, change the weather inside.", "Say one kind thing to yourself out loud."],
  ["Progress is quiet. Keep showing up.", "Repeat a habit you started, even for 5 minutes."],
  ["Let go of what you cannot control. Pour your energy into what you can.", "Make two lists: what I can control, and what I cannot."],
  ["A good day is built from small good choices.", "Choose one healthy meal today."],
  ["Mistakes are proof that you are trying.", "Write down one mistake and the lesson in it."],
  ["The sun does not hurry, yet the day always arrives.", "Spend 10 minutes outside in daylight."],
  ["Asking for help is something strong people do.", "Message someone you trust and ask for advice on one small thing."],
  ["Your future self is quietly thanking you for today.", "Tidy one small space, like your desk."],
  ["Doubt is loud, but it is not always right.", "Write one doubt, then one fact that argues against it."],
  ["You do not need all the answers, just the next step.", "Write the next single step for your biggest problem."],
  ["Gratitude turns what you have into enough.", "Write down three things you are thankful for."],
  ["Be patient. Roots grow before flowers show.", "Look back at how far you have come this month."],
  ["Your pace is valid. Slow still moves forward.", "Do one task at an easy, steady pace."],
  ["Even a short walk can clear a heavy mind.", "Walk for 15 minutes."],
  ["You are more than your worst day.", "Do something that reminds you of your best self."],
  ["Say no to what drains you, so you can say yes to what matters.", "Decline or postpone one thing that is not important."],
  ["Today is a fresh page. Write something you will be proud of.", "Pick your top 3 priorities for today."],
  ["Telling the truth gently takes courage, and courage grows with use.", "Tell someone how you really feel, kindly."],
  ["Sleep, water, sunlight. Start with the basics.", "Set a bedtime and keep to it tonight."],
  ["Hope is a habit. Practice it daily.", "Write down one thing you are looking forward to."]
];

export function detectCategory(text: string): string {
  const t = text.toLowerCase();
  let best = "other";
  let score = 0;
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    const s = words.filter(w => t.includes(w)).length;
    if (s > score) {
      score = s;
      best = cat;
    }
  }
  return best;
}

export function hasCrisisKeywords(text: string): boolean {
  const t = text.toLowerCase();
  return DANGER_KEYWORDS.some(k => t.includes(k));
}

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getYesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDayNumber(): number {
  const d = new Date();
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}
