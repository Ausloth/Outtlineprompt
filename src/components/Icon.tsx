import { 
  Music, Coffee, Flag, Bird, Flame, Cake, Laptop, Newspaper, 
  Mic, ShoppingBag, Briefcase, Scissors, BookOpen, Film, 
  Puzzle, Tent, Smile, Trophy, Activity, Droplet 
} from 'lucide-react';
import React from 'react';

const iconMap: Record<string, React.FC<any>> = {
  Music, Coffee, Flag, Bird, Flame, Cake, Laptop, Newspaper,
  Mic, ShoppingBag, Briefcase, Scissors, BookOpen, Film,
  Puzzle, Tent, Smile, Trophy, Activity, Droplet
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || Activity;
  return <IconComponent className={className} />;
}
