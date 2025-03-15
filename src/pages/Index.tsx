
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Swords, Users } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dbz-blue/20 to-dbz-orange/20 -z-10"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="game-title text-5xl md:text-7xl mb-6 animate-fade-in">
                Dragon Ball Z
                <br />
                Strategy Arena
              </h1>
              <p className="text-xl max-w-2xl mb-8 text-gray-700">
                Engage in tactical 3v3 battles with your favorite Dragon Ball Z characters. 
                Master unique abilities, form strategic teams, and rise to the top of the rankings!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/battle">
                  <Button size="lg" className="bg-dbz-orange hover:bg-dbz-orange/90 text-white button-glow">
                    Start Battle <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/characters">
                  <Button size="lg" variant="outline" className="border-dbz-blue text-dbz-blue hover:bg-dbz-blue/10">
                    View Characters
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/70">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl game-title text-center mb-12">Game Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-dbz-orange/20 rounded-full flex items-center justify-center">
                    <Swords className="h-8 w-8 text-dbz-orange" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Strategic 3v3 Battles</h3>
                <p className="text-gray-600 text-center">
                  Plan your moves carefully, manage your energy, and unleash devastating combos in turn-based combat.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-dbz-blue/20 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-dbz-blue" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Diverse Character Roster</h3>
                <p className="text-gray-600 text-center">
                  Choose from a wide range of DBZ characters, each with unique abilities based on the anime.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-dbz-green/20 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-energy-health" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Competitive Rankings</h3>
                <p className="text-gray-600 text-center">
                  Climb the global leaderboards, earn rewards, and prove your tactical superiority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-dbz-darkblue/90 -z-10"></div>
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl text-white mb-6 text-shadow">Ready For Battle?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of players in epic tactical combats. Create your ultimate team and rise to the top!
              </p>
              <Link to="/battle">
                <Button size="lg" className="bg-dbz-orange hover:bg-dbz-orange/90 text-white button-glow">
                  Play Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
