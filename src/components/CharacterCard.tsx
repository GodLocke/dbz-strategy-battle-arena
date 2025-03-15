
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: string;
  selected?: boolean;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
}

const CharacterCard = ({
  id,
  name,
  image,
  rarity,
  type,
  selected = false,
  locked = false,
  onClick,
  className,
}: CharacterCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const rarityStyles = {
    common: 'from-gray-300 to-gray-400',
    rare: 'from-dbz-blue to-dbz-lightblue',
    epic: 'from-dbz-purple to-indigo-500',
    legendary: 'from-dbz-orange to-dbz-yellow',
  };
  
  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden transition-all duration-300 transform character-hover',
        selected ? 'ring-4 ring-dbz-yellow shadow-lg scale-105' : 'ring-1 ring-gray-200 shadow',
        locked ? 'opacity-60 grayscale' : '',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={locked ? undefined : onClick}
    >
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-40',
        rarityStyles[rarity]
      )} />
      
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 transform"
          style={{ transform: isHovering ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        {locked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-dbz-darkblue truncate">{name}</h3>
          <span className={cn(
            'text-xs px-1.5 py-0.5 rounded font-medium text-white',
            type === 'Melee' ? 'bg-dbz-red' : 
            type === 'Energy' ? 'bg-dbz-blue' : 
            type === 'Defense' ? 'bg-dbz-green' : 
            'bg-dbz-purple'
          )}>
            {type}
          </span>
        </div>
        
        <div className="mt-1 flex items-center">
          {Array.from({ length: rarity === 'common' ? 1 : rarity === 'rare' ? 2 : rarity === 'epic' ? 3 : 4 }).map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={cn(
              "h-4 w-4", 
              rarity === 'common' ? 'text-gray-400' : 
              rarity === 'rare' ? 'text-dbz-blue' : 
              rarity === 'epic' ? 'text-dbz-purple' : 
              'text-dbz-yellow'
            )} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      
      {selected && (
        <div className="absolute top-0 right-0 m-2 bg-dbz-yellow text-white rounded-full p-1 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
