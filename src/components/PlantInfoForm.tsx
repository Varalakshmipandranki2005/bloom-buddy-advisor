
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin } from "lucide-react";

interface PlantInfoFormData {
  plantName: string;
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

interface PlantInfoFormProps {
  onSubmit: (data: PlantInfoFormData) => void;
  isLoading?: boolean;
}

const PlantInfoForm = ({ onSubmit, isLoading = false }: PlantInfoFormProps) => {
  const form = useForm<PlantInfoFormData>({
    defaultValues: {
      plantName: '',
      location: '',
      symptoms: '',
      plantAge: '',
      soilType: '',
      wateringFrequency: '',
      fertilizationHistory: '',
      pestHistory: '',
      environmentalStress: '',
      urgency: 'medium'
    }
  });

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-green-800">
          <Leaf className="w-6 h-6 mr-2" />
          Plant Information & Symptoms
        </CardTitle>
        <p className="text-green-600 text-sm">
          Provide details about your plant for accurate medication recommendations
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="plantName"
              rules={{ required: "Plant name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Leaf className="w-4 h-4 mr-1" />
                    Plant Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rice, Wheat, Tomato, Cotton, Maize" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Location (State/District)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Maharashtra, Pune" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="plantAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plant Age</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2 months, 1 year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms Observed</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you've noticed: yellowing leaves, spots, wilting, stunted growth, pest damage, etc."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="soilType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., clay, loamy, sandy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="wateringFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watering Frequency</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., daily, weekly, as needed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fertilizationHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recent Fertilization</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What fertilizers have you used recently? When was the last application?"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pestHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pest/Disease History</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any previous pest problems or diseases? What treatments were used?"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="environmentalStress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environmental Conditions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Recent weather conditions, temperature extremes, drought, flooding, etc."
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How urgent is the situation?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <label htmlFor="low" className="text-sm">Low - Preventive care</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <label htmlFor="medium" className="text-sm">Medium - Some symptoms noticed</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <label htmlFor="high" className="text-sm">High - Immediate attention needed</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Get Medication Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlantInfoForm;
