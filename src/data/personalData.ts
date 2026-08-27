import { Artist, Book, WardrobeItem, TravelDestination, ArchiveItem, BlogPost, PersonalitySlider } from '../types';

export const PERSONAL_INFO = {
  name: "MANPREET SINGH",
  nickname: "MANNI",
  digitalIdentity: "STARBOY",
  taglines: [
    "Just a chill guy trying to understand everything.",
    "Comfortable in the quiet. Curious in the chaos.",
    "Music on. World off. Observant by nature.",
    "Somewhere between a psychological thriller and an old-money playlist."
  ],
  birthday: "6 July 2008",
  birthdateRaw: "2008-07-06",
  currentCity: "Chandigarh",
  currentCitySubtitle: "Current Life & Urban Strolls",
  community: "Super 60 Community",
  college: "Swami Vivekanand Institute of Engineering & Technology (SVIET), Chandigarh",
  cohortSubtitle: "Part of the elite Super 60 Community @ SVIET Chandigarh",
  hometown: "Nagina",
  hometownSubtitle: "Uttar Pradesh — The Roots",
  faith: "Believes in God • Grounded in quiet gratitude & inner peace",
  instagram: {
    handle: "@thmnprt",
    url: "https://www.instagram.com/thmnprt/?hl=en"
  },
  snapchat: {
    handle: "@thmnprt",
    url: "https://www.snapchat.com/add/thmnprt?share_id=GYPMvvLhJSw&locale=en-IN"
  },
  privateInstagram: {
    handle: "@mnprt.404",
    url: "https://www.instagram.com/mnprt.404/"
  },
  appleMusic: {
    handle: "@thmnprt",
    url: "https://music.apple.com/profile/thmnprt"
  },
  primaryColor: "#000000",
  accentColor: "#DC2626", // Deep Crimson Red
  audioTrack: {
    title: "After Hours",
    artist: "The Weeknd",
    youtubeId: "sI3FS119zNI",
    youtubeUrl: "https://youtu.be/sI3FS119zNI?si=zWrFaispcuN1YGyH",
    audioSrc: "/audio/after-hours.mp3",
    tempo: "109 BPM",
    mood: "Late Night Noir • Melancholic Drive • Cinematic Heartbreak"
  }
};

export const PERSONALITY_STATEMENTS = [
  { text: "Chill by choice.", highlight: "choice" },
  { text: "Curious by default.", highlight: "default" },
  { text: "Music on. World off.", highlight: "Music" },
  { text: "Probably overthinking something unnecessarily.", highlight: "overthinking" },
  { text: "Likes travelling and exploring places alone.", highlight: "alone" },
  { text: "Reads nonfiction for fun.", highlight: "nonfiction" },
  { text: "Fashion is part of the mood, not an audition.", highlight: "mood" },
  { text: "Comfortable being myself without seeking a crowd.", highlight: "myself" },
  { text: "Investigates human psychology like a case file.", highlight: "psychology" },
  { text: "Believes in God, quiet work, and great playlists.", highlight: "gratitude" }
];

export const PERSONALITY_SLIDERS: PersonalitySlider[] = [
  {
    id: "curiosity",
    label: "CURIOUSNESS",
    defaultValue: 96,
    min: 0,
    max: 100,
    lowLabel: "Asleep",
    highLabel: "Infinite",
    comment: "Needs to know how everything works and why people do what they do."
  },
  {
    id: "music",
    label: "MUSIC DEPENDENCY",
    defaultValue: 99,
    min: 0,
    max: 100,
    lowLabel: "Podcast only",
    highLabel: "Life Soundtrack",
    comment: "If headphones die, day is officially paused."
  },
  {
    id: "fashion",
    label: "FASHION ENERGY",
    defaultValue: 88,
    min: 0,
    max: 100,
    lowLabel: "Sweatpants",
    highLabel: "Editorial Noir",
    comment: "Clean silhouettes, all-black palette, old-money tailoring."
  },
  {
    id: "social",
    label: "SOCIAL BATTERY",
    defaultValue: 48,
    min: 0,
    max: 100,
    lowLabel: "Airplane Mode",
    highLabel: "Extrovert Party",
    comment: "Warm and chill, but recovers best in peaceful solitary moments."
  },
  {
    id: "travel",
    label: "TRAVEL URGE",
    defaultValue: 92,
    min: 0,
    max: 100,
    lowLabel: "Couch",
    highLabel: "Solo Wanderer",
    comment: "Give him a train ticket, a new city, and zero itinerary."
  },
  {
    id: "overthinking",
    label: "OVERTHINKING",
    defaultValue: 82,
    min: 0,
    max: 100,
    lowLabel: "Zen",
    highLabel: "4D Chess",
    comment: "Deconstructing a 3-second interaction from two years ago."
  },
  {
    id: "chaos",
    label: "CHAOS / SARCASM",
    defaultValue: 65,
    min: 0,
    max: 100,
    lowLabel: "Deadpan",
    highLabel: "Witty Havoc",
    comment: "Delivers sarcastic observations with an innocent straight face."
  }
];

export const ARTISTS_DATA: Artist[] = [
  {
    id: "weeknd",
    name: "THE WEEKND",
    genre: "Dark R&B / Cinematic Pop / Synthwave",
    mood: "Night / Cinematic / Energetic / Unapologetic",
    bestTime: "2:00 AM solo highway drives or late-night focus sessions",
    personalNote: "The origin of the 'Starboy' aesthetic. Abel creates cinematic sonic worlds that turn ordinary moments into dramatic film scenes.",
    colorAccent: "#DC2626",
    topTracks: ["Starboy", "São Paulo", "Timeless", "After Hours"]
  },
  {
    id: "lana",
    name: "LANA DEL REY",
    genre: "Baroque Pop / Cinematic Americana",
    mood: "Dreamy / Cinematic / Melancholic / Vintage Nostalgia",
    bestTime: "Sunset strolls, rainy evenings, and solitary reflective moods",
    personalNote: "Unmatched atmospheric storytelling. Her production feels like a 35mm film reel spinning in an empty theater.",
    colorAccent: "#93C5FD",
    topTracks: ["West Coast", "Summertime Sadness", "Chemtrails Over the Country Club", "Young and Beautiful (Orchestral)"]
  },
  {
    id: "billie",
    name: "BILLIE EILISH",
    genre: "Alt-Pop / Dark Ambient / Minimal Bass",
    mood: "Dark / Atmospheric / Experimental / Intimate",
    bestTime: "Noise-canceling headphones in complete darkness",
    personalNote: "Intimate whisper vocals over heavy, unconventional basslines. Masterclass in spatial audio and psychological sonic tension.",
    colorAccent: "#34D399",
    topTracks: ["WILDFLOWER", "BIRDS OF A FEATHER", "bellyache", "everything i wanted"]
  }
];

export const BOOKS_DATA: Book[] = [
  {
    id: "art-of-being-alone",
    title: "The Art of Being Alone",
    author: "Solitude & Self-Mastery",
    category: "Psychology & Self-Discovery",
    rating: 5,
    isFeatured: true,
    importance: "The defining book that transformed solitude from an avoided silence into a superpower of self-clarity and personal independence.",
    reflection: "Society frequently confuses being alone with loneliness. This book crystallized what I already felt: learning to be comfortable in your own mind removes the desperate need for external validation. It makes you independent, curious, and grounded.",
    quote: "Solitude is where you meet yourself without the noise of who everyone else wants you to be.",
    coverColor: "#1A1A1E"
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Behavioral Psychology & Systems",
    rating: 5,
    isFeatured: false,
    importance: "Proof that monumental personal transformation isn't about dramatic overnight moves, but quiet, consistent 1% compounding systems.",
    reflection: "Changed how I approach daily routines, reading discipline, and personal habits. Identity comes from the evidence of small actions repeated daily.",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    coverColor: "#221C14"
  },
  {
    id: "placeholder-1",
    title: "Next Psychology & Human Strategy Read",
    author: "Behavioral Science Archive",
    category: "Psychology & Investigation",
    rating: 0,
    isFeatured: false,
    isPlaceholder: true,
    importance: "Currently curating deep dives on body language analysis, profiling, and cognitive behavioral models.",
    reflection: "Placeholder reserved for next addition to Manni's physical bookshelf.",
    quote: "Curiosity is the engine of the intellect.",
    coverColor: "#121214"
  }
];

export const WARDROBE_ITEMS: WardrobeItem[] = [
  {
    id: "black-sweater",
    name: "Oversized Merino Black Knit",
    category: "SWEATERS",
    description: "Heavyweight drop-shoulder knit in obsidian black. Clean drape, subtle ribbed collar, effortless presence.",
    sarcasticQuote: "Because apparently one color can gracefully handle every situation on Earth.",
    color: "#0A0A0A",
    material: "100% Fine Merino Wool",
    vibe: "Winter Solitude / Editorial Calm",
    iconName: "Shirt"
  },
  {
    id: "structured-polo",
    name: "Midnight Milanese Knit Polo",
    category: "POLOS",
    description: "Textured open-collar knit polo without buttons. Relaxed elegance influenced by vintage Italian menswear.",
    sarcasticQuote: "Smart enough for a dinner, chill enough to look like I didn't spend 20 minutes deciding.",
    color: "#141416",
    material: "High-twist Cotton Silk Blend",
    vibe: "Old-Money Minimalist",
    iconName: "Sparkles"
  },
  {
    id: "gurkha-trousers",
    name: "Pleated Double-Buckle Gurkha Trousers",
    category: "GURKHA PANTS",
    description: "High-rise tailored trousers with signature wrap cummerbund waist and deep twin forward pleats.",
    sarcasticQuote: "Belts are for amateurs; side buckles provide tactical sartorial sophistication.",
    color: "#1E1E22",
    material: "Tropical Wool Gabardine",
    vibe: "Sartorial Architecture",
    iconName: "Layers"
  },
  {
    id: "tailored-pants",
    name: "Charcoal Relaxed Wide-Leg Slacks",
    category: "TROUSERS",
    description: "Sleek flowing silhouette that drapes cleanly over footwear with zero break.",
    sarcasticQuote: "Proof that trousers can be tailored without feeling like a prison sentence.",
    color: "#18181A",
    material: "Heavy Drape Viscose Blend",
    vibe: "Monochrome Editorial",
    iconName: "Compass"
  },
  {
    id: "derby-shoes",
    name: "Chunky Commando Sole Derby",
    category: "FORMAL SHOES",
    description: "Glossed black calfskin with a rugged welted lug sole. Balances formal structure with architectural weight.",
    sarcasticQuote: "Makes enough acoustic presence in empty hallways to sound like an impending detective scene.",
    color: "#050505",
    material: "Polished Box Calf Leather",
    vibe: "Noir Formal",
    iconName: "Footprints"
  },
  {
    id: "minimal-sneakers",
    name: "Low-Profile Monochrome Stealth Runners",
    category: "SNEAKERS",
    description: "Clean unbranded silhouette in matte black and slate accents, designed for endless solo walking.",
    sarcasticQuote: "For the days where I walk 12 kilometers through the city just to think about nothing.",
    color: "#111113",
    material: "Matte Leather & Mesh",
    vibe: "All-Day Urban Exploration",
    iconName: "Activity"
  },
  {
    id: "silver-accents",
    name: "Architectural Silver Band & Minimal Watch",
    category: "ACCESSORIES",
    description: "Raw 925 sterling silver geometric signet ring paired with a dark minimalist dial on black leather.",
    sarcasticQuote: "Tells the time, but mostly serves as a fidget device during lengthy conversations.",
    color: "#D4D4D8",
    material: "925 Sterling Silver & Sapphire Glass",
    vibe: "Subtle Luxury",
    iconName: "Watch"
  }
];

export const TRAVEL_DESTINATIONS: TravelDestination[] = [
  {
    id: "chandigarh",
    name: "Chandigarh",
    stateOrCountry: "India",
    type: "current",
    badge: "CURRENT BASE",
    description: "The city of open spaces, tree-lined boulevards, Le Corbusier geometry, and quiet evening walks with headphones on.",
    coordinates: "30.7333° N, 76.7794° E",
    vibe: "Organized Grid • Green Canopies • Focus Mode",
    soundtrack: "The Weeknd — After Hours"
  },
  {
    id: "nagina",
    name: "Nagina",
    stateOrCountry: "Uttar Pradesh, India",
    type: "hometown",
    badge: "HOMETOWN / ROOTS",
    description: "The historical hometown known for its intricate woodcraft heritage, grounding memories, and childhood beginnings.",
    coordinates: "29.4447° N, 78.4314° E",
    vibe: "Origin • Nostalgia • Quiet Heritage",
    soundtrack: "Lana Del Rey — Video Games"
  },
  {
    id: "amalfi",
    name: "Amalfi Coast",
    stateOrCountry: "Campania, Italy",
    type: "wishlist",
    badge: "WISHLIST EXPLORATION",
    description: "Dramatic vertical cliffs, winding coastal asphalt, old-money linen tailoring, Mediterranean breezes, and solitary serenity overlooking the Tyrrhenian Sea.",
    coordinates: "40.6340° N, 14.6027° E",
    vibe: "Cinematic Drama • Coastal Silence • Sartorial Luxury",
    soundtrack: "Lana Del Rey — Young and Beautiful (Orchestral)"
  },
  {
    id: "kyoto",
    name: "Kyoto",
    stateOrCountry: "Kansai, Japan",
    type: "wishlist",
    badge: "WISHLIST EXPLORATION",
    description: "Rain-dappled stone pathways, centuries-old wooden shrines, minimalist zen bamboo groves, and supreme quiet contemplation.",
    coordinates: "35.0116° N, 135.7681° E",
    vibe: "Minimalist Zen • Solitary Wonder • Architecture",
    soundtrack: "Billie Eilish — everything i wanted"
  },
  {
    id: "santorini",
    name: "Santorini",
    stateOrCountry: "Cyclades, Greece",
    type: "wishlist",
    badge: "WISHLIST EXPLORATION",
    description: "Volcanic caldera cliffs, whitewashed cubist architecture against cobalt seas, dramatic golden hour horizons, and absolute peaceful isolation.",
    coordinates: "36.3932° N, 25.4615° E",
    vibe: "Aegean Horizon • Pure White & Obsidian • Twilight Calm",
    soundtrack: "The Weeknd — Timeless"
  }
];

export const STARBOY_ARCHIVE: ArchiveItem[] = [
  {
    category: "COLOR",
    title: "Signature Hue",
    value: "Obsidian Black (#000000)",
    personalityTrait: "Clarity, calm, versatility, and timeless non-distraction.",
    notes: "Default visual anchor across wardrobe, OS interfaces, and personal identity.",
    isKnown: true
  },
  {
    category: "MUSIC",
    title: "Anthem",
    value: "The Weeknd — Starboy",
    personalityTrait: "Cinematic confidence, night energy, independent drive.",
    notes: "The defining track that inspired the persona and late-night focus sessions.",
    isKnown: true
  },
  {
    category: "ARTISTS",
    title: "Holy Trinity",
    value: "The Weeknd • Lana Del Rey • Billie Eilish",
    personalityTrait: "Appreciation for melancholic depth, dark bass, and visual audio worlds.",
    notes: "Curated daily rotation; connects cinematic storytelling with spatial bass.",
    isKnown: true
  },
  {
    category: "COMMUNITY",
    title: "Engineering & Tech Cohort",
    value: "Super 60 Community • SVIET Chandigarh",
    personalityTrait: "Selective peer learning, high-agency development, and collective technical excellence.",
    notes: "Part of the elite Super 60 community at Swami Vivekanand Institute of Engineering & Technology (SVIET), Chandigarh.",
    isKnown: true
  },
  {
    category: "SPORTS",
    title: "Formula 1 Racing",
    value: "F1 • Charles Leclerc (Scuderia Ferrari #16)",
    personalityTrait: "High-speed precision, qualifying lap perfectionism, resilience under extreme pressure.",
    notes: "Obsessed with telemetry, Monaco apex lines, aerodynamic strategy, and Leclerc's pure qualifying masterclasses.",
    isKnown: true
  },
  {
    category: "SPORTS",
    title: "Football / Joga Bonito",
    value: "Football • Neymar Jr. (Brazil)",
    personalityTrait: "Creative audacity, samba flair, unpredictability, and expressive star presence.",
    notes: "Inspired by Neymar Jr. (Brazil) — effortless street flair, joyful playmaking, unpredictability, and unapologetic samba swagger on the world stage.",
    isKnown: true
  },
  {
    category: "SPORTS",
    title: "Cricket Mastery",
    value: "Cricket • Shreyas Iyer (PBKS, India)",
    personalityTrait: "Calculated aggression, middle-order poise, aggressive intent against spin, clutch captaincy temperament.",
    notes: "Admiring Shreyas Iyer (PBKS, India) — fearless strokeplay, calm captaincy composure, and decisive match-winning drives.",
    isKnown: true
  },
  {
    category: "WEB SERIES",
    title: "Top Case Files",
    value: "You • The Mentalist • Dexter",
    personalityTrait: "Fascination with human cognitive patterns, strategy, and anti-hero psychology.",
    notes: "Studying human deductive deduction, mentalism, and psychological double lives.",
    isKnown: true
  },
  {
    category: "GENRE",
    title: "Storytelling Vibe",
    value: "Psychological Thriller / Mystery / Crime / Suspense",
    personalityTrait: "Curiosity about motives, chess-like planning, and complex characters.",
    notes: "Gravitates toward stories where intelligence, observation, and subtlety dictate the outcome.",
    isKnown: true
  },
  {
    category: "BOOKS",
    title: "Core Philosophies",
    value: "The Art of Being Alone • Atomic Habits",
    personalityTrait: "Independence, self-reflection, compounding consistency, solitude mastery.",
    notes: "Belief that daily systems dictate destiny, and quiet solitude is an intellectual superpower.",
    isKnown: true
  },
  {
    category: "FASHION",
    title: "Aesthetic Direction",
    value: "Minimal / Editorial / Dark Tailoring / Old-Money Nuance",
    personalityTrait: "Quiet expression, structured simplicity, refusal to follow loud trends.",
    notes: "Merino knits, Gurkha trousers, chunky derbies, and razor-sharp monochrome silhouettes.",
    isKnown: true
  },
  {
    category: "TRAVEL",
    title: "Exploration Mode",
    value: "Amalfi Coast • Kyoto • Santorini • Solo wandering",
    personalityTrait: "Discovery without social obligations, soaking in atmospheres unhurried.",
    notes: "Exploring architectural grids, quiet cafes, and dramatic cliffside landscapes with headphones.",
    isKnown: true
  },
  {
    category: "FOOD",
    title: "Culinary Palate",
    value: "Rich black coffees, comfort street favorites, quiet cafe corners",
    personalityTrait: "Simplicity, unpretentious tastes, and cozy sensory pauses.",
    notes: "Dark roasts, solitary breakfast bars, and discovering hidden local spots.",
    isKnown: true
  },
  {
    category: "TECH",
    title: "Digital Setup",
    value: "High-spec ANC headphones, dark mode OS, minimal homescreen, Apple ecosystem",
    personalityTrait: "Efficiency, immersive personal workspaces, clean interfaces.",
    notes: "Zero visual clutter, focus modes activated, high fidelity audio pipeline.",
    isKnown: true
  },
  {
    category: "MOVIES",
    title: "Cinematography Taste",
    value: "Neo-noir thrillers, psychological puzzle films, moody atmospheric pictures",
    personalityTrait: "Visual pacing, dramatic shadows, nuanced tension.",
    notes: "High contrast lighting, subtle sound design, and introspective character journeys.",
    isKnown: true
  },
  {
    category: "AESTHETICS",
    title: "Visual Language",
    value: "Apple precision × Dark Luxury editorial × Spider-web geometry",
    personalityTrait: "Balance of pristine structure with mysterious underground soul.",
    notes: "Obsidian glass panels, crisp typography, and crimson accents.",
    isKnown: true
  },
  {
    category: "HOBBIES",
    title: "Pastimes",
    value: "Curating music archives, analyzing stories, F1 race telemetry, fashion exploration, solo city treks",
    personalityTrait: "Self-driven enrichment that recharges internal battery.",
    notes: "Activities that require zero social validation and maximize curiosity.",
    isKnown: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "art-of-solitude",
    title: "Why being alone isn't the same as being lonely",
    date: "Aug 2026",
    readTime: "3 min read",
    category: "Thoughts & Solitude",
    excerpt: "The modern world has turned solitude into a pathology. Here is why choosing to spend time with yourself is the greatest shortcut to self-clarity.",
    content: [
      "People often equate an empty room with an empty life. If you tell someone you spent Friday night walking through the city alone with a new album in your headphones, they look at you with sympathetic eyes.",
      "They think you were left out. In reality, you simply chose not to negotiate your peace.",
      "Reading 'The Art of Being Alone' gave a clear language to what I had always experienced. Loneliness is the painful absence of other people; solitude is the rich, peaceful presence of yourself.",
      "When you are comfortable in your own silence, you stop making desperate compromises. You choose friendships out of genuine resonance rather than fear of being unaccompanied.",
      "Independence isn't about rejecting the world — it's about knowing you are already steady within it."
    ],
    isDemo: true
  },
  {
    id: "why-black-default",
    title: "Why black became my default color",
    date: "Aug 2026",
    readTime: "2 min read",
    category: "Fashion & Mood",
    excerpt: "It isn't angst, and it isn't laziness. Black is the ultimate filter against noise, allowing form, silhouette, and posture to speak first.",
    content: [
      "Someone once asked me why 90% of my wardrobe looks like a midnight blackout.",
      "The answer is simple: black is the only color that simultaneously says everything and nothing. It refuses to compete for attention, which ironically makes it the most noticeable thing in a room.",
      "In fashion, when you strip away neon logos and chaotic prints, all you are left with is cut, fabric weight, and how naturally you carry yourself.",
      "It eliminates cognitive fatigue in the morning and gives every day an editorial baseline.",
      "Call it minimal, call it mysterious, but honestly? It just works."
    ],
    isDemo: true
  },
  {
    id: "cinematic-music",
    title: "Music makes ordinary days cinematic",
    date: "Jul 2026",
    readTime: "3 min read",
    category: "Music Archive",
    excerpt: "The right song transforms a mundane street corner into the climax of a Christopher Nolan or David Fincher film.",
    content: [
      "You put on Abel's 'Starboy' or Lana's 'Video Games', step outside into a crisp breeze, and suddenly you aren't just walking to get groceries — you are the protagonist in an atmospheric third-act sequence.",
      "Music for me is not background noise. It is an emotional filter that alters the color grading of reality.",
      "From Billie's sub-bass whispers to The Weeknd's neon-lit nocturnal synths, great audio is the closest thing we have to time travel and emotional architecture.",
      "That is why good headphones are non-negotiable equipment for daily survival."
    ],
    isDemo: true
  },
  {
    id: "books-that-rewired-me",
    title: "What books actually changed my thinking?",
    date: "Jul 2026",
    readTime: "4 min read",
    category: "Books & Psychology",
    excerpt: "I don't read to look smart on Instagram. I read books that act like cognitive software upgrades.",
    content: [
      "Most self-help books could have been an 800-word blog post. But occasionally, you encounter ideas that fundamentally rewire how you make decisions.",
      "Atomic Habits showed me that motivation is a fleeting emotion, while architecture is permanent. If you change your environment, your behavior follows with zero friction.",
      "Paired with psychology and character studies from thrillers, reading nonfiction is like examining the source code of human behavior.",
      "Curiosity isn't work when you are genuinely fascinated by why people tick."
    ],
    isDemo: true
  }
];

export const CHILL_STATUS_CARDS = [
  {
    title: "CURRENT PLANS",
    value: "“Let’s see.”",
    subtext: "Leaving 80% of life open for spontaneous exploration and good music.",
    badge: "FLEXIBLE"
  },
  {
    title: "CURRENT MOOD",
    value: "“Depends on the playlist.”",
    subtext: "Shift between late-night noir thriller and breezy daytime chill in 3 seconds.",
    badge: "DYNAMIC"
  },
  {
    title: "SOCIAL BATTERY",
    value: "“Charging at 42%”",
    subtext: "Currently recharging through solo reading, coffee, and quiet playlists.",
    badge: "RECHARGING"
  },
  {
    title: "LIFE ALGORITHM",
    value: "“Loading next chapter…”",
    subtext: "Focusing on personal growth, self-trust, and trusting God’s timing.",
    badge: "IN PROGRESS"
  }
];
