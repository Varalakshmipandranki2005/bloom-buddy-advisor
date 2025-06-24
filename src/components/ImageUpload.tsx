
import { useState, useCallback } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading?: boolean;
}

const ImageUpload = ({ onImageUpload, isLoading = false }: ImageUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processFile(imageFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call parent handler
    onImageUpload(file);
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <Card className="p-8 border-2 border-dashed border-green-300 bg-green-50/30">
      {selectedImage ? (
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img 
              src={selectedImage} 
              alt="Selected plant" 
              className="max-w-full max-h-64 rounded-lg shadow-md"
            />
            {!isLoading && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Identifying your plant...</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`text-center py-12 transition-colors ${
            dragOver ? 'bg-green-100' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Upload Plant Image
          </h3>
          <p className="text-green-600 mb-6">
            Drag and drop an image or click to browse
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label htmlFor="file-upload">
              <Button className="plant-gradient text-white" asChild>
                <span>
                  <Camera className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          
          <p className="text-sm text-green-500 mt-4">
            Supports JPG, PNG, WEBP up to 10MB
          </p>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
