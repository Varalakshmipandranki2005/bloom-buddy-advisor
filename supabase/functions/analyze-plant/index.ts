
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Common Indian farm plants database
const indianPlantDatabase = {
  "rice": {
    name: "Rice",
    scientificName: "Oryza sativa",
    commonDiseases: [
      "Blast disease",
      "Brown spot",
      "Bacterial leaf blight",
      "Sheath rot",
      "False smut"
    ],
    fertilizers: [
      {
        name: "NPK 20-20-20",
        type: "Synthetic",
        application: "Apply 2-3 kg per acre during vegetative growth",
        frequency: "Every 15-20 days during growing season"
      },
      {
        name: "Organic Compost",
        type: "Organic",
        application: "Mix 5-10 tons per hectare into soil before planting",
        frequency: "Once before planting season"
      }
    ],
    pesticides: [
      {
        name: "Neem Oil",
        target: "Brown planthopper, Stem borer",
        application: "Spray 3-5ml per liter of water on affected areas",
        safety: "Organic and safe for humans. Apply during evening hours."
      },
      {
        name: "Chlorpyrifos",
        target: "Stem borer, Leaf folder",
        application: "Mix 2ml per liter and spray on affected plants",
        safety: "Wear protective gear. Do not apply before harvest."
      }
    ],
    careInstructions: {
      water: "Maintain 2-5cm water level in paddy fields. Drain before harvest.",
      temperature: "Optimal temperature 20-35°C. Protect from extreme cold.",
      soil: "Clay or loamy soil with pH 5.5-7.0. Good water retention needed.",
      spacing: "Plant spacing 20cm x 15cm for transplanted rice."
    }
  },
  "wheat": {
    name: "Wheat",
    scientificName: "Triticum aestivum",
    commonDiseases: [
      "Rust diseases",
      "Powdery mildew",
      "Loose smut",
      "Karnal bunt",
      "Leaf blight"
    ],
    fertilizers: [
      {
        name: "Urea (46% N)",
        type: "Synthetic",
        application: "Apply 130 kg per hectare in split doses",
        frequency: "Base dose at sowing, top dress at crown root initiation"
      },
      {
        name: "DAP (Diammonium Phosphate)",
        type: "Synthetic",
        application: "Apply 100 kg per hectare at time of sowing",
        frequency: "Once at sowing time"
      }
    ],
    pesticides: [
      {
        name: "Propiconazole",
        target: "Rust diseases, Powdery mildew",
        application: "Spray 1ml per liter of water when symptoms appear",
        safety: "Use protective equipment. Follow pre-harvest interval."
      }
    ],
    careInstructions: {
      water: "Irrigate at critical stages: crown root initiation, tillering, flowering, grain filling",
      temperature: "15-25°C optimal. Sensitive to high temperature during grain filling",
      soil: "Well-drained loamy soil with pH 6.0-7.5",
      spacing: "Row spacing 22.5cm, seed rate 100-125 kg per hectare"
    }
  },
  "tomato": {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    commonDiseases: [
      "Early blight",
      "Late blight",
      "Bacterial wilt",
      "Fusarium wilt",
      "Leaf curl virus"
    ],
    fertilizers: [
      {
        name: "NPK 19-19-19",
        type: "Synthetic",
        application: "Apply 2-3g per plant every 15 days",
        frequency: "Throughout growing season"
      },
      {
        name: "Vermicompost",
        type: "Organic",
        application: "Mix 2-3 kg per plant in soil before transplanting",
        frequency: "Once at planting"
      }
    ],
    pesticides: [
      {
        name: "Imidacloprid",
        target: "Whitefly, Aphids, Thrips",
        application: "Spray 0.5ml per liter of water",
        safety: "Avoid during flowering. Use protective gear."
      },
      {
        name: "Copper Oxychloride",
        target: "Early blight, Late blight",
        application: "Spray 3g per liter of water preventively",
        safety: "Organic-approved fungicide. Safe when used as directed."
      }
    ],
    careInstructions: {
      water: "Regular watering but avoid waterlogging. Drip irrigation preferred",
      temperature: "20-25°C optimal day temperature, 15-20°C night temperature",
      soil: "Well-drained sandy loam with pH 6.0-7.0. Rich in organic matter",
      spacing: "45cm x 30cm spacing for determinate varieties"
    }
  },
  "cotton": {
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    commonDiseases: [
      "Bollworm infestation",
      "Cotton leaf curl virus",
      "Fusarium wilt",
      "Bacterial blight",
      "Red rot"
    ],
    fertilizers: [
      {
        name: "NPK 17-17-17",
        type: "Synthetic",
        application: "Apply 250 kg per hectare in split doses",
        frequency: "Base dose at sowing, side dress at 45 and 75 days"
      }
    ],
    pesticides: [
      {
        name: "Bt Cotton Seeds",
        target: "Bollworm protection",
        application: "Use certified Bt cotton varieties",
        safety: "Genetically modified for bollworm resistance"
      },
      {
        name: "Emamectin Benzoate",
        target: "Pink bollworm, Spodoptera",
        application: "Spray 0.4g per liter when pest population exceeds threshold",
        safety: "Use during evening hours. Follow safety precautions."
      }
    ],
    careInstructions: {
      water: "Deep irrigation at 15-20 day intervals. Critical at flowering and boll formation",
      temperature: "21-30°C optimal. Requires 180-200 frost-free days",
      soil: "Deep, well-drained alluvial soil with pH 5.8-8.0",
      spacing: "60cm x 15cm for irrigated conditions"
    }
  }
};

// Plant health assessment based on image analysis
function assessPlantHealth(plantType: string, confidence: number): any {
  const plant = indianPlantDatabase[plantType.toLowerCase()];
  if (!plant) {
    return null;
  }

  // Simulate health analysis based on confidence and plant type
  const healthScore = confidence > 85 ? "healthy" : confidence > 60 ? "stressed" : "diseased";
  
  let recommendations = [];
  let medications = [];

  if (healthScore === "diseased" || healthScore === "stressed") {
    // Add disease-specific recommendations
    recommendations.push(
      `Monitor for ${plant.commonDiseases[0]} - common in ${plant.name}`,
      "Improve soil drainage and air circulation",
      "Apply organic mulch to maintain soil moisture"
    );
    
    // Add targeted medications
    medications.push(...plant.pesticides.slice(0, 2));
  }

  return {
    name: plant.name,
    scientificName: plant.scientificName,
    confidence: confidence,
    healthStatus: healthScore,
    description: `${plant.name} is a major crop grown by Indian farmers. ${healthScore === "healthy" ? 
      "This plant appears healthy with good growth characteristics." : 
      "This plant shows signs of stress or disease and requires attention."}`,
    care: plant.careInstructions,
    fertilizers: plant.fertilizers,
    pesticides: medications.length > 0 ? medications : plant.pesticides,
    diseases: plant.commonDiseases,
    recommendations: recommendations.length > 0 ? recommendations : [
      "Continue current care practices",
      "Monitor regularly for any changes",
      "Maintain proper irrigation schedule",
      "Apply fertilizers as per soil test recommendations"
    ]
  };
}

// Simple plant classification based on image features
async function classifyPlant(imageData: string): Promise<{plant: string, confidence: number}> {
  // In a real implementation, this would use an ML model
  // For now, we'll simulate classification based on common Indian farm plants
  const plants = ["rice", "wheat", "tomato", "cotton"];
  const randomIndex = Math.floor(Math.random() * plants.length);
  const confidence = 75 + Math.random() * 20; // 75-95% confidence
  
  return {
    plant: plants[randomIndex],
    confidence: Math.round(confidence)
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      throw new Error('No image data provided');
    }

    console.log('Analyzing plant image...');
    
    // Classify the plant
    const { plant, confidence } = await classifyPlant(imageData);
    console.log(`Classified as: ${plant} with ${confidence}% confidence`);
    
    // Get detailed plant information and health assessment
    const plantAnalysis = assessPlantHealth(plant, confidence);
    
    if (!plantAnalysis) {
      throw new Error('Plant type not supported');
    }

    console.log('Plant analysis completed successfully');

    return new Response(JSON.stringify(plantAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in analyze-plant function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Plant analysis failed', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
};

serve(handler);
