export type Category = 
  | "Music & Dance" 
  | "Social" 
  | "Sports" 
  | "Outings" 
  | "Cooking" 
  | "Arts & Crafts" 
  | "Technology" 
  | "Education" 
  | "Media" 
  | "Life Skills" 
  | "Wellbeing";

export interface ActivityTemplate {
  id: string;
  name: string;
  description: string;
  blurb: string;
  category: Category;
  iconName: string;
}

export const BLANK_ACTIVITY: ActivityTemplate = {
  id: "custom",
  name: "Custom Activity",
  description: "Create an entirely new activity from scratch.",
  blurb: "A customizable activity focused on supporting participants' individual goals through structured learning and engagement.",
  category: "Social",
  iconName: "Sparkles"
};

export const ACTIVITIES: ActivityTemplate[] = [
  { id: "1", name: "Morning Music & Expression", description: "Start the day with rhythm, singing, and expressive movement.", blurb: "A lively morning session focused on building social connections and self-expression through guided rhythm exercises, vocal warm-ups, and free-form dance.", category: "Music & Dance", iconName: "Music" },
  { id: "2", name: "Social Coffee Outings", description: "Visit local cafes to build social confidence and community connection.", blurb: "A community-based activity where participants practice ordering, handling money, and engaging in appropriate social conversations in a public cafe setting.", category: "Social", iconName: "Coffee" },
  { id: "3", name: "Golf Skills & Games", description: "Learn and practice golf techniques in a fun, supportive setting.", blurb: "An introductory golf program aiming to improve hand-eye coordination, focus, and patience, starting from putting practice to driving range sessions.", category: "Sports", iconName: "Flag" },
  { id: "4", name: "Animal Encounters & Care", description: "Interact with and learn how to care for various animals.", blurb: "A therapeutic outing program connecting participants with animals, teaching basic pet care, empathy, and providing sensory-friendly engagement.", category: "Outings", iconName: "Bird" },
  { id: "5", name: "BBQ & Outdoor Cooking", description: "Prepare and share outdoor meals while learning food safety.", blurb: "An interactive outdoor cooking group focused on safe food handling, basic grilling techniques, teamwork, and enjoying a shared meal.", category: "Cooking", iconName: "Flame" },
  { id: "6", name: "Baking & Creative Crafts", description: "Mix culinary skills with creative decoration and craft projects.", blurb: "A dual-focus session combining simple baking (measuring, stirring, decorating) with related craft activities to improve fine motor skills and creativity.", category: "Arts & Crafts", iconName: "Cake" },
  { id: "7", name: "Digital Skills Training", description: "Build confidence using computers, tablets, and safe internet browsing.", blurb: "A foundational technology class focusing on cyber safety, basic typing, web navigation, and using everyday digital communication tools.", category: "Technology", iconName: "Laptop" },
  { id: "8", name: "Newsletter Journalism", description: "Research, write, and design a regular community newsletter.", blurb: "A collaborative project where participants gather news, conduct simple interviews, and practice typing to produce a regular center newsletter.", category: "Education", iconName: "Newspaper" },
  { id: "9", name: "Podcast Creation", description: "Plan, record, and edit audio stories and interviews.", blurb: "An engaging media program designed to develop verbal confidence and storytelling skills through recording simple podcasts and audio journals.", category: "Media", iconName: "Mic" },
  { id: "10", name: "Market Shopping Practice", description: "Practical experience with budgeting, navigation, and purchasing at local markets.", blurb: "A life-skills outing where participants navigate local markets, compare prices, practice cash handling, and purchase items for cooking programs.", category: "Life Skills", iconName: "ShoppingBag" },
  { id: "11", name: "Job Skills & Readiness", description: "Develop resume writing, interview techniques, and workplace behaviors.", blurb: "A structured vocational readiness program covering workplace etiquette, simple task completion, role-playing interviews, and identifying personal strengths.", category: "Life Skills", iconName: "Briefcase" },
  { id: "12", name: "Handmade Goods Creation", description: "Design and create artisanal products like candles, soaps, or jewelry.", blurb: "A creative enterprise activity where participants design and physically assemble small handmade goods, building focus and dexterity for potential micro-enterprise.", category: "Arts & Crafts", iconName: "Scissors" },
  { id: "13", name: "Book Discussion Club", description: "Read and discuss literature to improve comprehension and social interaction.", blurb: "A relaxed educational group sharing short stories, audiobooks, or articles, focusing on active listening, reading comprehension, and respectful discussion.", category: "Education", iconName: "BookOpen" },
  { id: "14", name: "Film & Media Analysis", description: "Watch and thoughtfully critique movies, documentaries, and shows.", blurb: "An analytical social group where participants watch selected media and practice expressing their opinions, recognizing themes, and understanding emotions on screen.", category: "Media", iconName: "Film" },
  { id: "15", name: "Board Games & Puzzles", description: "Enhance cognitive skills and sportsmanship through tabletop gaming.", blurb: "A cognitive and social session emphasizing turn-taking, problem-solving, following complex rules, and practicing good sportsmanship through various games.", category: "Wellbeing", iconName: "Puzzle" },
  { id: "16", name: "Adventure & Outdoor Challenges", description: "Build resilience and teamwork through nature-based activities.", blurb: "An active outdoor program featuring bushwalking, simple orienteering, and nature scavenger hunts to promote physical endurance and team problem-solving.", category: "Sports", iconName: "Tent" },
  { id: "17", name: "Zumba, Yoga & Meditation", description: "Improve physical fitness and mental calmness with guided movement.", blurb: "A holistic wellbeing session offering a mix of upbeat dance fitness, gentle stretching, and mindfulness exercises to support physical and emotional regulation.", category: "Wellbeing", iconName: "Smile" },
  { id: "18", name: "Multi-Sport Activities", description: "Try a variety of team and individual sports to find new passions.", blurb: "An inclusive sports program rotating through basketball, soccer, tennis, and lawn bowls to develop overall coordination and team cooperation.", category: "Sports", iconName: "Trophy" },
  { id: "19", name: "Gentle Movement & Exercise", description: "Low-impact physical activities tailored for varying mobility levels.", blurb: "A highly adaptable exercise session focusing on seated aerobics, resistance band work, and mobility drills to maintain physical health safely.", category: "Wellbeing", iconName: "Activity" },
  { id: "20", name: "Clay & Pottery Making", description: "Express creativity and improve fine motor skills through ceramic arts.", blurb: "A tactile sensory activity exploring hand-building clay techniques, painting, and glazing to enhance fine motor skills and creative confidence.", category: "Arts & Crafts", iconName: "Droplet" },
];

export const CATEGORIES: Category[] = [
  "Music & Dance", "Social", "Sports", "Outings", "Cooking", 
  "Arts & Crafts", "Technology", "Education", "Media", 
  "Life Skills", "Wellbeing"
];
