
export const mockPlantData = {
  name: "Monstera Deliciosa",
  scientificName: "Monstera deliciosa",
  confidence: 96,
  description: "Monstera deliciosa, commonly known as the Swiss cheese plant, is a tropical flowering plant native to southern Mexico and Panama. It's popular as a houseplant due to its attractive, large, glossy leaves with characteristic holes and splits.",
  care: {
    water: "Water when the top 1-2 inches of soil are dry. Typically every 1-2 weeks in growing season, less in winter. Ensure good drainage to prevent root rot.",
    light: "Bright, indirect light. Can tolerate some direct morning sun but avoid harsh afternoon sunlight which can scorch the leaves.",
    temperature: "Ideal temperature range is 65-80°F (18-27°C). Avoid temperatures below 60°F (15°C) and protect from cold drafts.",
    humidity: "Prefers 50-60% humidity. Use a humidifier, pebble tray, or group with other plants to increase humidity around the plant."
  },
  fertilizers: [
    {
      name: "Balanced Liquid Fertilizer (20-20-20)",
      type: "Synthetic",
      application: "Dilute to half strength and apply during watering",
      frequency: "Every 2-4 weeks during growing season (spring-summer)"
    },
    {
      name: "Organic Compost Tea",
      type: "Organic",
      application: "Apply as liquid fertilizer around the base of the plant",
      frequency: "Monthly during growing season"
    },
    {
      name: "Slow-Release Granular Fertilizer",
      type: "Synthetic",
      application: "Sprinkle around soil surface and work into top inch of soil",
      frequency: "Every 3-4 months"
    }
  ],
  pesticides: [
    {
      name: "Neem Oil Spray",
      target: "Aphids, Spider Mites, Scale",
      application: "Spray on leaves in early morning or evening, covering both sides",
      safety: "Organic and safe for indoor use. Avoid spraying in direct sunlight."
    },
    {
      name: "Insecticidal Soap",
      target: "Soft-bodied insects",
      application: "Spray thoroughly on affected areas, repeat weekly if needed",
      safety: "Safe for humans and pets when dry. Test on small area first."
    },
    {
      name: "Systemic Insecticide Granules",
      target: "Root-feeding pests",
      application: "Apply to soil surface and water in according to package directions",
      safety: "Keep away from children and pets. Wear gloves when applying."
    }
  ],
  diseases: [
    "Root rot from overwatering",
    "Bacterial leaf spot",
    "Mosaic virus",
    "Powdery mildew in high humidity",
    "Yellowing leaves from nutrient deficiency"
  ],
  tips: [
    "Provide a moss pole or trellis for the plant to climb",
    "Clean leaves regularly with a damp cloth to remove dust",
    "Propagate easily through stem cuttings with aerial roots",
    "Rotate the plant weekly for even growth",
    "Watch for brown leaf tips which indicate low humidity",
    "Prune yellow or damaged leaves to encourage new growth",
    "Repot every 2-3 years or when roots become pot-bound"
  ]
};
