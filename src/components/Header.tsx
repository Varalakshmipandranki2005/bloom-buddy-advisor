
import { Leaf, Camera, BookOpen, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">Smart Plant Helper</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#identify" className="flex items-center space-x-2 text-green-700 hover:text-green-600 transition-colors">
              <Camera className="w-4 h-4" />
              <span>Identify</span>
            </a>
            <a href="#care" className="flex items-center space-x-2 text-green-700 hover:text-green-600 transition-colors">
              <Sprout className="w-4 h-4" />
              <span>Plant Care</span>
            </a>
            <a href="#guides" className="flex items-center space-x-2 text-green-700 hover:text-green-600 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Guides</span>
            </a>
          </nav>

          <Button className="plant-gradient text-white hover:opacity-90 transition-opacity">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
