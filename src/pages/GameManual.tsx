
import React from 'react';
import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Book, Zap, Shield, Swords, Heart, User, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GameManual = () => {
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
          <h1 className="game-title text-3xl md:text-4xl flex items-center">
            <Book className="mr-3 h-6 w-6" />
            Game Manual
          </h1>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-6">
              This manual provides an overview of the user interface, gameplay, and standard terminology in 
              Dragon Ball Z Strategy Arena, a turn-based strategy game where your team of three fighters competes 
              against an opponent's team to reduce their health to zero and win the match.
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          {/* Character Selection Section */}
          <section id="character-selection" className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-dbz-darkblue border-b pb-2">1. Character Selection Screen</h2>
            <p className="mb-4">When starting a match, you will see the Character Selection screen.</p>
            
            <h3 className="text-xl font-semibold mb-2 text-dbz-blue">Interface Breakdown:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>A:</strong> Displays player information – avatar, username, rank, win-loss record, and streaks.</li>
              <li><strong>B:</strong> Three team slots for selecting your fighters. You must pick three characters to begin a match.</li>
              <li><strong>C:</strong> Displays available characters (scrollable). Locked characters require mission completion.</li>
              <li><strong>D:</strong> Shows detailed stats and skills for the selected character.</li>
              <li><strong>E:</strong> Displays skill information when clicking a character's ability. Includes:
                <ul className="list-circle pl-6 mt-1">
                  <li>Name</li>
                  <li>Energy cost</li>
                  <li>Description</li>
                  <li>Skill class</li>
                  <li>Cooldown</li>
                </ul>
              </li>
              <li><strong>F:</strong> Battle modes:
                <ul className="list-circle pl-6 mt-1">
                  <li>Ladder Match: Competitive, ranks up players.</li>
                  <li>Quick Match: Casual, affects missions but not ranks.</li>
                  <li>Private Match: Play with a specific opponent.</li>
                </ul>
              </li>
            </ul>
          </section>
          
          {/* In-Game Battle UI Section */}
          <section id="battle-ui" className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-dbz-darkblue border-b pb-2">2. In-Game Battle UI</h2>
            <p className="mb-4">Once in a battle, the interface consists of several sections:</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>A:</strong> Player & opponent avatars, turn timer, chakra pool (four types: Strength, Ki, Speed, Mind).</li>
              <li><strong>B:</strong> Your team's health bars & active effects. Hover over effects to see descriptions.</li>
              <li><strong>C:</strong> Opponent's team, works the same as Section B.</li>
              <li><strong>D:</strong> Your character skills (click to select, click a target to use). Unavailable skills appear grayed out.</li>
              <li><strong>E:</strong> Displays detailed skill information like cooldowns, energy cost, and effects.</li>
              <li><strong>F:</strong> Options menu: Surrender, Chat, Sound Settings.</li>
            </ul>
          </section>
          
          {/* Ki System Section */}
          <section id="ki-system" className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-dbz-darkblue border-b pb-2">3. Ki System</h2>
            <p className="mb-4">Every turn, players receive random Ki based on surviving characters:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-dbz-red mr-2"></div>
                <span><strong>Strength</strong> (Red)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-dbz-blue mr-2"></div>
                <span><strong>Ki</strong> (Blue)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-dbz-green mr-2"></div>
                <span><strong>Speed</strong> (Green)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white border border-gray-300 mr-2"></div>
                <span><strong>Mind</strong> (White)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-dbz-yellow mr-2"></div>
                <span><strong>Random Ki</strong> (Yellow): Can be used as any type.</span>
              </div>
            </div>
            
            <p>Some abilities require specific Ki combinations, while others use random Ki.</p>
          </section>
          
          {/* Turn System Section */}
          <section id="turn-system" className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-dbz-darkblue border-b pb-2">4. Ending Your Turn</h2>
            <p className="mb-4">After choosing skills for your team:</p>
            
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Click "Press When Ready".</li>
              <li>Adjust Ki selection (convert random Ki if needed).</li>
              <li>Reorder skill execution (left to right).</li>
              <li>Click OK to finalize your turn.</li>
            </ol>
            
            <p className="bg-yellow-100 p-3 rounded-md flex items-start">
              <span className="text-yellow-600 font-bold mr-2">⚠️</span>
              <span>If time runs out, your skills won't activate!</span>
            </p>
          </section>
          
          {/* Terminology Section */}
          <section id="terminology" className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-dbz-darkblue border-b pb-2">5. Common Battle Terminology</h2>
            
            <h3 className="text-xl font-semibold mb-2 text-dbz-blue flex items-center">
              <Zap className="mr-2 h-5 w-5 text-dbz-yellow" />
              Skill Effects:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Damage:</strong> Reduces health.</li>
              <li><strong>Piercing Damage:</strong> Ignores damage reduction.</li>
              <li><strong>Affliction Damage:</strong> Ignores damage reduction and shields.</li>
              <li><strong>Stun:</strong> Prevents skill use for a set duration.</li>
              <li><strong>Damage Reduction:</strong> Lowers incoming damage by a fixed amount or percentage.</li>
              <li><strong>Invulnerable:</strong> The character cannot be targeted for attacks.</li>
              <li><strong>Heal:</strong> Restores health by a fixed amount or percentage.</li>
              <li><strong>Ki Steal:</strong> Takes Ki from the opponent and adds it to your pool.</li>
              <li><strong>Counter:</strong> Cancels an incoming skill.</li>
              <li><strong>Destructible Defense:</strong> Absorbs damage before affecting HP.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 text-dbz-blue flex items-center">
              <Swords className="mr-2 h-5 w-5 text-dbz-orange" />
              Skill Classifications:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Melee:</strong> Close-range attack.</li>
              <li><strong>Ranged:</strong> Long-distance attack.</li>
              <li><strong>Physical:</strong> Uses brute force.</li>
              <li><strong>Ki-based:</strong> Uses energy blasts.</li>
              <li><strong>Affliction:</strong> Persistent effects like poison or burning.</li>
              <li><strong>Mental:</strong> Psychic or telepathic attacks.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 text-dbz-blue flex items-center">
              <Shield className="mr-2 h-5 w-5 text-dbz-green" />
              Skill Duration Types:
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Instant:</strong> Happens immediately.</li>
              <li><strong>Action:</strong> Lasts multiple turns but can be disrupted.</li>
              <li><strong>Control:</strong> Continuous effect, canceled if the caster is interrupted.</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 text-dbz-blue flex items-center">
              <Clock className="mr-2 h-5 w-5 text-dbz-blue" />
              Cooldown System:
            </h3>
            <p className="mb-2">After using a skill, it cannot be used for a set number of turns.</p>
            <p className="mb-4 italic">Example: A skill with a cooldown of 3 will be unavailable for three turns.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default GameManual;
