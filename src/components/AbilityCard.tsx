
import { cn } from '@/lib/utils';

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
  
  return (
    <div
      className={cn(
        'ability-card group',
        disabled ? 'opacity-60 cursor-not-allowed' : 'ability-shine',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex gap-2">
        <div className="w-12 h-12 rounded overflow-hidden shrink-0 border border-gray-200">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm leading-tight truncate">{name}</h4>
          <p className="text-xs text-gray-700 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 text-xs font-medium">
        <span className={`px-1.5 py-0.5 rounded ${typeColors[type]}`}>
          <span className={typeTextColors[type]}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dbz-yellow" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>{kiCost}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dbz-blue" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{cooldown}</span>
          </div>
        </div>
      </div>
      
      {currentCooldown > 0 && (
        <div className="move-cooldown">
          <span>{currentCooldown}</span>
        </div>
      )}
    </div>
  );
};

export default AbilityCard;
