
import { Camera, Upload, Zap, Shield, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
          {t('hero.title')}<br />
          <span className="plant-gradient bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>
        </h1>
        
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          
          
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 border-green-200 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{t('hero.instantId')}</h3>
            <p className="text-green-600">
              {t('hero.instantIdDesc')}
            </p>
          </Card>

          <Card className="p-6 border-green-200 hover:shadow-lg transition-shadow">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{t('hero.smartRecommendations')}</h3>
            <p className="text-green-600">
              {t('hero.smartRecommendationsDesc')}
            </p>
          </Card>

          <Card className="p-6 border-green-200 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{t('hero.completeGuide')}</h3>
            <p className="text-green-600">
              {t('hero.completeGuideDesc')}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
