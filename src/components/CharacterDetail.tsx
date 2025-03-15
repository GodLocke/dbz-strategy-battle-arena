
import { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Character } from '@/data/characters';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Swords, Heart } from "lucide-react";

interface CharacterDetailProps {
  character: Character;
  onSelect?: (character: Character) => void;
  isSelected?: boolean;
}

const CharacterDetail = ({ character, onSelect, isSelected }: CharacterDetailProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = () => {
    if (onSelect && character.unlocked) {
      onSelect(character);
    }
  };
  
  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-dbz-blue',
    epic: 'bg-dbz-purple',
    legendary: 'bg-dbz-orange',
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div 
          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-lg
            ${character.unlocked ? 'opacity-100' : 'opacity-60 grayscale'}
            ${isSelected ? 'border-dbz-yellow shadow-[0_0_15px_rgba(255,215,0,0.5)]' : 'border-transparent'}`}
          onClick={() => character.unlocked && setIsOpen(true)}
        >
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="p-3 bg-white">
            <div className="flex justify-between">
              <h3 className="font-bold truncate">{character.name}</h3>
              <Badge className={`${rarityColors[character.rarity]} text-white`}>
                {character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}
              </Badge>
            </div>
            <div className="flex mt-2 text-sm gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> {character.stats.health}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" /> {character.stats.attack}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> {character.stats.defense}
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="game-title text-2xl">
            {character.name}
            <Badge className={`ml-2 ${rarityColors[character.rarity]} text-white`}>
              {character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {character.type} Type • {character.unlocked ? 'Available' : 'Locked'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-full max-w-[200px] aspect-square rounded-lg overflow-hidden border-2 border-dbz-blue/20">
              <img 
                src={character.image} 
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold mb-2">Character Stats</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <Heart className="w-4 h-4 mr-2 text-dbz-red" />
                  <span className="text-sm font-medium">Health</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-dbz-red h-full rounded-full" 
                    style={{ width: `${Math.min(100, character.stats.health)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <Zap className="w-4 h-4 mr-2 text-dbz-yellow" />
                  <span className="text-sm font-medium">Ki</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-dbz-yellow h-full rounded-full" 
                    style={{ width: `${Math.min(100, character.stats.ki)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <Swords className="w-4 h-4 mr-2 text-dbz-orange" />
                  <span className="text-sm font-medium">Attack</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-dbz-orange h-full rounded-full" 
                    style={{ width: `${Math.min(100, character.stats.attack)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <Shield className="w-4 h-4 mr-2 text-dbz-green" />
                  <span className="text-sm font-medium">Defense</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-dbz-green h-full rounded-full" 
                    style={{ width: `${Math.min(100, character.stats.defense)}%` }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{character.description}</p>
            
            <h3 className="font-bold mb-2">Abilities</h3>
            <div className="space-y-3">
              {character.abilities.map((ability) => (
                <div key={ability.id} className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{ability.name}</h4>
                    <Badge className={`
                      ${ability.type === 'physical' ? 'bg-dbz-red' : 
                        ability.type === 'energy' ? 'bg-dbz-blue' : 
                        ability.type === 'defense' ? 'bg-dbz-green' : 'bg-dbz-purple'} 
                      text-white`}
                    >
                      {ability.type.charAt(0).toUpperCase() + ability.type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{ability.description}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="text-dbz-yellow flex items-center">
                      <Zap className="h-3 w-3 mr-1" /> {ability.kiCost} Ki
                    </span>
                    <span className="text-gray-500 flex items-center">
                      Cooldown: {ability.cooldown} turns
                    </span>
                    {ability.damage && (
                      <span className="text-dbz-red flex items-center">
                        Damage: {ability.damage}
                      </span>
                    )}
                    {ability.healing && (
                      <span className="text-dbz-green flex items-center">
                        Healing: {ability.healing}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          
          {onSelect && (
            <Button 
              onClick={handleSelect}
              disabled={!character.unlocked}
              className={character.unlocked ? 'bg-dbz-orange hover:bg-dbz-orange/90' : ''}
            >
              {isSelected ? 'Remove from Team' : 'Add to Team'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetail;
