
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import PlantInfoForm from "@/components/PlantInfoForm";
import PlantResult from "@/components/PlantResult";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Loader2 } from "lucide-react";

interface PlantInfoFormData {
  location: string;
  symptoms: string;
  plantAge: string;
  soilType: string;
  wateringFrequency: string;
  fertilizationHistory: string;
  pestHistory: string;
  environmentalStress: string;
  urgency: 'low' | 'medium' | 'high';
}

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [plantData, setPlantData] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfoFormData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const saveAnalysisToDatabase = async (data: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('plant_analyses')
        .insert({
          user_id: user.id,
          plant_name: data.name,
          scientific_name: data.scientificName,
          confidence_score: data.confidence,
          health_status: data.healthStatus,
          analysis_data: data
        });

      if (error) throw error;
      
      console.log('Analysis saved to database successfully');
    } catch (error) {
      console.error('Failed to save analysis to database:', error);
    }
  };

  const handleImageUpload = async (file: File) => {
    console.log("Image uploaded:", file.name);
    setUploadedImage(file);
    setPlantData(null);
    setAnalysisError(null);
    
    toast({
      title: "Image uploaded successfully!",
      description: "Please provide additional plant information for better medication recommendations.",
    });
  };

  const handlePlantInfoSubmit = async (formData: PlantInfoFormData) => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload a plant image first.",
        variant: "destructive",
      });
      return;
    }

    console.log("Processing comprehensive plant analysis...");
    setIsLoading(true);
    setPlantData(null);
    setAnalysisError(null);
    setPlantInfo(formData);
    
    try {
      const imageData = await convertFileToBase64(uploadedImage);
      console.log("Calling enhanced analysis with plant information...");
      
      const { data, error } = await supabase.functions.invoke('analyze-plant', {
        body: { 
          imageData,
          plantInfo: formData
        }
      });
      
      if (error) {
        throw error;
      }
      
      console.log("Comprehensive plant analysis completed:", data);
      setPlantData(data);
      
      await saveAnalysisToDatabase(data);
      
      toast({
        title: "Analysis completed successfully!",
        description: `Identified: ${data.name} - Customized recommendations generated based on your input.`,
      });
      
    } catch (error) {
      console.error("Plant analysis failed:", error);
      
      if (error.message && error.suggestions) {
        setAnalysisError({
          message: error.message,
          suggestions: error.suggestions
        });
        
        toast({
          title: "Analysis failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const errorMessage = error.message || "Analysis failed. Please try again.";
        setAnalysisError({
          message: errorMessage,
          suggestions: [
            "Ensure the image shows a clear view of the plant",
            "Check that all form fields are filled correctly",
            "Try with better lighting conditions"
          ]
        });
        
        toast({
          title: "Analysis failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-green-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <section id="identify" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-green-800 mb-4">
                    Comprehensive Plant Health Analysis & Medication Recommendations
                  </h2>
                  <p className="text-green-600 text-lg">
                    Upload your plant photo and provide detailed information for personalized treatment recommendations
                  </p>
                </div>
                
                <div className="space-y-8">
                  <ImageUpload onImageUpload={handleImageUpload} isLoading={false} />
                  
                  {uploadedImage && (
                    <PlantInfoForm 
                      onSubmit={handlePlantInfoSubmit} 
                      isLoading={isLoading}
                    />
                  )}
                </div>
                
                {analysisError && (
                  <Card className="mt-8 border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-red-800 mb-2">
                            {analysisError.message}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Lightbulb className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-red-700">Suggestions to improve results:</span>
                            </div>
                            <ul className="space-y-1 ml-6">
                              {analysisError.suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm text-red-700 flex items-start">
                                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2 mt-2"></span>
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {plantData && (
                  <div className="mt-12">
                    <PlantResult plantData={plantData} />
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <UserProfile />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
