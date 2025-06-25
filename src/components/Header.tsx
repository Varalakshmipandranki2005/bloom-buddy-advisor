
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">CropCare AI</h1>
              <p className="text-xs text-green-600">Smart Farming Assistant</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#identify" className="text-green-700 hover:text-green-800 transition-colors">
              Plant Analysis
            </a>
            <a href="#about" className="text-green-700 hover:text-green-800 transition-colors">
              About
            </a>
            <a href="#contact" className="text-green-700 hover:text-green-800 transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button className="plant-gradient text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
