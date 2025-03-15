
import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Battle = () => {
  const [battleStarted, setBattleStarted] = useState(false);

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
                Select your team of three Dragon Ball Z characters and enter the arena. 
                Use strategy and timing to defeat your opponents in turn-based combat!
              </p>
              
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
              
              <Button 
                size="lg" 
                className="bg-dbz-orange hover:bg-dbz-orange/90 text-white button-glow w-full"
                onClick={() => setBattleStarted(true)}
              >
                Start Battle
              </Button>
            </Card>
          </div>
        ) : (
          <div className="battle-field w-full h-[500px] rounded-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl text-white mb-4">Battle In Progress</h2>
            <p className="text-white/90 mb-6">This is a placeholder for the actual battle gameplay.</p>
            <Button 
              variant="outline" 
              className="bg-white text-dbz-darkblue"
              onClick={() => setBattleStarted(false)}
            >
              End Battle
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Battle;
