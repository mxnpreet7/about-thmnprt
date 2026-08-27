export interface Artist {
  id: string;
  name: string;
  genre: string;
  mood: string;
  bestTime: string;
  personalNote: string;
  colorAccent: string;
  coverImage?: string;
  topTracks: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  importance: string;
  reflection: string;
  quote: string;
  isFeatured?: boolean;
  coverColor: string;
  isPlaceholder?: boolean;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  description: string;
  sarcasticQuote: string;
  color: string;
  material: string;
  vibe: string;
  iconName: string;
}

export interface TravelDestination {
  id: string;
  name: string;
  stateOrCountry: string;
  type: 'current' | 'hometown' | 'wishlist';
  badge: string;
  description: string;
  coordinates: string;
  vibe: string;
  soundtrack: string;
}

export interface ArchiveItem {
  category: string;
  title: string;
  value: string;
  personalityTrait: string;
  notes?: string;
  isKnown: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  isDemo?: boolean;
}

export interface PersonalitySlider {
  id: string;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  lowLabel: string;
  highLabel: string;
  comment: string;
}
