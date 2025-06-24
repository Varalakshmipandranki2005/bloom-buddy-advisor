
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import PlantResult from "@/components/PlantResult";
import Footer from "@/components/Footer";
import { mockPlantData } from "@/utils/mockPlantData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plantData, setPlantData] = useState(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    console.log("Processing plant image:", file.name);
    setIsLoading(true);
    
    // Simulate API call to plant identification service
    try {
      // In a real app, this would call Plant.id API or similar service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPlantData(mockPlantData);
      
      toast({
        title: "Plant identified successfully!",
        description: `Found: ${mockPlantData.name} with ${mockPlantData.confidence}% confidence`,
      });
    } catch (error) {
      console.error("Plant identification failed:", error);
      toast({
        title: "Identification failed",
        description: "Please try again with a clearer image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <section id="identify" className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Identify Your Plant
              </h2>
              <p className="text-green-600 text-lg">
                Upload a clear photo of your plant to get instant identification and care recommendations
              </p>
            </div>
            
            <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
            
            {plantData && (
              <div className="mt-12">
                <PlantResult plantData={plantData} />
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
