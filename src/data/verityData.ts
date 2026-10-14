export interface VerityCard {
  id: string;
  category: "self-worth" | "overthinking" | "future" | "exhaustion" | "social";
  categoryLabel: string;
  mindWhisper: string; // The anxious lie or distortion
  verity: string;      // The grounding objective truth
  microAction: string; // Small actionable somatic or mental grounding
}

export const VERITY_CARDS: VerityCard[] = [
  {
    id: "v1",
    category: "future",
    categoryLabel: "The Future & Control",
    mindWhisper: "I'm falling so far behind everyone else in my life.",
    verity: "Life is not a synchronized race with a shared finish line. You only ever see other people's curated milestones, not their private grief. Your pace is valid and your journey belongs only to you.",
    microAction: "Name one tiny accomplishment you achieved this year that nobody else knows about."
  },
  {
    id: "v2",
    category: "self-worth",
    categoryLabel: "Self-Worth",
    mindWhisper: "I made a serious mistake, which means I am an utter failure.",
    verity: "Failure is an event, never an identity. Making a mistake means you were brave enough to attempt something difficult. You are the student of your experience, not the verdict of your worst moment.",
    microAction: "Place one hand gently over your chest and say: 'I forgive myself for learning the hard way.'"
  },
  {
    id: "v3",
    category: "exhaustion",
    categoryLabel: "Rest & Burnout",
    mindWhisper: "If I take a break or stop producing today, I'm just being lazy.",
    verity: "Rest is not a reward you have to earn by running yourself into the ground. Rest is a biological requirement, like water or oxygen. A field that is never left fallow cannot produce a healthy harvest.",
    microAction: "Close your eyes, drop your shoulders down away from your ears, and take two slow breaths."
  },
  {
    id: "v4",
    category: "social",
    categoryLabel: "Social & Connection",
    mindWhisper: "Everyone is silently judging me or secretly wishes I weren't around.",
    verity: "The Spotlight Effect: psychological studies prove humans spend roughly 90% of their mental bandwidth worrying about their own insecurities. People are not scrutinizing you; they are preoccupied with their own lives.",
    microAction: "Send a brief kind message to someone or simply smile at a stranger."
  },
  {
    id: "v5",
    category: "overthinking",
    categoryLabel: "Overthinking & Panic",
    mindWhisper: "This unbearable heavy feeling is going to last forever.",
    verity: "Emotions are neurochemical waves with an average physiological lifespan of 90 seconds, unless we feed them with rumination. No feeling, however dark, is permanent. You have survived 100% of your worst days so far.",
    microAction: "Sip a glass of cold water and observe the sensation in your throat."
  },
  {
    id: "v6",
    category: "future",
    categoryLabel: "The Future & Control",
    mindWhisper: "I must figure out the next five years of my life right this second.",
    verity: "You do not need a five-year blueprint to navigate this evening. Clarity comes from action, not endless anticipation. You only need to choose the next small, honest choice for the next 20 minutes.",
    microAction: "Pick only one small task for the next half hour, and let everything else wait."
  },
  {
    id: "v7",
    category: "social",
    categoryLabel: "Social & Connection",
    mindWhisper: "Asking for help makes me look weak or like an unbearable burden.",
    verity: "Vulnerability is what creates genuine trust. Think of how honored you feel when a good friend turns to you for support. You are giving people the privilege of caring for you.",
    microAction: "Think of one person who has been gentle with you in the past."
  },
  {
    id: "v8",
    category: "overthinking",
    categoryLabel: "Overthinking & Panic",
    mindWhisper: "Because I feel anxious and fearful, something terrible must be about to happen.",
    verity: "Emotional reasoning is a cognitive trick: feelings are indicators of what your nervous system remembers, not crystal balls predicting the future. Fear is just energy passing through.",
    microAction: "Touch three different physical textures near you right now (fabric, wood, metal)."
  },
  {
    id: "v9",
    category: "self-worth",
    categoryLabel: "Self-Worth",
    mindWhisper: "I am too broken or damaged to ever be happy again.",
    verity: "Human neuroplasticity and psychological healing are remarkable and lifelong. Brokenness is a feeling, not a biological reality. Wounds knit together quietly even while you sleep.",
    microAction: "Notice that your heart is beating faithfully without you having to remind it."
  },
  {
    id: "v10",
    category: "exhaustion",
    categoryLabel: "Rest & Burnout",
    mindWhisper: "I have to say yes to every request or I will let everyone down.",
    verity: "Every time you say 'yes' to something that depletes you, you are saying 'no' to your own sanity. 'No' is a complete, protective sentence that preserves your capacity to love.",
    microAction: "Rehearse this phrase quietly: 'I don't have the capacity for that right now, but thank you.'"
  }
];

export interface ReframedVerity {
  distortionType: string;
  realityAnchor: string;
  newPerspective: string;
  microAction: string;
}

export function reframeUserThought(thought: string): ReframedVerity {
  const t = thought.toLowerCase();

  if (t.includes("never") || t.includes("always") || t.includes("ruined") || t.includes("everything") || t.includes("nothing")) {
    return {
      distortionType: "All-or-Nothing Thinking",
      realityAnchor: "Life rarely exists at extreme poles. A difficult phase or setback does not invalidate all your progress or permanently ruin the future.",
      newPerspective: "This specific situation is challenging, but it is one chapter in a much longer story. Partial progress is still real progress.",
      microAction: "Write down two things that are still functioning normally or peacefully in your life right now."
    };
  }

  if (t.includes("fail") || t.includes("loser") || t.includes("stupid") || t.includes("useless") || t.includes("hate myself") || t.includes("mess")) {
    return {
      distortionType: "Personalization & Harsh Self-Labeling",
      realityAnchor: "You are confusing what you experienced with who you are. You are an evolving human being navigating an imperfect world, not a single mistake.",
      newPerspective: "If a dear friend came to you with this exact mistake, you would treat them with compassion, not contempt. Offer yourself that same decency.",
      microAction: "Unclench your jaw, relax your eyebrows, and take one deep, audible exhale."
  };
  }

  if (t.includes("what if") || t.includes("scared") || t.includes("future") || t.includes("dread") || t.includes("worry") || t.includes("going to happen")) {
    return {
      distortionType: "Catastrophizing & Fortune-Telling",
      realityAnchor: "Your imagination is generating worst-case scenarios to try to protect you, but 85% of what we anxiously anticipate never happens.",
      newPerspective: "Whatever happens, you will meet it with the resources and people available at that time. You do not have to solve tomorrow with today's fatigue.",
      microAction: "Stand up, feel your feet firmly planted on the ground, and name 3 things in the room that are completely still."
    };
  }

  if (t.includes("they think") || t.includes("everyone hate") || t.includes("nobody care") || t.includes("alone") || t.includes("left out") || t.includes("laughing")) {
    return {
      distortionType: "Mind Reading & Assumed Rejection",
      realityAnchor: "You cannot read people's thoughts. Silence or brief replies are almost always caused by their own stress, fatigue, or busyness.",
      newPerspective: "Unless someone explicitly states otherwise with kind words, do not invent stories where you are unwanted. You belong here.",
      microAction: "Reach out with a short greeting to someone you appreciate, without waiting for anything in return."
    };
  }

  // Default balanced verity
  return {
    distortionType: "Overwhelmed Mind Distortion",
    realityAnchor: "Thoughts are mental events, not concrete facts. Just because your brain produces a heavy thought does not make it true or inevitable.",
    newPerspective: "Acknowledge this thought as a symptom of feeling tired, pressured, or vulnerable. Let it pass through without clinging to it.",
    microAction: "Place both feet flat on the floor, count backwards slowly from 10 to 1, and drink a sip of water."
  };
}
