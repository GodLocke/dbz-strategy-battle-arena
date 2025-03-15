
import { cn } from '@/lib/utils';
import { Clock, Zap } from 'lucide-react';

interface AbilityCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'physical' | 'energy' | 'defense' | 'special';
  kiCost: number;
  cooldown: number;
  currentCooldown?: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AbilityCard = ({
  id,
  name,
  description,
  image,
  type,
  kiCost,
  cooldown,
  currentCooldown = 0,
  onClick,
  disabled = false,
  className,
}: AbilityCardProps) => {
  const typeColors = {
    physical: 'border-dbz-red bg-dbz-red/10',
    energy: 'border-dbz-blue bg-dbz-blue/10',
    defense: 'border-dbz-green bg-dbz-green/10',
    special: 'border-dbz-purple bg-dbz-purple/10',
  };
  
  const typeTextColors = {
    physical: 'text-dbz-red',
    energy: 'text-dbz-blue',
    defense: 'text-dbz-green',
    special: 'text-dbz-purple',
  };
  
  const typeBgColors = {
    physical: 'bg-dbz-red',
    energy: 'bg-dbz-blue',
    defense: 'bg-dbz-green',
    special: 'bg-dbz-purple',
  };
  
  return (
    <div
      className={cn(
        'ability-card group p-3 border rounded-lg transition-all duration-300',
        disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : 'hover:shadow-md cursor-pointer',
        currentCooldown > 0 ? 'grayscale' : '',
        typeColors[type],
        className
      )}
      onClick={disabled || currentCooldown > 0 ? undefined : onClick}
    >
      <div className="flex gap-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-sm leading-tight truncate">{name}</h4>
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded font-medium text-white',
              typeBgColors[type]
            )}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
          <p className="text-xs text-gray-700 mt-1 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200/50 text-xs font-medium">
        <div className="flex items-center">
          <Zap className="h-3.5 w-3.5 mr-1 text-dbz-yellow" />
          <span>Cost: {kiCost}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1 text-dbz-blue" />
          <span>CD: {cooldown}</span>
        </div>
      </div>
      
      {currentCooldown > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold animate-pulse">
          {currentCooldown}
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
