
import { Leaf, Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Smart Plant Helper</span>
            </div>
            <p className="text-green-200 text-sm">
              Your AI-powered companion for plant identification and care. 
              Helping gardeners grow healthier plants with expert recommendations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-green-200 text-sm">
              <li>Plant Identification</li>
              <li>Fertilizer Recommendations</li>
              <li>Pest Control Advice</li>
              <li>Care Guidelines</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-green-200 text-sm">
              <li>Help Center</li>
              <li>Plant Database</li>
              <li>Community Forum</li>
              <li>Expert Advice</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-green-200 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@smartplanthelper.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 pt-8 mt-8 text-center">
          <p className="text-green-200 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> for plant lovers everywhere
          </p>
          <p className="text-green-300 text-xs mt-2">
            © 2024 Smart Plant Helper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
