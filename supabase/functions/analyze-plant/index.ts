
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive Indian farm plants database with detailed characteristics
const indianPlantDatabase = {
  "rice": {
    name: "Rice",
    scientificName: "Oryza sativa",
    description: "Rice is the most important staple food crop in India, cultivated in over 44 million hectares with diverse varieties suited for different agro-climatic conditions.",
    visualCharacteristics: {
      leaves: "Long, narrow, green leaves with parallel veins",
      stem: "Hollow stems (culms) with nodes",
      growth: "Grows in flooded fields, tillering habit",
      flowers: "Small spikelets in panicles",
      height: "60-150cm depending on variety"
    },
    commonDiseases: [
      "Blast disease (Pyricularia oryzae)",
      "Brown spot (Bipolaris oryzae)",
      "Bacterial leaf blight (Xanthomonas oryzae)",
      "Sheath rot (Sarocladium oryzae)",
      "False smut (Ustilaginoidea virens)"
    ],
    fertilizers: [
      {
        name: "NPK 20-20-20",
        type: "Synthetic",
        application: "Apply 2-3 kg per acre during vegetative growth stage",
        frequency: "Every 15-20 days during growing season"
      },
      {
        name: "Organic Compost",
        type: "Organic",
        application: "Mix 5-10 tons per hectare into soil before planting",
        frequency: "Once before planting season"
      },
      {
        name: "Zinc Sulphate",
        type: "Micronutrient",
        application: "Apply 25 kg per hectare if zinc deficiency is observed",
        frequency: "Once during nursery stage"
      }
    ],
    pesticides: [
      {
        name: "Neem Oil",
        target: "Brown planthopper, Stem borer",
        application: "Spray 3-5ml per liter of water on affected areas",
        safety: "Organic and safe for humans. Apply during evening hours to avoid bee toxicity."
      },
      {
        name: "Chlorpyrifos",
        target: "Stem borer, Leaf folder",
        application: "Mix 2ml per liter and spray on affected plants",
        safety: "Wear protective gear. Do not apply 15 days before harvest."
      }
    ],
    careInstructions: {
      water: "Maintain 2-5cm water level in paddy fields during vegetative stage. Drain 15 days before harvest.",
      temperature: "Optimal temperature 20-35°C. Protect from extreme cold below 15°C.",
      soil: "Clay or loamy soil with pH 5.5-7.0. Good water retention capacity needed.",
      spacing: "Plant spacing 20cm x 15cm for transplanted rice. Use 15cm x 10cm for SRI method."
    }
  },
  "wheat": {
    name: "Wheat",
    scientificName: "Triticum aestivum",
    description: "Wheat is the second most important cereal crop in India, grown mainly in northern plains during rabi season with high protein content varieties.",
    visualCharacteristics: {
      leaves: "Linear leaves with parallel veins, bluish-green color",
      stem: "Hollow culms with distinct nodes",
      growth: "Tillering habit, grows in rows",
      flowers: "Spike inflorescence with spikelets",
      height: "60-120cm depending on variety"
    },
    commonDiseases: [
      "Yellow rust (Puccinia striiformis)",
      "Brown rust (Puccinia triticina)",
      "Black rust (Puccinia graminis)",
      "Powdery mildew (Blumeria graminis)",
      "Karnal bunt (Tilletia indica)"
    ],
    fertilizers: [
      {
        name: "Urea (46% N)",
        type: "Synthetic",
        application: "Apply 130 kg per hectare in split doses - 1/3 at sowing, 1/3 at CRI, 1/3 at tillering",
        frequency: "Three split applications during crop cycle"
      },
      {
        name: "DAP (Diammonium Phosphate)",
        type: "Synthetic",
        application: "Apply 100 kg per hectare at time of sowing as basal dose",
        frequency: "Once at sowing time as basal application"
      }
    ],
    pesticides: [
      {
        name: "Propiconazole",
        target: "Rust diseases, Powdery mildew",
        application: "Spray 1ml per liter of water when disease symptoms first appear",
        safety: "Use protective equipment. Follow 35-day pre-harvest interval."
      }
    ],
    careInstructions: {
      water: "Irrigate at critical stages: CRI (21 days), tillering (40-45 days), flowering (65-70 days), grain filling (85-90 days)",
      temperature: "15-25°C optimal. Sensitive to high temperature (>30°C) during grain filling",
      soil: "Well-drained loamy soil with pH 6.0-7.5. Avoid waterlogged conditions.",
      spacing: "Row spacing 22.5cm, seed rate 100-125 kg per hectare depending on variety"
    }
  },
  "tomato": {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    description: "Tomato is a major vegetable crop in India, grown both for fresh consumption and processing, with varieties suited for different seasons.",
    visualCharacteristics: {
      leaves: "Compound leaves with serrated leaflets, strong tomato smell",
      stem: "Herbaceous, hairy stems with climbing tendency",
      growth: "Bush or vine growth habit, requires support",
      flowers: "Yellow star-shaped flowers in clusters",
      fruits: "Red, round or oval fruits when mature"
    },
    commonDiseases: [
      "Early blight (Alternaria solani)",
      "Late blight (Phytophthora infestans)",
      "Bacterial wilt (Ralstonia solanacearum)",
      "Fusarium wilt (Fusarium oxysporum)",
      "Tomato leaf curl virus (ToLCV)"
    ],
    fertilizers: [
      {
        name: "NPK 19-19-19",
        type: "Synthetic",
        application: "Apply 2-3g per plant every 15 days through fertigation",
        frequency: "Throughout growing season from 15 days after transplanting"
      },
      {
        name: "Vermicompost",
        type: "Organic",
        application: "Mix 2-3 kg per plant in soil before transplanting",
        frequency: "Once at planting as soil amendment"
      }
    ],
    pesticides: [
      {
        name: "Imidacloprid",
        target: "Whitefly, Aphids, Thrips",
        application: "Spray 0.5ml per liter of water or soil drench 0.2ml per plant",
        safety: "Avoid during flowering period. Use protective gear. 3-day harvest interval."
      },
      {
        name: "Copper Oxychloride",
        target: "Early blight, Late blight, Bacterial diseases",
        application: "Spray 3g per liter of water as preventive measure",
        safety: "Organic-approved fungicide. Safe when used as directed. No harvest restrictions."
      }
    ],
    careInstructions: {
      water: "Regular watering but avoid waterlogging. Drip irrigation preferred. 400-600mm water requirement.",
      temperature: "20-25°C optimal day temperature, 15-20°C night temperature. Protect from frost.",
      soil: "Well-drained sandy loam with pH 6.0-7.0. Rich in organic matter with good drainage.",
      spacing: "45cm x 30cm spacing for determinate varieties, 60cm x 45cm for indeterminate types"
    }
  },
  "cotton": {
    name: "Cotton",
    scientificName: "Gossypium hirsutum",
    description: "Cotton is a major fiber crop in India, primarily grown in Maharashtra, Gujarat, and Andhra Pradesh with both desi and American varieties.",
    visualCharacteristics: {
      leaves: "Broad, heart-shaped leaves with 3-5 lobes, thick and waxy",
      stem: "Woody main stem with branching, can grow tall",
      growth: "Bushy growth with square-shaped stems",
      flowers: "Large white or yellow flowers that turn pink/red",
      bolls: "Cotton bolls that burst open showing white cotton fibers"
    },
    commonDiseases: [
      "Pink bollworm (Pectinophora gossypiella)",
      "American bollworm (Helicoverpa armigera)",
      "Cotton leaf curl virus (CLCuV)",
      "Fusarium wilt (Fusarium oxysporum)",
      "Bacterial blight (Xanthomonas campestris)"
    ],
    fertilizers: [
      {
        name: "NPK 17-17-17",
        type: "Synthetic",
        application: "Apply 250 kg per hectare: 50% at sowing, 25% at square formation, 25% at flowering",
        frequency: "Three split applications during crop cycle"
      }
    ],
    pesticides: [
      {
        name: "Bt Cotton Seeds",
        target: "Bollworm protection",
        application: "Use certified Bt cotton varieties with Cry1Ac gene",
        safety: "Genetically modified for bollworm resistance. Follow refuge management."
      },
      {
        name: "Emamectin Benzoate",
        target: "Pink bollworm, Spodoptera",
        application: "Spray 0.4g per liter when pest population exceeds economic threshold",
        safety: "Use during evening hours. Toxic to bees. 3-day harvest interval."
      }
    ],
    careInstructions: {
      water: "Deep irrigation at 15-20 day intervals. Critical at flowering and boll formation stages.",
      temperature: "21-30°C optimal. Requires 180-200 frost-free days for full maturity.",
      soil: "Deep, well-drained alluvial soil with pH 5.8-8.0. Good moisture retention capacity.",
      spacing: "60cm x 15cm for irrigated conditions, 90cm x 30cm for rainfed conditions"
    }
  },
  "maize": {
    name: "Maize/Corn",
    scientificName: "Zea mays",
    description: "Maize is the third most important cereal crop in India, used for food, feed, and industrial purposes with high nutritional value.",
    visualCharacteristics: {
      leaves: "Long, broad leaves with parallel veins, C4 grass",
      stem: "Thick, solid stems with prominent nodes",
      growth: "Tall single stem with tassels at top",
      flowers: "Male tassels at top, female silks on cobs",
      grains: "Large kernels arranged on cobs"
    },
    commonDiseases: [
      "Turcicum leaf blight (Exserohilum turcicum)",
      "Maydis leaf blight (Bipolaris maydis)",
      "Common rust (Puccinia sorghi)",
      "Downy mildew (Peronosclerospora sorghi)",
      "Stalk rot (Fusarium moniliforme)"
    ],
    fertilizers: [
      {
        name: "NPK 12-32-16",
        type: "Synthetic",
        application: "Apply 300 kg per hectare as basal dose at sowing",
        frequency: "Once at sowing as starter fertilizer"
      },
      {
        name: "Urea",
        type: "Synthetic",
        application: "Apply 200 kg per hectare in 2-3 split doses",
        frequency: "30, 45, and 60 days after sowing"
      }
    ],
    pesticides: [
      {
        name: "Carbofuran",
        target: "Stem borer, Root worm",
        application: "Apply 1kg per hectare in soil at sowing time",
        safety: "Highly toxic. Use protective gear. Do not use near water bodies."
      }
    ],
    careInstructions: {
      water: "Requires 500-800mm water. Critical stages: tasseling, silking, and grain filling.",
      temperature: "20-30°C optimal. Sensitive to frost and waterlogging.",
      soil: "Well-drained fertile soil with pH 6.0-7.5. Rich in organic matter preferred.",
      spacing: "60cm x 20cm for normal varieties, 45cm x 20cm for dwarf varieties"
    }
  },
  "sugarcane": {
    name: "Sugarcane",
    scientificName: "Saccharum officinarum",
    description: "Sugarcane is a major cash crop in India, grown primarily for sugar production with high water and nutrient requirements.",
    visualCharacteristics: {
      leaves: "Long, narrow leaves with sharp edges",
      stem: "Thick, jointed stems (canes) with nodes and internodes",
      growth: "Tall grass that can reach 3-4 meters",
      flowers: "Feathery inflorescence (rarely flowers in commercial varieties)",
      nodes: "Prominent nodes with buds for propagation"
    },
    commonDiseases: [
      "Red rot (Colletotrichum falcatum)",
      "Smut (Sporisorium scitamineum)",
      "Wilt (Fusarium sacchari)",
      "Mosaic disease (Sugarcane mosaic virus)",
      "Grassy shoot disease (Phytoplasma)"
    ],
    fertilizers: [
      {
        name: "NPK 10-26-26",
        type: "Synthetic",
        application: "Apply 500 kg per hectare at planting time",
        frequency: "Once at planting as basal dose"
      }
    ],
    pesticides: [
      {
        name: "Chlorpyrifos",
        target: "Termites, Root borer",
        application: "Soil treatment with 4 liters per hectare before planting",
        safety: "Apply during soil preparation. Avoid contact with skin."
      }
    ],
    careInstructions: {
      water: "Heavy water requirement 1500-2500mm. Regular irrigation every 7-10 days.",
      temperature: "20-35°C optimal. Requires hot climate for growth and cool for maturity.",
      soil: "Deep, fertile, well-drained soil with pH 6.5-7.5. High organic matter content.",
      spacing: "90cm row spacing with 3-4 buds per sett placement"
    }
  },
  "soybean": {
    name: "Soybean",
    scientificName: "Glycine max",
    description: "Soybean is an important oilseed and protein crop in India, primarily grown in Maharashtra, Madhya Pradesh, and Rajasthan.",
    visualCharacteristics: {
      leaves: "Trifoliate compound leaves, broad leaflets",
      stem: "Herbaceous, branched stems with nodules on roots",
      growth: "Bushy growth habit, self-pollinating",
      flowers: "Small white or purple flowers in clusters",
      pods: "Hairy pods containing 2-4 beans"
    },
    commonDiseases: [
      "Rust (Phakopsora pachyrhizi)",
      "Yellow mosaic virus (Soybean yellow mosaic virus)",
      "Bacterial pustule (Xanthomonas campestris)",
      "Charcoal rot (Macrophomina phaseolina)",
      "Rhizoctonia root rot (Rhizoctonia solani)"
    ],
    fertilizers: [
      {
        name: "NPK 20-20-20",
        type: "Synthetic",
        application: "Apply 100 kg per hectare at sowing",
        frequency: "Once at sowing as basal dose"
      }
    ],
    pesticides: [
      {
        name: "Quinalphos",
        target: "Stem fly, Defoliators",
        application: "Spray 2ml per liter when pest incidence is noticed",
        safety: "Use protective gear. Do not spray during flowering."
      }
    ],
    careInstructions: {
      water: "Requires 450-700mm water. Critical during flowering and pod filling.",
      temperature: "20-30°C optimal. Sensitive to frost and waterlogging.",
      soil: "Well-drained loamy soil with pH 6.0-7.0. Good nodulation requires proper drainage.",
      spacing: "30cm x 5cm spacing with seed rate of 75-80 kg per hectare"
    }
  }
};

// Enhanced medication recommendation system based on plant name and user information
function generateMedicationRecommendations(plantName: string, plantInfo: any): any[] {
  const plant = indianPlantDatabase[plantName.toLowerCase()];
  if (!plant) {
    // If plant not in database, return generic recommendations based on symptoms
    return generateGenericRecommendations(plantInfo);
  }

  const recommendations = [];
  const { symptoms, urgency, location, environmentalStress, pestHistory } = plantInfo || {};

  // Base medications from plant database
  let baseMedications = [...plant.pesticides];

  // Symptom-based recommendations specific to the plant
  if (symptoms) {
    const symptomsLower = symptoms.toLowerCase();
    
    if (symptomsLower.includes('yellow') || symptomsLower.includes('chlorosis')) {
      recommendations.push({
        name: "Zinc Sulphate + Iron Chelate",
        target: `Nutrient deficiency in ${plant.name}`,
        application: "Foliar spray 2g/L + soil application for better absorption",
        safety: "Safe for organic farming. Apply during cooler hours.",
        priority: "High",
        reason: `Yellowing in ${plant.name} commonly indicates micronutrient deficiency`
      });
    }

    if (symptomsLower.includes('spot') || symptomsLower.includes('blight')) {
      recommendations.push({
        name: "Copper Oxychloride 50% WP",
        target: `Fungal diseases specific to ${plant.name}`,
        application: "Spray 3g/L water every 10-15 days as preventive measure",
        safety: "Wear protective gear. Avoid during flowering period.",
        priority: urgency === 'high' ? "Immediate" : "High",
        reason: `${plant.name} is susceptible to ${plant.commonDiseases[0]} and similar fungal infections`
      });
    }

    if (symptomsLower.includes('wilt') || symptomsLower.includes('droop')) {
      recommendations.push({
        name: "Trichoderma viride Bio-fungicide",
        target: `Root rot and wilting diseases in ${plant.name}`,
        application: "Soil drench 5g/L water around root zone, repeat weekly",
        safety: "Biological control - environmentally safe and beneficial.",
        priority: "Immediate",
        reason: `Wilting in ${plant.name} often indicates soil-borne pathogens affecting root system`
      });
    }

    if (symptomsLower.includes('insect') || symptomsLower.includes('pest') || symptomsLower.includes('damage')) {
      const commonPest = plant.pesticides[0]?.target || "general pests";
      recommendations.push({
        name: "Neem Oil 1500 ppm",
        target: `${commonPest} commonly affecting ${plant.name}`,
        application: "Spray 5ml/L water in evening hours, repeat every 7-10 days",
        safety: "Organic approved. Safe for beneficial insects when used correctly.",
        priority: urgency === 'high' ? "Immediate" : "Medium",
        reason: `${plant.name} is particularly vulnerable to ${commonPest}`
      });
    }
  }

  // Plant-specific disease prevention
  if (plant.commonDiseases.length > 0) {
    recommendations.push({
      name: `Preventive Fungicide for ${plant.name}`,
      target: plant.commonDiseases[0],
      application: "Apply as per manufacturer's instructions during vulnerable growth stages",
      safety: "Follow label instructions and pre-harvest interval.",
      priority: "Preventive",
      reason: `${plant.name} is highly susceptible to ${plant.commonDiseases[0]}`
    });
  }

  // Urgency-based recommendations
  if (urgency === 'high') {
    recommendations.push({
      name: "Systemic Plant Activator (Potassium Phosphonate)",
      target: `Emergency plant health booster for ${plant.name}`,
      application: "Foliar spray 2ml/L + soil drench for immediate plant defense activation",
      safety: "Non-toxic systemic treatment. Safe for frequent use.",
      priority: "Immediate",
      reason: `High urgency situation requires immediate systemic intervention for ${plant.name}`
    });
  }

  // Environmental stress recommendations
  if (environmentalStress) {
    const stressLower = environmentalStress.toLowerCase();
    
    if (stressLower.includes('drought') || stressLower.includes('water stress')) {
      recommendations.push({
        name: "Seaweed Extract + Humic Acid",
        target: `Drought stress recovery for ${plant.name}`,
        application: "Foliar spray 2ml/L weekly during stress period",
        safety: "Organic growth enhancer. Safe for all growth stages.",
        priority: "Medium",
        reason: `${plant.name} requires specific water management: ${plant.careInstructions.water}`
      });
    }
  }

  // Remove duplicates and sort by priority
  const uniqueRecommendations = recommendations.filter((item, index, self) => 
    index === self.findIndex(t => t.name === item.name)
  );

  const priorityOrder = { "Immediate": 1, "High": 2, "Medium": 3, "Preventive": 4 };
  uniqueRecommendations.sort((a, b) => 
    (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5)
  );

  // Combine with base plant medications
  const combinedMedications = [...uniqueRecommendations, ...baseMedications.slice(0, 2)];
  
  return combinedMedications.slice(0, 6); // Return top 6 recommendations
}

// Generic recommendations for plants not in database
function generateGenericRecommendations(plantInfo: any): any[] {
  const recommendations = [];
  const { symptoms, urgency } = plantInfo || {};

  if (symptoms) {
    const symptomsLower = symptoms.toLowerCase();
    
    if (symptomsLower.includes('yellow')) {
      recommendations.push({
        name: "Multi-micronutrient Fertilizer",
        target: "Nutrient deficiency causing yellowing",
        application: "Foliar spray 2g/L water weekly",
        safety: "Safe for all plants. Apply during cooler hours.",
        priority: "High",
        reason: "Yellowing leaves commonly indicate micronutrient deficiency"
      });
    }

    if (symptomsLower.includes('spot') || symptomsLower.includes('disease')) {
      recommendations.push({
        name: "Copper-based Fungicide",
        target: "Fungal and bacterial diseases",
        application: "Spray 3g/L water every 10-15 days",
        safety: "Use protective equipment. Follow harvest interval.",
        priority: urgency === 'high' ? "Immediate" : "High",
        reason: "Spots and lesions typically indicate fungal infections"
      });
    }
  }

  recommendations.push({
    name: "Neem Oil",
    target: "General pest and disease management",
    application: "Spray 5ml/L water in evening hours",
    safety: "Organic and safe for beneficial insects.",
    priority: "Medium",
    reason: "Broad-spectrum organic protection for most plants"
  });

  return recommendations;
}

// Plant analysis function that uses plant name as primary identifier
async function analyzePlantByName(plantName: string, plantInfo: any, imageData?: string): Promise<any> {
  console.log(`Analyzing plant: ${plantName} with user-provided information...`);
  
  const plant = indianPlantDatabase[plantName.toLowerCase()];
  
  if (!plant) {
    // Handle unknown plants
    console.log(`Plant "${plantName}" not found in database, providing generic recommendations...`);
    
    const genericRecommendations = generateGenericRecommendations(plantInfo);
    
    return {
      name: plantName,
      scientificName: "Classification pending",
      confidence: 75,
      healthStatus: plantInfo.urgency === 'high' ? "needs attention" : "monitoring required",
      description: `Based on your input, we're providing general care recommendations for ${plantName}. For more specific guidance, please consult with local agricultural experts.`,
      visualCharacteristics: {
        leaves: "Information not available",
        stem: "Information not available",
        growth: "Information not available"
      },
      analysisMethod: "User-provided plant name with symptom analysis",
      userProvidedInfo: plantInfo || {},
      care: {
        water: "Maintain adequate moisture based on plant type and local conditions",
        temperature: "Protect from extreme weather conditions",
        soil: "Ensure well-drained soil with appropriate pH",
        spacing: "Follow recommended spacing for your plant variety"
      },
      fertilizers: [
        {
          name: "Balanced NPK Fertilizer",
          type: "Synthetic",
          application: "Apply as per soil test recommendations",
          frequency: "Monthly during growing season"
        }
      ],
      pesticides: genericRecommendations,
      diseases: ["Monitor for common local plant diseases"],
      recommendations: [
        `Continue monitoring ${plantName} for symptom changes`,
        "Maintain proper watering and nutrition schedule",
        "Consult local agricultural extension for region-specific advice",
        "Consider soil testing for optimal fertilizer recommendations"
      ]
    };
  }

  // For known plants, provide comprehensive analysis
  let healthScore = "healthy";
  let healthConfidence = 85;
  
  // Adjust health assessment based on user-provided symptoms
  if (plantInfo && plantInfo.symptoms) {
    const symptoms = plantInfo.symptoms.toLowerCase();
    
    if (symptoms.includes('yellow') || symptoms.includes('wilt') || 
        symptoms.includes('spot') || symptoms.includes('disease') ||
        symptoms.includes('pest') || symptoms.includes('damage')) {
      healthScore = plantInfo.urgency === 'high' ? "diseased" : "stressed";
      healthConfidence = Math.max(75, healthConfidence);
    }
  }

  // Generate customized recommendations
  const customRecommendations = generateMedicationRecommendations(plantName, plantInfo);

  let recommendations = [];
  
  if (healthScore === "diseased") {
    recommendations.push(
      `Immediate attention required for ${plant.name}`,
      `Monitor for ${plant.commonDiseases[0]} which is common in ${plant.name}`,
      "Apply recommended treatments according to priority level",
      "Isolate affected plants if possible to prevent spread",
      "Consider consulting local agricultural extension officer"
    );
  } else if (healthScore === "stressed") {
    recommendations.push(
      `${plant.name} showing stress symptoms - preventive measures recommended`,
      `Check environmental conditions: ${plant.careInstructions.temperature}`,
      "Apply recommended treatments based on symptom analysis",
      "Increase monitoring frequency for next 2-3 weeks",
      `Follow proper care instructions for ${plant.name}`
    );
  } else {
    recommendations.push(
      `${plant.name} appears to be in good condition based on provided information`,
      `Continue following care guidelines for ${plant.name}`,
      "Apply preventive treatments as recommended",
      "Monitor regularly for any changes",
      `Maintain optimal growing conditions: ${plant.careInstructions.water}`
    );
  }

  // Add location-specific advice if provided
  if (plantInfo && plantInfo.location) {
    recommendations.push(`Location-specific advice: Consult local agricultural extension in ${plantInfo.location} for region-specific guidance on ${plant.name} cultivation`);
  }

  return {
    name: plant.name,
    scientificName: plant.scientificName,
    confidence: Math.max(75, healthConfidence),
    healthStatus: healthScore,
    description: plant.description,
    visualCharacteristics: plant.visualCharacteristics,
    analysisMethod: "Plant name identification with comprehensive symptom analysis",
    userProvidedInfo: plantInfo || {},
    care: plant.careInstructions,
    fertilizers: plant.fertilizers,
    pesticides: customRecommendations.length > 0 ? customRecommendations : plant.pesticides,
    diseases: plant.commonDiseases,
    recommendations: recommendations
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData, plantInfo } = await req.json();
    
    if (!plantInfo || !plantInfo.plantName) {
      throw new Error('Plant name is required for analysis');
    }

    console.log('Starting plant analysis based on plant name and user information...');
    console.log('Plant name provided:', plantInfo.plantName);
    
    if (plantInfo) {
      console.log('User provided additional plant information:', plantInfo);
    }
    
    const plantAnalysis = await analyzePlantByName(plantInfo.plantName, plantInfo, imageData);
    
    console.log('Plant analysis completed successfully based on plant name:', plantInfo.plantName);

    return new Response(JSON.stringify(plantAnalysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in plant analysis function:', error);
    
    const errorMessage = error.message || 'Plant analysis failed';
    
    return new Response(
      JSON.stringify({ 
        error: 'Analysis Failed', 
        message: errorMessage,
        suggestions: [
          "Ensure the plant name is spelled correctly",
          "Provide detailed symptom descriptions in the form",
          "Fill out all relevant fields in the plant information form",
          "Check the urgency level matches your plant's condition",
          "If problem persists, consult local agricultural extension"
        ]
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400
      }
    );
  }
};

serve(handler);
