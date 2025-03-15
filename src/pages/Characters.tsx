
import { useState } from "react";
import Layout from "../components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Filter, Search, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { characterData, Character, getUnlockedCharacters } from "../data/characters";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CharacterDetail from "@/components/CharacterDetail";
import { useToast } from "@/hooks/use-toast";

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterRarity, setFilterRarity] = useState<string | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectCharacter = (character: Character) => {
    // If already selected, remove from selection
    if (selectedCharacters.some(c => c.id === character.id)) {
      setSelectedCharacters(prev => prev.filter(c => c.id !== character.id));
      return;
    }

    // If already have 3 characters selected, show an error
    if (selectedCharacters.length >= 3) {
      toast({
        title: "Team is Full",
        description: "You can only select up to 3 characters for your team. Remove one first.",
        variant: "destructive"
      });
      return;
    }

    // Add to selection
    setSelectedCharacters(prev => [...prev, character]);
  };

  const filteredCharacters = characterData.filter(character => {
    // Apply search filter
    if (searchQuery && !character.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply type filter
    if (filterType && character.type !== filterType) {
      return false;
    }
    
    // Apply rarity filter
    if (filterRarity && character.rarity !== filterRarity) {
      return false;
    }
    
    return true;
  });

  const startBattleWithTeam = () => {
    if (selectedCharacters.length < 3) {
      toast({
        title: "Incomplete Team",
        description: "Please select 3 characters to form your team before starting a battle.",
        variant: "destructive"
      });
      return;
    }

    // Here we would typically store the team in state/context/storage
    // For now, we'll use localStorage
    localStorage.setItem('playerTeam', JSON.stringify(selectedCharacters.map(c => c.id)));
    
    // Navigate to battle page
    navigate('/battle');
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterType(null);
    setFilterRarity(null);
  };

  const typeOptions = ["Melee", "Energy", "Defense", "Support"];
  const rarityOptions = ["common", "rare", "epic", "legendary"];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="game-title text-3xl md:text-4xl">Character Roster</h1>
          </div>
          
          {selectedCharacters.length > 0 && (
            <Button 
              onClick={startBattleWithTeam} 
              className="bg-dbz-orange hover:bg-dbz-orange/90 animate-pulse-glow"
            >
              Start Battle with Team ({selectedCharacters.length}/3)
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Search and filter controls */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Button 
                  variant={filterType ? "default" : "outline"} 
                  className="flex items-center gap-2"
                  onClick={() => setFilterType(null)}
                >
                  <Filter className="h-4 w-4" /> 
                  {filterType || "Type"}
                  {filterType && <X className="h-3 w-3 ml-1" />}
                </Button>
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 overflow-hidden hidden group-focus-within:block">
                  {typeOptions.map(type => (
                    <button
                      key={type}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setFilterType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Button 
                  variant={filterRarity ? "default" : "outline"} 
                  className="flex items-center gap-2"
                  onClick={() => setFilterRarity(null)}
                >
                  <Filter className="h-4 w-4" /> 
                  {filterRarity || "Rarity"}
                  {filterRarity && <X className="h-3 w-3 ml-1" />}
                </Button>
                <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 overflow-hidden hidden group-focus-within:block">
                  {rarityOptions.map(rarity => (
                    <button
                      key={rarity}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setFilterRarity(rarity)}
                    >
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {(searchQuery || filterType || filterRarity) && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Selected team display */}
          {selectedCharacters.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-bold mb-2">Your Team ({selectedCharacters.length}/3)</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCharacters.map(character => (
                  <Badge 
                    key={character.id} 
                    className="px-3 py-1.5 bg-dbz-blue text-white flex items-center gap-2"
                  >
                    {character.name}
                    <button onClick={() => handleSelectCharacter(character)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Character grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredCharacters.map((character) => (
            <CharacterDetail 
              key={character.id} 
              character={character} 
              onSelect={handleSelectCharacter}
              isSelected={selectedCharacters.some(c => c.id === character.id)}
            />
          ))}
        </div>
        
        {filteredCharacters.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No characters found matching your filters.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-2">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Characters;
