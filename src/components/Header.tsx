
import { Leaf } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-green-800">Plant Care AI</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-green-700 hover:text-green-900 transition-colors">
              {t('navigation.home')}
            </a>
            <a href="#identify" className="text-green-700 hover:text-green-900 transition-colors">
              {t('navigation.identify')}
            </a>
            <LanguageSwitcher />
          </nav>
          
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
