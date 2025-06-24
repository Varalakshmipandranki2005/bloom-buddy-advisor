
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import PlantResult from "@/components/PlantResult";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plantData, setPlantData] = useState(null);
  const { toast } = useToast();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (file: File) => {
    console.log("Processing plant image:", file.name);
    setIsLoading(true);
    
    try {
      // Convert image to base64
      const imageData = await convertFileToBase64(file);
      console.log("Image converted to base64, calling ML analysis...");
      
      // Call our ML model edge function
      const { data, error } = await supabase.functions.invoke('analyze-plant', {
        body: { imageData }
      });
      
      if (error) {
        throw error;
      }
      
      console.log("ML Analysis completed:", data);
      setPlantData(data);
      
      toast({
        title: "Plant analyzed successfully!",
        description: `Identified: ${data.name} (${data.confidence}% confidence) - Status: ${data.healthStatus}`,
      });
      
    } catch (error) {
      console.error("Plant analysis failed:", error);
      toast({
        title: "Analysis failed",
        description: "Please try again with a clearer image of the plant",
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
                AI-Powered Plant Health Analysis
              </h2>
              <p className="text-green-600 text-lg">
                Upload a photo of your crop to get instant identification, health assessment, and expert recommendations for Indian farming conditions
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
