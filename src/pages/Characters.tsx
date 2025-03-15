
import Layout from "../components/Layout";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Characters = () => {
  // This would typically fetch character data from an API or local state
  const placeholderCharacters = [
    { id: 1, name: "Goku", power: "Super Saiyan", image: "/placeholder.svg" },
    { id: 2, name: "Vegeta", power: "Super Saiyan", image: "/placeholder.svg" },
    { id: 3, name: "Piccolo", power: "Special Beam Cannon", image: "/placeholder.svg" },
    { id: 4, name: "Gohan", power: "Mystic Form", image: "/placeholder.svg" },
    { id: 5, name: "Trunks", power: "Sword Techniques", image: "/placeholder.svg" },
    { id: 6, name: "Frieza", power: "Death Beam", image: "/placeholder.svg" },
  ];

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
          <h1 className="game-title text-3xl md:text-4xl">Character Roster</h1>
        </div>
        
        <p className="text-gray-700 mb-8">
          Choose from a diverse roster of Dragon Ball Z characters, each with unique abilities and stats.
          Create your team of three to dominate the strategy arena!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {placeholderCharacters.map((character) => (
            <Card key={character.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 character-hover">
              <div className="p-4 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-dbz-blue/10 flex items-center justify-center mb-4">
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{character.power}</p>
                <Button className="w-full bg-dbz-blue hover:bg-dbz-blue/90">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Characters;
