
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Thermometer, Bug, Leaf, Flower } from "lucide-react";

interface PlantData {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  care: {
    water: string;
    light: string;
    temperature: string;
    humidity: string;
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
  tips: string[];
}

interface PlantResultProps {
  plantData: PlantData;
}

const PlantResult = ({ plantData }: PlantResultProps) => {
  return (
    <div className="space-y-6">
      {/* Plant Info Header */}
      <Card className="border-green-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-green-800 mb-2">
                {plantData.name}
              </CardTitle>
              <p className="text-green-600 italic mb-2">{plantData.scientificName}</p>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {plantData.confidence}% Confidence
              </Badge>
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

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="care" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="care">Plant Care</TabsTrigger>
          <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          <TabsTrigger value="pesticides">Pest Control</TabsTrigger>
          <TabsTrigger value="health">Plant Health</TabsTrigger>
        </TabsList>

        <TabsContent value="care" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                  Watering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.water}</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Sun className="w-5 h-5 mr-2 text-yellow-600" />
                  Light Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.light}</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
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

            <Card className="border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Droplets className="w-5 h-5 mr-2 text-purple-600" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plantData.care.humidity}</p>
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

        <TabsContent value="pesticides" className="mt-6">
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

        <TabsContent value="health" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Flower className="w-5 h-5 mr-2 text-red-600" />
                  Common Diseases
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

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Care Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plantData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlantResult;
