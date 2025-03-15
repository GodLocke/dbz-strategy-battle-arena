
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Zap, Swords, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getBattleCharacter, aiTeams, characterData } from "@/data/characters";
import { useToast } from "@/hooks/use-toast";
import BattleField from "@/components/BattleField";

interface BattleCharacter {
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

const Battle = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [playerTeam, setPlayerTeam] = useState<BattleCharacter[]>([]);
  const [opponentTeam, setOpponentTeam] = useState<BattleCharacter[]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState(0); // 0: Beginner, 1: Intermediate, 2: Advanced, 3: Expert
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load player team from localStorage if available
    const savedTeam = localStorage.getItem('playerTeam');
    if (savedTeam) {
      try {
        const teamIds = JSON.parse(savedTeam) as string[];
        const loadedTeam = teamIds
          .map(id => getBattleCharacter(id))
          .filter(char => char !== null) as BattleCharacter[];
        
        if (loadedTeam.length === 3) {
          setPlayerTeam(loadedTeam);
        } else {
          // If team is incomplete, redirect to character selection
          toast({
            title: "Incomplete Team",
            description: "Please select 3 characters to form your team before starting a battle.",
            variant: "destructive"
          });
          navigate('/characters');
        }
      } catch (error) {
        console.error("Error loading team:", error);
        // Handle error, maybe redirect to character selection
        navigate('/characters');
      }
    }
  }, [navigate, toast]);

  const startBattle = () => {
    // If player doesn't have a team, redirect to character selection
    if (playerTeam.length < 3) {
      toast({
        title: "Incomplete Team",
        description: "Please select 3 characters to form your team before starting a battle.",
        variant: "destructive"
      });
      navigate('/characters');
      return;
    }

    // Set up AI opponent team based on difficulty
    const aiTeamIds = aiTeams[difficultyLevel];
    const aiTeamCharacters = aiTeamIds
      .map(id => getBattleCharacter(id))
      .filter(char => char !== null) as BattleCharacter[];
    
    setOpponentTeam(aiTeamCharacters);
    setPlayerTurn(true);
    setBattleLog(["Battle started! Your turn."]);
    setBattleStarted(true);

    toast({
      title: "Battle Started!",
      description: "Make your first move!",
      duration: 3000,
    });
  };

  const handleAbilityUse = (characterIndex: number, abilityIndex: number, targetIndex: number) => {
    if (!playerTurn) return;

    const updatedOpponentTeam = [...opponentTeam];
    const updatedPlayerTeam = [...playerTeam];
    const character = playerTeam[characterIndex];
    const ability = character.abilities[abilityIndex];
    const target = updatedOpponentTeam[targetIndex];

    // Check if target is already defeated
    if (target.health <= 0) {
      toast({
        title: "Invalid Target",
        description: "This character has already been defeated.",
        variant: "destructive"
      });
      return;
    }

    // Apply ability effects
    let logMessage = `${character.name} used ${ability.name} on ${target.name}!`;
    
    // Apply damage if ability has damage property
    if (ability.damage) {
      target.health = Math.max(0, target.health - ability.damage);
      logMessage += ` Dealt ${ability.damage} damage.`;
      
      // Check if target was defeated
      if (target.health <= 0) {
        logMessage += ` ${target.name} was defeated!`;
      }
    }
    
    // Apply healing if ability has healing property
    if (ability.healing) {
      character.health = Math.min(character.maxHealth, character.health + ability.healing);
      logMessage += ` Restored ${ability.healing} health.`;
    }
    
    // Apply any special effects
    if (ability.effects) {
      logMessage += " Special effects applied.";
      // Process effects here (would need a more complex system for full implementation)
    }
    
    // Consume Ki
    character.ki -= ability.kiCost;
    
    // Set cooldown
    ability.currentCooldown = ability.cooldown;
    
    // Update state
    setOpponentTeam(updatedOpponentTeam);
    setPlayerTeam(updatedPlayerTeam);
    setBattleLog(prev => [...prev, logMessage]);
    
    // Check if all opponents are defeated
    const allOpponentsDefeated = updatedOpponentTeam.every(opponent => opponent.health <= 0);
    if (allOpponentsDefeated) {
      endBattle("player");
      return;
    }
    
    // End player turn
    setPlayerTurn(false);
    
    // Simulate AI turn after a delay
    setTimeout(executeAITurn, 1500);
  };

  const executeAITurn = () => {
    // Simple AI logic
    const updatedPlayerTeam = [...playerTeam];
    const updatedOpponentTeam = [...opponentTeam];
    
    // Find first active opponent
    const activeOpponents = updatedOpponentTeam.filter(opponent => opponent.health > 0);
    if (activeOpponents.length === 0) {
      // No active opponents, player wins
      endBattle("player");
      return;
    }
    
    const activeOpponent = activeOpponents[0];
    const opponentIndex = updatedOpponentTeam.findIndex(opp => opp.id === activeOpponent.id);
    
    // Find first active player character
    const activePlayerCharacters = updatedPlayerTeam.filter(char => char.health > 0);
    if (activePlayerCharacters.length === 0) {
      // No active player characters, AI wins
      endBattle("ai");
      return;
    }
    
    const targetCharacter = activePlayerCharacters[0];
    const targetIndex = updatedPlayerTeam.findIndex(char => char.id === targetCharacter.id);
    
    // Find an ability that can be used
    const usableAbilities = activeOpponent.abilities.filter(
      ability => ability.currentCooldown === 0 && ability.kiCost <= activeOpponent.ki
    );
    
    if (usableAbilities.length === 0) {
      // No usable abilities, skip turn
      setBattleLog(prev => [...prev, `${activeOpponent.name} has no usable abilities and skips their turn.`]);
      finishAITurn(updatedPlayerTeam, updatedOpponentTeam);
      return;
    }
    
    // Select a random ability
    const selectedAbility = usableAbilities[Math.floor(Math.random() * usableAbilities.length)];
    const abilityIndex = activeOpponent.abilities.findIndex(ability => ability.id === selectedAbility.id);
    
    // Apply ability effects
    let logMessage = `${activeOpponent.name} used ${selectedAbility.name} on ${targetCharacter.name}!`;
    
    // Apply damage if ability has damage property
    if (selectedAbility.damage) {
      targetCharacter.health = Math.max(0, targetCharacter.health - selectedAbility.damage);
      logMessage += ` Dealt ${selectedAbility.damage} damage.`;
      
      // Check if target was defeated
      if (targetCharacter.health <= 0) {
        logMessage += ` ${targetCharacter.name} was defeated!`;
      }
    }
    
    // Apply healing if ability has healing property
    if (selectedAbility.healing) {
      activeOpponent.health = Math.min(activeOpponent.maxHealth, activeOpponent.health + selectedAbility.healing);
      logMessage += ` Restored ${selectedAbility.healing} health.`;
    }
    
    // Apply any special effects
    if (selectedAbility.effects) {
      logMessage += " Special effects applied.";
      // Process effects here (would need a more complex system for full implementation)
    }
    
    // Consume Ki
    activeOpponent.ki -= selectedAbility.kiCost;
    
    // Set cooldown
    activeOpponent.abilities[abilityIndex].currentCooldown = selectedAbility.cooldown;
    
    // Update log
    setBattleLog(prev => [...prev, logMessage]);
    
    // Check if all player characters are defeated
    const allPlayerCharactersDefeated = updatedPlayerTeam.every(char => char.health <= 0);
    if (allPlayerCharactersDefeated) {
      endBattle("ai");
      return;
    }
    
    // Finish AI turn
    finishAITurn(updatedPlayerTeam, updatedOpponentTeam);
  };

  const finishAITurn = (updatedPlayerTeam: BattleCharacter[], updatedOpponentTeam: BattleCharacter[]) => {
    // Reduce cooldowns for player abilities
    updatedPlayerTeam.forEach(character => {
      character.abilities.forEach(ability => {
        if (ability.currentCooldown > 0) {
          ability.currentCooldown--;
        }
      });
      
      // Restore some Ki
      character.ki = Math.min(character.maxKi, character.ki + 10);
    });
    
    // Reduce cooldowns for opponent abilities
    updatedOpponentTeam.forEach(opponent => {
      opponent.abilities.forEach(ability => {
        if (ability.currentCooldown > 0) {
          ability.currentCooldown--;
        }
      });
      
      // Restore some Ki
      opponent.ki = Math.min(opponent.maxKi, opponent.ki + 10);
    });
    
    // Update state
    setPlayerTeam(updatedPlayerTeam);
    setOpponentTeam(updatedOpponentTeam);
    
    // Start player turn
    setPlayerTurn(true);
    setBattleLog(prev => [...prev, "Your turn!"]);
  };

  const endBattle = (winner: "player" | "ai") => {
    if (winner === "player") {
      toast({
        title: "Victory!",
        description: "You have defeated all opponents!",
        duration: 5000,
      });
      setBattleLog(prev => [...prev, "You won the battle!"]);
    } else {
      toast({
        title: "Defeat",
        description: "Your team has been defeated.",
        duration: 5000,
      });
      setBattleLog(prev => [...prev, "You lost the battle."]);
    }
    
    // Reset battle state after a delay
    setTimeout(() => {
      setBattleStarted(false);
      // Reset teams to starting state
      const savedTeam = localStorage.getItem('playerTeam');
      if (savedTeam) {
        try {
          const teamIds = JSON.parse(savedTeam) as string[];
          const loadedTeam = teamIds
            .map(id => getBattleCharacter(id))
            .filter(char => char !== null) as BattleCharacter[];
          
          setPlayerTeam(loadedTeam);
        } catch (error) {
          console.error("Error reloading team:", error);
        }
      }
      setOpponentTeam([]);
    }, 3000);
  };

  const handleEndTurn = () => {
    if (!playerTurn) return;
    
    // Reduce cooldowns and restore some Ki
    const updatedPlayerTeam = [...playerTeam];
    updatedPlayerTeam.forEach(character => {
      character.abilities.forEach(ability => {
        if (ability.currentCooldown > 0) {
          ability.currentCooldown--;
        }
      });
      
      // Restore some Ki
      character.ki = Math.min(character.maxKi, character.ki + 15);
    });
    
    setPlayerTeam(updatedPlayerTeam);
    setPlayerTurn(false);
    setBattleLog(prev => [...prev, "You ended your turn."]);
    
    // Simulate AI turn after a delay
    setTimeout(executeAITurn, 1500);
  };

  const changeDifficulty = (level: number) => {
    if (battleStarted) return;
    setDifficultyLevel(level);
  };

  if (playerTeam.length < 3 && !battleStarted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="game-title text-3xl md:text-4xl">Battle Arena</h1>
          </div>
          
          <Card className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Form Your Team First</h2>
            <p className="text-gray-700 mb-6">
              You need to select 3 characters for your team before entering battle.
            </p>
            <Link to="/characters">
              <Button className="bg-dbz-blue hover:bg-dbz-blue/90">
                Select Characters
              </Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="game-title text-3xl md:text-4xl">Battle Arena</h1>
        </div>

        {!battleStarted ? (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/90 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Fight?</h2>
              <p className="text-gray-700 mb-6">
                Your team of Dragon Ball Z fighters is ready to enter the arena. 
                Use strategy and timing to defeat your opponents in turn-based combat!
              </p>
              
              <div className="mb-6">
                <h3 className="font-bold mb-3">Your Team</h3>
                <div className="grid grid-cols-3 gap-4">
                  {playerTeam.map((character) => (
                    <div key={character.id} className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
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
                      <h4 className="font-bold text-sm">{character.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-3">Select Difficulty</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map((level, index) => (
                    <button
                      key={level}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        difficultyLevel === index 
                          ? "border-dbz-orange bg-dbz-orange/10 font-bold" 
                          : "border-gray-200 hover:border-dbz-blue/50 hover:bg-dbz-blue/5"
                      }`}
                      onClick={() => changeDifficulty(index)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-dbz-blue/10 p-4 rounded-lg flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-dbz-blue" />
                  <div>
                    <h3 className="font-bold">Defensive Strategy</h3>
                    <p className="text-sm">Focus on defense and counter-attacks</p>
                  </div>
                </div>
                <div className="bg-dbz-orange/10 p-4 rounded-lg flex items-center">
                  <Zap className="mr-3 h-6 w-6 text-dbz-orange" />
                  <div>
                    <h3 className="font-bold">Offensive Approach</h3>
                    <p className="text-sm">Unleash powerful attacks to overwhelm enemies</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-dbz-orange hover:bg-dbz-orange/90 text-white button-glow flex-1"
                  onClick={startBattle}
                >
                  Start Battle
                </Button>
                
                <Link to="/characters" className="flex-1">
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="w-full"
                  >
                    Change Team
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-3">
              <BattleField 
                playerTeam={playerTeam}
                opponentTeam={opponentTeam}
                playerTurn={playerTurn}
                onAbilityUse={handleAbilityUse}
                onEndTurn={handleEndTurn}
                className="min-h-[600px]"
              />
            </div>
            
            <div className="md:col-span-1">
              <Card className="p-4 h-full overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Battle Log</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setBattleLog([])}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-grow overflow-y-auto max-h-[600px] space-y-2 pr-2">
                  {battleLog.map((log, index) => (
                    <div 
                      key={index} 
                      className={`text-sm p-2 rounded ${
                        log.includes("Your turn") ? 
                          "bg-dbz-blue/10 border-l-4 border-dbz-blue" : 
                        log.includes("won") ?
                          "bg-dbz-green/10 border-l-4 border-dbz-green" :
                        log.includes("lost") ?
                          "bg-dbz-red/10 border-l-4 border-dbz-red" :
                          "bg-gray-50"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {battleLog.length === 0 && (
                    <div className="text-gray-500 text-center p-4">
                      Battle events will appear here.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Battle;
