import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Thermometer, Bug, Leaf, Flower, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface PlantData {
  name: string;
  scientificName: string;
  confidence: number;
  healthStatus: string;
  description: string;
  care: {
    water: string;
    temperature: string;
    soil: string;
    spacing: string;
  };
  fertilizers: Array<{
    name: string;
    type: string;
    application: string;
    frequency: string;
  }>;
  pesticides: Array<{
    name: string;
    target: string;
    application: string;
    safety: string;
  }>;
  diseases: string[];
  recommendations: string[];
}

interface PlantResultProps {
  plantData: PlantData;
}

const PlantResult = ({ plantData }: PlantResultProps) => {
  const getHealthStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy': return 'bg-green-100 text-green-700 border-green-300';
      case 'stressed': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'diseased': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'stressed': 
      case 'diseased': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Leaf className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'bg-green-100 text-green-700 border-green-300';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 85) return 'High Confidence';
    if (confidence >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Plant Info Header with Confidence Display */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-green-800 mb-2">
                {plantData.name}
              </CardTitle>
              <p className="text-green-600 italic mb-3">{plantData.scientificName}</p>
              <div className="flex gap-3 mb-3 flex-wrap">
                <Badge variant="outline" className={getConfidenceColor(plantData.confidence)}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {plantData.confidence}% - {getConfidenceLabel(plantData.confidence)}
                </Badge>
                <Badge variant="outline" className={getHealthStatusColor(plantData.healthStatus)}>
                  {getHealthIcon(plantData.healthStatus)}
                  <span className="ml-1 capitalize">{plantData.healthStatus}</span>
                </Badge>
              </div>
              {/* Confidence Explanation */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Confidence Score:</strong> This indicates how certain our AI model is about the plant identification. 
                  {plantData.confidence >= 85 && " High confidence means the identification is very reliable."}
                  {plantData.confidence >= 70 && plantData.confidence < 85 && " Medium confidence suggests the identification is likely correct but consider the recommendations carefully."}
                  {plantData.confidence < 70 && " Lower confidence suggests you may want to verify the identification with additional sources."}
                </p>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{plantData.description}</p>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations Card */}
      {plantData.healthStatus !== 'healthy' && (
        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-orange-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Immediate Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 font-medium">
                  Based on the analysis (Confidence: {plantData.confidence}%), your {plantData.name} shows signs of {plantData.healthStatus === 'stressed' ? 'stress' : 'disease'}.
                </p>
              </div>
              <ul className="space-y-2">
                {plantData.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></span>
                    <span className="text-sm text-orange-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="care" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="care">Care Guide</TabsTrigger>
          <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          <TabsTrigger value="protection">Plant Protection</TabsTrigger>
          <TabsTrigger value="diseases">Disease Info</TabsTrigger>
        </TabsList>

        <TabsContent value="care" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                  Irrigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.water}</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Thermometer className="w-5 h-5 mr-2 text-red-600" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.temperature}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Soil Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.soil}</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Sun className="w-5 h-5 mr-2 text-purple-600" />
                  Plant Spacing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.spacing}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fertilizers" className="mt-6">
          <div className="space-y-4">
            {plantData.fertilizers.map((fertilizer, index) => (
              <Card key={index} className="border-green-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{fertilizer.name}</CardTitle>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      {fertilizer.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Application:</strong> {fertilizer.application}</p>
                    <p><strong>Frequency:</strong> {fertilizer.frequency}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protection" className="mt-6">
          <div className="space-y-4">
            {plantData.pesticides.map((pesticide, index) => (
              <Card key={index} className="border-orange-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Bug className="w-5 h-5 mr-2 text-orange-600" />
                      {pesticide.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      {pesticide.target}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Application:</strong> {pesticide.application}</p>
                    <p><strong>Safety:</strong> {pesticide.safety}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diseases" className="mt-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Flower className="w-5 h-5 mr-2 text-red-600" />
                Common Diseases to Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plantData.diseases.map((disease, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    {disease}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlantResult;
