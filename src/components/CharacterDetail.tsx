
import { useState } from 'react';
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Character } from '@/data/characters';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Swords, Heart, Star, Clock, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CharacterComment from "./CharacterComment";
import HealthBar from './HealthBar';
import EnergyBar from './EnergyBar';

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
  
  const starCount = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4
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
            
            {!character.unlocked && (
              <div className="mt-2 text-xs text-dbz-red font-medium">
                <span className="flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Locked - Complete missions to unlock
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto p-0">
        <Tabs defaultValue="overview" className="w-full">
          <div className="bg-gradient-to-r from-dbz-darkblue to-dbz-blue p-6">
            <DialogHeader className="text-white mb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="game-title text-2xl text-white flex items-center">
                  {character.name}
                  <div className="ml-3 flex">
                    {Array.from({ length: starCount[character.rarity] }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${
                        character.rarity === 'common' ? 'text-gray-300' : 
                        character.rarity === 'rare' ? 'text-dbz-blue' : 
                        character.rarity === 'epic' ? 'text-dbz-purple' : 
                        'text-dbz-yellow'
                      } fill-current`} />
                    ))}
                  </div>
                </DialogTitle>
                <Badge className={`${rarityColors[character.rarity]} text-white`}>
                  {character.rarity.charAt(0).toUpperCase() + character.rarity.slice(1)}
                </Badge>
              </div>
              <DialogDescription className="text-white/90">
                {character.type} Type • {character.unlocked ? 'Available' : 'Locked'}
              </DialogDescription>
            </DialogHeader>
            
            <TabsList className="bg-white/20 text-white">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-dbz-darkblue">Overview</TabsTrigger>
              <TabsTrigger value="abilities" className="data-[state=active]:bg-white data-[state=active]:text-dbz-darkblue">Abilities</TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-white data-[state=active]:text-dbz-darkblue">Stats</TabsTrigger>
              <TabsTrigger value="comments" className="data-[state=active]:bg-white data-[state=active]:text-dbz-darkblue">Community</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <h3 className="font-bold mb-2">Character Profile</h3>
                <p className="text-gray-700 mb-4">{character.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center mb-1">
                      <Heart className="w-4 h-4 mr-2 text-dbz-red" />
                      <span className="text-sm font-medium">Health</span>
                    </div>
                    <HealthBar current={character.stats.health} max={110} size="md" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Zap className="w-4 h-4 mr-2 text-dbz-yellow" />
                      <span className="text-sm font-medium">Ki</span>
                    </div>
                    <EnergyBar current={character.stats.ki} max={100} size="md" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Swords className="w-4 h-4 mr-2 text-dbz-orange" />
                      <span className="text-sm font-medium">Attack</span>
                    </div>
                    <HealthBar current={character.stats.attack} max={100} size="md" className="bg-gray-200 h-2 rounded-full" />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Shield className="w-4 h-4 mr-2 text-dbz-green" />
                      <span className="text-sm font-medium">Defense</span>
                    </div>
                    <HealthBar current={character.stats.defense} max={100} size="md" className="bg-gray-200 h-2 rounded-full" />
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Unlock Requirements</h4>
                  {character.unlocked ? (
                    <p className="text-green-600 text-sm flex items-center">
                      <span className="mr-1">✓</span> Available for selection
                    </p>
                  ) : (
                    <div className="text-sm">
                      <p className="text-dbz-red mb-1">Currently locked</p>
                      <p>Complete the following missions to unlock:</p>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Win 5 battles with a Z Fighter team</li>
                        <li>Defeat {character.name} in story mode</li>
                        <li>Reach Rank 10</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {onSelect && (
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleSelect}
                  disabled={!character.unlocked}
                  className={character.unlocked ? 'bg-dbz-orange hover:bg-dbz-orange/90 w-full max-w-xs' : 'w-full max-w-xs'}
                >
                  {isSelected ? 'Remove from Team' : 'Add to Team'}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="abilities" className="p-6 focus-visible:outline-none">
            <h3 className="font-bold mb-4">Character Abilities</h3>
            <div className="space-y-4">
              {character.abilities.map((ability) => (
                <div key={ability.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                      <img 
                        src={ability.image} 
                        alt={ability.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
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
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-dbz-yellow" />
                      <span><strong>Ki Cost:</strong> {ability.kiCost}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-dbz-blue" />
                      <span><strong>Cooldown:</strong> {ability.cooldown} turns</span>
                    </div>
                    {ability.damage && (
                      <div className="flex items-center">
                        <Swords className="h-4 w-4 mr-1 text-dbz-red" />
                        <span><strong>Damage:</strong> {ability.damage}</span>
                      </div>
                    )}
                    {ability.healing && (
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-dbz-green" />
                        <span><strong>Healing:</strong> {ability.healing}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="p-6 focus-visible:outline-none">
            <h3 className="font-bold mb-4">Detailed Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Base Stats</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Health</span>
                      <span className="text-sm font-medium">{character.stats.health}/110</span>
                    </div>
                    <HealthBar current={character.stats.health} max={110} size="md" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Ki</span>
                      <span className="text-sm font-medium">{character.stats.ki}/100</span>
                    </div>
                    <EnergyBar current={character.stats.ki} max={100} size="md" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Attack</span>
                      <span className="text-sm font-medium">{character.stats.attack}/100</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-dbz-orange h-full rounded-full" 
                        style={{ width: `${Math.min(100, character.stats.attack)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Defense</span>
                      <span className="text-sm font-medium">{character.stats.defense}/100</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-dbz-green h-full rounded-full" 
                        style={{ width: `${Math.min(100, character.stats.defense)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Speed</span>
                      <span className="text-sm font-medium">{character.stats.speed}/100</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-dbz-blue h-full rounded-full" 
                        style={{ width: `${Math.min(100, character.stats.speed)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Battle Performance</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-dbz-blue">76%</div>
                      <div className="text-sm text-gray-500">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-dbz-green">82%</div>
                      <div className="text-sm text-gray-500">Pick Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-dbz-red">34%</div>
                      <div className="text-sm text-gray-500">First Kill Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-dbz-orange">A</div>
                      <div className="text-sm text-gray-500">Tier Ranking</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium mb-2">Best Team Compositions</h5>
                    <div className="space-y-2">
                      <div className="flex items-center bg-gray-100 p-2 rounded">
                        <div className="flex space-x-1 mr-2">
                          <div className="w-6 h-6 rounded-full bg-dbz-blue flex items-center justify-center text-white text-xs">G</div>
                          <div className="w-6 h-6 rounded-full bg-dbz-red flex items-center justify-center text-white text-xs">V</div>
                          <div className="w-6 h-6 rounded-full bg-dbz-green flex items-center justify-center text-white text-xs">P</div>
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">Z Fighters Core</div>
                          <div className="text-gray-500">84% Win Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-gray-100 p-2 rounded">
                        <div className="flex space-x-1 mr-2">
                          <div className="w-6 h-6 rounded-full bg-dbz-orange flex items-center justify-center text-white text-xs">G</div>
                          <div className="w-6 h-6 rounded-full bg-dbz-purple flex items-center justify-center text-white text-xs">T</div>
                          <div className="w-6 h-6 rounded-full bg-dbz-blue flex items-center justify-center text-white text-xs">K</div>
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">Family Bonds</div>
                          <div className="text-gray-500">71% Win Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-800">Pro Tips</h4>
                  <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                    <li>This character excels at single-target burst damage</li>
                    <li>Save ultimate abilities for when opponent has low Ki</li>
                    <li>Pairs well with support characters that can restore Ki</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="p-6 focus-visible:outline-none">
            <CharacterComment characterId={character.id} comments={[]} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetail;
