export const COLORS = {
  bg: '#0B0E1A',
  panel: '#171D33',
  panelHover: '#1D2540',
  border: '#2A3150',
  gold: '#E8A33D',
  teal: '#3EC9A7',
  text: '#F1EEE6',
  muted: '#8B93AC',
  mutedDim: '#5C6483',
};

export const GENRE_COLOR = {
  SciFi: '#4C7BD9',
  Drama: '#B5794A',
  Thriller: '#C23B4F',
  Comedy: '#E8A33D',
  Horror: '#5C2A4D',
  Romance: '#D9748C',
  Documentary: '#6B8C7F',
  Fantasy: '#8B7FD1',
  Crime: '#3A3F58',
  Animation: '#3EC9A7',
  Action: '#D9622B',
  Mystery: '#4A5578',
};

export const TITLES = [
  { id: 1, title: 'Glass Horizon', genres: ['SciFi', 'Drama'], moods: ['Cerebral', 'Dark'], year: 2024, pop: 0.40, logline: 'A station engineer hides a signal she isn\'t supposed to hear.' },
  { id: 2, title: 'Nightshade County', genres: ['Crime', 'Thriller'], moods: ['Gritty', 'Tense'], year: 2023, pop: 0.70, logline: 'A sheriff\'s last case unravels a decade-old cover-up.' },
  { id: 3, title: 'The Quiet Ledger', genres: ['Drama', 'Mystery'], moods: ['Cerebral', 'Dark'], year: 2022, pop: 0.30, logline: 'An accountant finds her own name in a client\'s missing-persons file.' },
  { id: 4, title: 'Paper Moons', genres: ['Romance', 'Comedy'], moods: ['FeelGood', 'Heartwarming'], year: 2023, pop: 0.60, logline: 'Two rival florists share one delivery van and no other choice.' },
  { id: 5, title: 'Last Light Diner', genres: ['Horror', 'Thriller'], moods: ['Tense', 'Gritty'], year: 2024, pop: 0.50, logline: 'A graveyard-shift crew realizes the diner never actually closes.' },
  { id: 6, title: 'Small Gods', genres: ['Fantasy', 'Drama'], moods: ['Whimsical', 'Cerebral'], year: 2021, pop: 0.35, logline: 'A minor deity tries to retire before anyone notices she\'s gone.' },
  { id: 7, title: 'Signal Loss', genres: ['SciFi', 'Thriller'], moods: ['Tense', 'Dark'], year: 2023, pop: 0.55, logline: 'The last transmission from Earth wasn\'t sent by a human.' },
  { id: 8, title: 'The Marigold Hour', genres: ['Documentary'], moods: ['Nostalgic', 'Heartwarming'], year: 2022, pop: 0.25, logline: 'Three flower-shop owners on the same block, forty years apart.' },
  { id: 9, title: 'Wolves of Fifth Street', genres: ['Crime', 'Action'], moods: ['Gritty', 'Tense'], year: 2024, pop: 0.80, logline: 'A crew of debt collectors takes one job too many.' },
  { id: 10, title: 'Comet Season', genres: ['Animation', 'Fantasy'], moods: ['Whimsical', 'Uplifting'], year: 2023, pop: 0.65, logline: 'A town only visible once every eleven years prepares to reappear.' },
  { id: 11, title: 'Bright Machines', genres: ['SciFi', 'Action'], moods: ['Uplifting', 'Cerebral'], year: 2023, pop: 0.70, logline: 'Retired combat androids start a landscaping business.' },
  { id: 12, title: 'The Hollow Choir', genres: ['Horror', 'Mystery'], moods: ['Dark', 'Tense'], year: 2024, pop: 0.45, logline: 'A church choir keeps rehearsing a hymn no one wrote.' },
  { id: 13, title: 'Kettle & Bone', genres: ['Comedy', 'Drama'], moods: ['FeelGood', 'Cozy'], year: 2022, pop: 0.40, logline: 'Estranged siblings inherit a failing soup restaurant.' },
  { id: 14, title: 'The Long Recess', genres: ['Documentary', 'Mystery'], moods: ['Cerebral', 'Dark'], year: 2020, pop: 0.20, logline: 'What actually happened to a school that closed overnight in 1987.' },
  { id: 15, title: 'Ferry to Nowhere', genres: ['Thriller', 'Drama'], moods: ['Tense', 'Dark'], year: 2023, pop: 0.50, logline: 'A night ferry keeps arriving at a dock that isn\'t on any map.' },
  { id: 16, title: 'Honeywell Farms', genres: ['Comedy', 'Romance'], moods: ['Cozy', 'FeelGood'], year: 2024, pop: 0.55, logline: 'A city chef inherits a farm and a very opinionated goat.' },
  { id: 17, title: 'Iron Choir', genres: ['Fantasy', 'Action'], moods: ['Uplifting', 'Gritty'], year: 2022, pop: 0.75, logline: 'Exiled knights reunite for one impossible siege.' },
  { id: 18, title: 'Low Orbit', genres: ['SciFi', 'Mystery'], moods: ['Cerebral', 'Tense'], year: 2021, pop: 0.30, logline: 'A space station crew keeps finding the same body in different rooms.' },
];

export const SEED_USERS = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex@demo.io', password: '0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d', avatarColor: '#4C7BD9' },
  { id: 'u2', name: 'Jamie Chen', email: 'jamie@demo.io', password: '0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d', avatarColor: '#D9748C' },
];

export const SEED_RATINGS = {
  u1: { 7: 5, 1: 5, 18: 4, 2: 2 },
  u2: { 4: 5, 16: 5, 13: 4, 9: 2 },
};

export const now = Date.now();
export const SEED_WATCHED = {
  u1: [
    { id: 7, watchedAt: now - 1000 * 60 * 45 },
    { id: 1, watchedAt: now - 1000 * 60 * 60 * 22 },
    { id: 18, watchedAt: now - 1000 * 60 * 60 * 24 * 3 },
  ],
  u2: [
    { id: 4, watchedAt: now - 1000 * 60 * 20 },
    { id: 16, watchedAt: now - 1000 * 60 * 60 * 6 },
    { id: 13, watchedAt: now - 1000 * 60 * 60 * 24 * 2 },
  ],
};
