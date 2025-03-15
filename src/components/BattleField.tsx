
import { useState, useEffect } from 'react';
import HealthBar from './HealthBar';
import EnergyBar from './EnergyBar';
import AbilityCard from './AbilityCard';
import Button from './Button';
import { cn } from '@/lib/utils';

interface Character {
  id: string;
  name: string;
  image: string;
  health: number;
  maxHealth: number;
  ki: number;
  maxKi: number;
  abilities: Ability[];
}

interface Ability {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'physical' | 'energy' | 'defense' | 'special';
  kiCost: number;
  cooldown: number;
  currentCooldown: number;
  damage?: number;
  healing?: number;
  effects?: string[];
}

interface BattleFieldProps {
  playerTeam: Character[];
  opponentTeam: Character[];
  playerTurn: boolean;
  onAbilityUse: (characterIndex: number, abilityIndex: number, targetIndex: number) => void;
  onEndTurn: () => void;
  className?: string;
}

const BattleField = ({
  playerTeam,
  opponentTeam,
  playerTurn,
  onAbilityUse,
  onEndTurn,
  className,
}: BattleFieldProps) => {
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null);
  const [selectedAbilityIndex, setSelectedAbilityIndex] = useState<number | null>(null);
  const [targetCharacterIndex, setTargetCharacterIndex] = useState<number | null>(null);
  const [showTurnIndicator, setShowTurnIndicator] = useState(true);
  
  // Reset selections when turn changes
  useEffect(() => {
    setSelectedCharacterIndex(null);
    setSelectedAbilityIndex(null);
    setTargetCharacterIndex(null);
    
    // Show turn indicator
    setShowTurnIndicator(true);
    const timer = setTimeout(() => {
      setShowTurnIndicator(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [playerTurn]);
  
  const handleCharacterSelect = (index: number) => {
    if (!playerTurn) return;
    setSelectedCharacterIndex(index);
    setSelectedAbilityIndex(null);
    setTargetCharacterIndex(null);
  };
  
  const handleAbilitySelect = (abilityIndex: number) => {
    if (!playerTurn || selectedCharacterIndex === null) return;
    const ability = playerTeam[selectedCharacterIndex].abilities[abilityIndex];
    
    // Check if ability can be used (cooldown, ki cost, etc.)
    if (ability.currentCooldown > 0 || ability.kiCost > playerTeam[selectedCharacterIndex].ki) {
      return;
    }
    
    setSelectedAbilityIndex(abilityIndex);
    setTargetCharacterIndex(null);
  };
  
  const handleTargetSelect = (targetIndex: number) => {
    if (!playerTurn || selectedCharacterIndex === null || selectedAbilityIndex === null) return;
    setTargetCharacterIndex(targetIndex);
    
    // Execute ability
    onAbilityUse(selectedCharacterIndex, selectedAbilityIndex, targetIndex);
    
    // Reset selections
    setSelectedCharacterIndex(null);
    setSelectedAbilityIndex(null);
    setTargetCharacterIndex(null);
  };
  
  return (
    <div className={cn("battle-field min-h-[600px] flex flex-col", className)}>
      {/* Turn indicator */}
      {showTurnIndicator && (
        <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-scale-in">
            <h2 className="text-3xl font-bold mb-1 text-center game-title">
              {playerTurn ? "Your Turn" : "Opponent's Turn"}
            </h2>
            <p className="text-gray-700 text-center">
              {playerTurn ? "Choose your move wisely!" : "Waiting for opponent..."}
            </p>
          </div>
        </div>
      )}
      
      {/* Battle area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Top area - Opponent team */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-lg shadow-text">Opponent</h3>
            {!playerTurn && (
              <div className="px-3 py-1 bg-dbz-red/90 text-white rounded-full text-sm font-medium animate-pulse">
                Opponent's turn
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {opponentTeam.map((character, index) => (
              <div 
                key={character.id} 
                className={cn(
                  "player-info transition-all",
                  targetCharacterIndex === index ? "ring-4 ring-dbz-red animate-opponent-flash" : "",
                  character.health <= 0 ? "opacity-50 grayscale" : "",
                  selectedAbilityIndex !== null ? "cursor-pointer transform hover:scale-105" : ""
                )}
                onClick={() => {
                  if (selectedAbilityIndex !== null && playerTurn && character.health > 0) {
                    handleTargetSelect(index);
                  }
                }}
              >
                <div className="relative w-16 h-16 mb-1">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover rounded-full border-2 border-white shadow"
                  />
                  {character.health <= 0 && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-bold mb-1 truncate">{character.name}</h4>
                <HealthBar current={character.health} max={character.maxHealth} className="w-full mb-1" />
                <EnergyBar current={character.ki} max={character.maxKi} className="w-full" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Middle area - Battlefield status/effects would go here */}
        <div className="flex-1 flex items-center justify-center my-4">
          {/* This space is intentionally left for battle animations and effects */}
        </div>
        
        {/* Bottom area - Player team */}
        <div className="mt-8">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-lg shadow-text">Your Team</h3>
            {playerTurn && (
              <div className="px-3 py-1 bg-dbz-blue/90 text-white rounded-full text-sm font-medium animate-pulse">
                Your turn
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {playerTeam.map((character, index) => (
              <div 
                key={character.id} 
                className={cn(
                  "player-info transition-all",
                  selectedCharacterIndex === index ? "ring-4 ring-dbz-blue" : "",
                  character.health <= 0 ? "opacity-50 grayscale" : "",
                  playerTurn && character.health > 0 ? "cursor-pointer transform hover:scale-105" : ""
                )}
                onClick={() => {
                  if (playerTurn && character.health > 0) {
                    handleCharacterSelect(index);
                  }
                }}
              >
                <div className="relative w-16 h-16 mb-1">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover rounded-full border-2 border-white shadow"
                  />
                  {character.health <= 0 && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-bold mb-1 truncate">{character.name}</h4>
                <HealthBar current={character.health} max={character.maxHealth} className="w-full mb-1" />
                <EnergyBar current={character.ki} max={character.maxKi} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Abilities panel */}
      {selectedCharacterIndex !== null && playerTurn && (
        <div className="bg-white/95 backdrop-blur-sm border-t border-dbz-blue/20 p-4 animate-slide-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">
              {playerTeam[selectedCharacterIndex].name}'s Abilities
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCharacterIndex(null)}
            >
              Cancel
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {playerTeam[selectedCharacterIndex].abilities.map((ability, abilityIndex) => (
              <AbilityCard
                key={ability.id}
                id={ability.id}
                name={ability.name}
                description={ability.description}
                image={ability.image}
                type={ability.type}
                kiCost={ability.kiCost}
                cooldown={ability.cooldown}
                currentCooldown={ability.currentCooldown}
                disabled={ability.currentCooldown > 0 || ability.kiCost > playerTeam[selectedCharacterIndex].ki}
                onClick={() => handleAbilitySelect(abilityIndex)}
                className={selectedAbilityIndex === abilityIndex ? "ring-4 ring-dbz-yellow" : ""}
              />
            ))}
          </div>
          
          {selectedAbilityIndex !== null && (
            <div className="mt-3 text-center text-sm text-dbz-blue animate-fade-in">
              Select an opponent to target
            </div>
          )}
        </div>
      )}
      
      {/* Turn controls */}
      {playerTurn && selectedCharacterIndex === null && (
        <div className="bg-white/95 backdrop-blur-sm border-t border-dbz-blue/20 p-4 flex justify-between items-center">
          <div>
            <h3 className="text-dbz-darkblue font-medium">Your Turn</h3>
            <p className="text-sm text-gray-600">Select a character to make a move</p>
          </div>
          <Button
            variant="energy"
            onClick={onEndTurn}
          >
            End Turn
          </Button>
        </div>
      )}
    </div>
  );
};

export default BattleField;
