/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StationInfo, SpotTheBotImage, TrainingCard, DilemmaScenario } from '../types';

export const STATIONS: StationInfo[] = [
  {
    id: 'station-1',
    number: 1,
    title: 'The Prompt Architect',
    tagline: 'Precision Words, Predictable Worlds',
    concept: 'Generative AI & Prompt Engineering',
    skillGoal: 'Practice precise procedural communication and understand how AI interprets input.',
    color: 'emerald',
    accentColor: '#059669',
    iconName: 'Sparkles',
  },
  {
    id: 'station-2',
    number: 2,
    title: 'Pattern Detective',
    tagline: 'Data In, Decisions Out',
    concept: 'Machine Learning & Algorithmic Bias',
    skillGoal: 'Understand how AI systems learn from datasets and how human opinions create bias.',
    color: 'blue',
    accentColor: '#2563eb',
    iconName: 'Search',
  },
  {
    id: 'station-3',
    number: 3,
    title: 'Spot the Bot!',
    tagline: 'Find the Glitch in the Machine',
    concept: 'Media Literacy & AI Hallucinations',
    skillGoal: 'Inspect synthetic media critically using visual evidence and key diagnostic tests.',
    color: 'amber',
    accentColor: '#d97706',
    iconName: 'Eye',
  },
  {
    id: 'station-4',
    number: 4,
    title: 'AI Ethics Council',
    tagline: 'Smart Rules for Smart Families',
    concept: 'Digital Ethics, Privacy & Responsible Use',
    skillGoal: 'Evaluate real-world technology scenarios and establish healthy family rules for AI use.',
    color: 'indigo',
    accentColor: '#4f46e5',
    iconName: 'ShieldCheck',
  },
];

export const SPOT_THE_BOT_IMAGES: SpotTheBotImage[] = [
  {
    id: 'picnic-ai',
    title: 'Sunny Sunday Family Picnic',
    src: '/src/assets/images/spot_the_bot_ai_picnic_1790642697646.jpg',
    isAi: true,
    difficulty: 'Beginner',
    glitches: [
      {
        pointType: 'anatomy',
        title: 'Six-Fingered Hand',
        description: 'Notice the person holding the sandwich has 6 distinct fingers with unnatural knuckle bends.',
        x: 48,
        y: 62,
      },
      {
        pointType: 'edge',
        title: 'Melted Bike Spokes',
        description: 'The bicycle wheels in the background fuse into the grass stems with impossible physics.',
        x: 82,
        y: 44,
      },
      {
        pointType: 'text',
        title: 'Alien Post Sign',
        description: 'The wooden park trail sign contains squiggly pseudo-lettering that cannot be read.',
        x: 18,
        y: 35,
      },
    ],
    explanation: 'Generative diffusion models synthesize images by calculating pixel correlations rather than understanding human skeletal anatomy or physics. Hands and text are frequent hallucination spots!',
  },
  {
    id: 'dog-real',
    title: 'Puppy on the Sunlit Porch',
    src: '/src/assets/images/spot_the_bot_real_dog_1790642711726.jpg',
    isAi: false,
    difficulty: 'Intermediate',
    glitches: [],
    realEvidence: 'Natural fur direction, authentic canine paw anatomy with 4 standard toes and dewclaws, coherent shadow angles matching the sun position, and clean crisp porch board lines with natural woodgrain knots.',
    explanation: 'This is an authentic photograph! Real camera optics capture coherent focal blur, consistent light source vectors, and anatomically accurate physical paws.',
  },
  {
    id: 'market-ai',
    title: 'Fresh Fruit Vendor Stall',
    src: '/src/assets/images/spot_the_bot_ai_market_1790642721479.jpg',
    isAi: true,
    difficulty: 'Detective Master',
    glitches: [
      {
        pointType: 'anatomy',
        title: 'Asymmetrical Pupil & Teeth Row',
        description: 'The vendor has mismatched eye pupil shapes and double teeth rows along the jawline.',
        x: 52,
        y: 38,
      },
      {
        pointType: 'text',
        title: 'Scrambled Market Sign',
        description: 'The awning banner spells gibberish shapes that mimic Latin alphabet characters.',
        x: 50,
        y: 12,
      },
      {
        pointType: 'edge',
        title: 'Melting Produce Basket',
        description: 'The tomato crate blends directly into the wood grain of the counter with no boundary shadow.',
        x: 28,
        y: 72,
      },
    ],
    explanation: 'Diffusion models struggle with consistent background typography and boundary occlusion where objects touch flat surfaces.',
  },
];

export const TRAINING_CARDS_DATA: TrainingCard[] = [
  // Animals / Four legs
  { id: 'c1', name: 'Golden Retriever Dog', category: 'Animal', legs: 4, isAnimal: true, icon: '🐕' },
  { id: 'c2', name: 'Siamese Cat', category: 'Animal', legs: 4, isAnimal: true, icon: '🐈' },
  { id: 'c3', name: 'African Elephant', category: 'Animal', legs: 4, isAnimal: true, icon: '🐘' },
  { id: 'c4', name: 'Wild Mustang Horse', category: 'Animal', legs: 4, isAnimal: true, icon: '🐎' },
  { id: 'c5', name: 'Spotted Deer', category: 'Animal', legs: 4, isAnimal: true, icon: '🦌' },
  { id: 'c6', name: 'Green Tree Frog', category: 'Animal', legs: 4, isAnimal: true, icon: '🐸' },
  { id: 'c7', name: 'Bald Eagle', category: 'Animal', legs: 2, isAnimal: true, icon: '🦅' },
  { id: 'c8', name: 'Emperor Penguin', category: 'Animal', legs: 2, isAnimal: true, icon: '🐧' },
  { id: 'c9', name: 'Garden Snail', category: 'Animal', legs: 0, isAnimal: true, icon: '🐌' },
  { id: 'c10', name: 'Clownfish', category: 'Animal', legs: 0, isAnimal: true, icon: '🐠' },
  // Furniture / Inanimate
  { id: 'c11', name: 'Wooden Dining Chair', category: 'Furniture', legs: 4, isAnimal: false, icon: '🪑' },
  { id: 'c12', name: 'Classroom Study Desk', category: 'Furniture', legs: 4, isAnimal: false, icon: '🪵' },
  { id: 'c13', name: 'Living Room Coffee Table', category: 'Furniture', legs: 4, isAnimal: false, icon: '🛋️' },
  { id: 'c14', name: 'Computer Monitor', category: 'Electronics', legs: 1, isAnimal: false, icon: '🖥️' },
  { id: 'c15', name: 'School Bus', category: 'Vehicle', legs: 0, isAnimal: false, icon: '🚌' },
  // Food items
  { id: 'c16', name: 'Crisp Red Apple', category: 'Food', isFood: true, isHealthy: true, sweetness: 'sweet', icon: '🍎' },
  { id: 'c17', name: 'Fresh Broccoli Crown', category: 'Food', isFood: true, isHealthy: true, sweetness: 'savory', icon: '🥦' },
  { id: 'c18', name: 'Carrot Sticks', category: 'Food', isFood: true, isHealthy: true, sweetness: 'savory', icon: '🥕' },
  { id: 'c19', name: 'Cheesy Pepperoni Pizza', category: 'Food', isFood: true, isHealthy: false, sweetness: 'savory', icon: '🍕' },
  { id: 'c20', name: 'Chocolate Frosted Cupcake', category: 'Food', isFood: true, isHealthy: false, sweetness: 'sweet', icon: '🧁' },
  { id: 'c21', name: 'Vanilla Ice Cream Cone', category: 'Food', isFood: true, isHealthy: false, sweetness: 'sweet', icon: '🍦' },
  { id: 'c22', name: 'Salted French Fries', category: 'Food', isFood: true, isHealthy: false, sweetness: 'savory', icon: '🍟' },
  // Weekend Activities
  { id: 'c23', name: 'Soccer Match in the Park', category: 'Activity', weekendFunScore: 9, icon: '⚽' },
  { id: 'c24', name: 'Playing Video Games with Friends', category: 'Activity', weekendFunScore: 9, icon: '🎮' },
  { id: 'c25', name: 'Reading a Graphic Novel', category: 'Activity', weekendFunScore: 8, icon: '📚' },
  { id: 'c26', name: 'Folding Laundry & Doing Chores', category: 'Activity', weekendFunScore: 2, icon: '🧺' },
  { id: 'c27', name: 'Visiting the Public Science Center', category: 'Activity', weekendFunScore: 8, icon: '🚀' },
  { id: 'c28', name: 'Studying Spelling Words Flashcards', category: 'Activity', weekendFunScore: 3, icon: '📝' },
];

export const ML_SECRET_RULES = [
  {
    id: 'four-legs',
    name: 'Things with Exactly 4 Legs (Objective Rule)',
    type: 'objective',
    description: 'Sort items based purely on physical characteristics (has 4 support legs).',
    matcher: (c: TrainingCard) => c.legs === 4,
    recommendedPositive: ['c1', 'c2', 'c3', 'c4'], // dog, cat, elephant, horse
    recommendedNegative: ['c7', 'c8', 'c14', 'c15'], // eagle, penguin, monitor, bus
    testBatch: [
      { cardId: 'c11', expected: true, note: 'A chair has 4 legs, but is not an animal! Did your AI think legs = animal?' },
      { cardId: 'c6', expected: true, note: 'A frog has 4 legs. If the model only saw big furry pets, it might hesitate.' },
      { cardId: 'c9', expected: false, note: 'A snail has 0 legs.' },
    ],
  },
  {
    id: 'living-animals',
    name: 'Living Animals (Objective Rule)',
    type: 'objective',
    description: 'Any living creature in the animal kingdom.',
    matcher: (c: TrainingCard) => !!c.isAnimal,
    recommendedPositive: ['c1', 'c2', 'c5', 'c6'],
    recommendedNegative: ['c11', 'c12', 'c16', 'c19'],
    testBatch: [
      { cardId: 'c10', expected: true, note: 'Clownfish is an animal, even without fur or legs!' },
      { cardId: 'c13', expected: false, note: 'Table is inanimate.' },
      { cardId: 'c8', expected: true, note: 'Penguin is a bird/animal.' },
    ],
  },
  {
    id: 'sweet-treats',
    name: 'Sweet Treats (Dietary / Preference)',
    type: 'bias',
    description: 'Only sugary dessert foods. Notice what happens to savory dinner meals!',
    matcher: (c: TrainingCard) => c.isFood === true && c.sweetness === 'sweet',
    recommendedPositive: ['c16', 'c20', 'c21'],
    recommendedNegative: ['c17', 'c18', 'c19'],
    testBatch: [
      { cardId: 'c22', expected: false, note: 'Fries are savory, not sweet!' },
      { cardId: 'c16', expected: true, note: 'Apple is naturally sweet fruit.' },
      { cardId: 'c19', expected: false, note: 'Pizza is savory dinner.' },
    ],
  },
  {
    id: 'best-weekend',
    name: 'Best Weekend Activities (Pure Human Opinion)',
    type: 'bias',
    description: 'What counts as "fun"? Your training data will encode your personal preferences!',
    matcher: (c: TrainingCard) => (c.weekendFunScore ?? 0) >= 7,
    recommendedPositive: ['c23', 'c24', 'c27'], // soccer, games, science center
    recommendedNegative: ['c26', 'c28'], // laundry, spelling drill
    testBatch: [
      { cardId: 'c25', expected: true, note: 'Reading graphic novels: Some kids rate this a 10/10, others rate it low! The AI blindly adopts whoever trained it.' },
      { cardId: 'c26', expected: false, note: 'Chores are usually voted down.' },
      { cardId: 'c24', expected: true, note: 'Gaming with friends.' },
    ],
  },
];

export const DILEMMA_SCENARIOS: DilemmaScenario[] = [
  {
    id: 'dilemma-1',
    title: 'The Essay Outline Assistant',
    category: 'School & Honesty',
    context: 'You have a 4th-grade social studies research report due on California Gold Rush miners.',
    question: 'Is it okay to ask an AI chatbot to generate a 3-point outline for your essay if you research all the facts and write every single paragraph yourself?',
    example: 'Prompt: "Give me 3 subtopics for a 4th grade report on Gold Rush tools and life."',
    parentTip: 'Distinguish between using AI as an organizer/brainstorming spark vs having AI write sentences for you. Many schools allow idea brainstorming if cited.',
    suggestedAnswers: {
      allowed: 'Yes! Using AI for idea brainstorming is like using a library topic guide, as long as you write every paragraph and fact-check the dates.',
      notAllowed: 'No! If your teacher said to do all planning without digital tools, following teacher guidelines always comes first.',
      itDepends: 'It depends on your classroom guidelines! Always ask your teacher: "May I use AI to outline my ideas before I write?"',
    },
  },
  {
    id: 'dilemma-2',
    title: 'The Cartoon Friend Filter',
    category: 'Privacy & Friendship',
    context: 'You find a cool new app that transforms any portrait into a cute 3D Pixar-style cartoon superhero.',
    question: 'Is it okay to upload a photo of your classmate into an AI app to turn them into a cartoon superhero without asking their permission first?',
    example: 'You take a snapshot of your friend at recess and upload it to an online generator to show them at lunch.',
    parentTip: 'Discuss consent and where uploaded photos go. AI apps store facial photos on external servers or use them to train commercial models.',
    suggestedAnswers: {
      allowed: 'Only if your friend and their family explicitly said "Yes! Go for it!"',
      notAllowed: 'Not okay! We never upload photos or biometric likeness of friends or classmates without their consent.',
      itDepends: 'If you ask them first: "Hey, want me to make a cartoon of us?", and their parent is okay with the app terms, then it is respectful.',
    },
  },
  {
    id: 'dilemma-3',
    title: 'The Math Homework Explainer',
    category: 'School & Honesty',
    context: 'It is 7:30 PM on a Tuesday and you are totally stuck on a two-step long division word problem.',
    question: 'Is it ethical to paste the word problem into an AI tutor and ask: "Can you explain step-by-step how to think through this problem without just giving me the final answer?"',
    example: 'Prompt: "Do not give the answer. Guide me with clues to solve 432 divided by 6."',
    parentTip: 'Using AI as a patient Socratic tutor who asks questions is active learning; copying the final quotient onto homework is cheating.',
    suggestedAnswers: {
      allowed: 'Ethical! Asking for hints and conceptual explanations helps your brain learn the math steps.',
      notAllowed: 'Unethical if you simply copy the answer without doing the calculation in your own notebook.',
      itDepends: 'Depends on whether you try it yourself first and double-check your work with your parents or teacher.',
    },
  },
  {
    id: 'dilemma-4',
    title: 'The Voice Cloner Prank',
    category: 'Safety & Fact-Checking',
    context: 'A website lets you record 10 seconds of someone speaking and makes a clone that says any sentence you type.',
    question: 'Is it okay to clone your best friend’s voice to make an audio message saying they forgot their lunch, just as a joke in a family group chat?',
    example: 'A 15-second cloned audio clip sent to a family member as a harmless prank.',
    parentTip: 'Deepfake audio and voice cloning present major trust and safety dangers. Even "harmless" pranks erode trust and can frighten family members.',
    suggestedAnswers: {
      allowed: 'Never allowed for real people without strict adult supervision and consent.',
      notAllowed: 'Unethical and unsafe. Impersonating someone’s voice creates confusion, can cause real anxiety, and violates digital safety rules.',
      itDepends: 'Voice cloning should only ever be used for fictional cartoon characters or school drama projects with full permission.',
    },
  },
  {
    id: 'dilemma-5',
    title: 'The Science Fair Poster Illustration',
    category: 'Creativity & Art',
    context: 'You built a working model of a solar water purification filter for the school STEM fair.',
    question: 'Is it okay to generate an AI image of a futuristic solar city to decorate your poster board title banner?',
    example: 'You prompt an AI generator for a banner visual and glue it to your science fair display.',
    parentTip: 'Transparency is the key rule of AI ethics: crediting your tools. A label stating "Banner generated with AI; Science experiment conducted by student" is honest.',
    suggestedAnswers: {
      allowed: 'Allowed, provided you add a clear citation credit: "Background image generated with AI tool"',
      notAllowed: 'Not allowed if the science fair has an "All original student drawings only" rule, or if you claim you hand-painted it.',
      itDepends: 'Always label the image so judges know what you built with your hands versus what the computer drew.',
    },
  },
  {
    id: 'dilemma-6',
    title: 'Sharing Personal Details with Chatbots',
    category: 'Privacy & Friendship',
    context: 'You are chatting with a conversational AI companion and it asks: "What school do you go to, what is your full name, and when is your birthday?"',
    question: 'Should you type in your real school name, your home address, or your full name to make the chatbot experience more personal?',
    example: 'Typing: "I am Alex Smith, I go to Oak Creek Elementary in Mrs. Davis’s 4th grade class."',
    parentTip: 'Review basic PII (Personally Identifiable Information). Never share names, addresses, birthdays, or school locations with online AI systems.',
    suggestedAnswers: {
      allowed: 'Never share personal identification data with any AI app or chatbot.',
      notAllowed: 'Unsafe! AI companies log chat conversations and your data could be seen by engineers or saved in databases.',
      itDepends: 'Use a fun fictional nickname (like "SpacePilot99") instead of your real name!',
    },
  },
];

export const DEFAULT_FAMILY_RULES = [
  'We ask a parent or guardian before downloading or trying any new AI website or app.',
  'We use AI as a thinking partner and brainstorming buddy, never to copy-paste homework.',
  'We never share our full names, passwords, home address, school name, or photos of others.',
  'We always fact-check AI answers with books, reputable websites, or teachers before trusting them.',
  'If an AI gives an answer that feels weird, scary, or unkind, we immediately show an adult.',
  'We give credit: if AI helped us brainstorm, we are honest and proud to say so.',
  'We treat real people with respect and never use AI to impersonate or embarrass anyone.',
];
