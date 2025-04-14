import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to ensure models download correctly
env.allowLocalModels = false;
env.useBrowserCache = false;

// Enhanced food database with more items
export const foodDatabase: Record<string, {
  name: string;
  calories: number;
  nutrition: { protein: number; carbs: number; fat: number; fiber: number; }
}> = {
  apple: {
    name: "Apple",
    calories: 95,
    nutrition: { protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 }
  },
  banana: {
    name: "Banana",
    calories: 105,
    nutrition: { protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 }
  },
  orange: {
    name: "Orange",
    calories: 62,
    nutrition: { protein: 1.2, carbs: 15.4, fat: 0.2, fiber: 3.1 }
  },
  pizza: {
    name: "Pizza Slice",
    calories: 285,
    nutrition: { protein: 12, carbs: 36, fat: 10, fiber: 2.5 }
  },
  hamburger: {
    name: "Hamburger",
    calories: 354,
    nutrition: { protein: 20, carbs: 33, fat: 17, fiber: 1.4 }
  },
  steak: {
    name: "Steak",
    calories: 271,
    nutrition: { protein: 26, carbs: 0, fat: 18, fiber: 0 }
  },
  salad: {
    name: "Green Salad",
    calories: 33,
    nutrition: { protein: 1.8, carbs: 6.5, fat: 0.5, fiber: 2.8 }
  },
  pasta: {
    name: "Pasta",
    calories: 221,
    nutrition: { protein: 8.1, carbs: 43.2, fat: 1.3, fiber: 2.5 }
  },
  chicken: {
    name: "Grilled Chicken",
    calories: 165,
    nutrition: { protein: 31, carbs: 0, fat: 3.6, fiber: 0 }
  },
  sushi: {
    name: "Sushi Roll",
    calories: 350,
    nutrition: { protein: 9, carbs: 65, fat: 3, fiber: 5.8 }
  },
  burrito: {
    name: "Burrito",
    calories: 340,
    nutrition: { protein: 15, carbs: 50, fat: 8, fiber: 8 }
  },
  taco: {
    name: "Taco",
    calories: 210,
    nutrition: { protein: 11, carbs: 18, fat: 10, fiber: 3 }
  },
  sandwich: {
    name: "Sandwich",
    calories: 290,
    nutrition: { protein: 15, carbs: 35, fat: 10, fiber: 4 }
  },
  burrito_bowl: {
    name: "Burrito Bowl",
    calories: 650,
    nutrition: { protein: 35, carbs: 83, fat: 17, fiber: 16 }
  },
  ice_cream: {
    name: "Ice Cream",
    calories: 270,
    nutrition: { protein: 4.5, carbs: 32, fat: 14, fiber: 0.5 }
  },
  donut: {
    name: "Donut",
    calories: 240,
    nutrition: { protein: 3, carbs: 28, fat: 13, fiber: 0.7 }
  },
  cake: {
    name: "Cake Slice",
    calories: 350,
    nutrition: { protein: 4, carbs: 45, fat: 18, fiber: 0.5 }
  },
  cookie: {
    name: "Cookie",
    calories: 150,
    nutrition: { protein: 2, carbs: 19, fat: 8, fiber: 0.5 }
  },
  soup: {
    name: "Soup",
    calories: 135,
    nutrition: { protein: 6, carbs: 16, fat: 5, fiber: 2.5 }
  },
  rice: {
    name: "Rice",
    calories: 200,
    nutrition: { protein: 4, carbs: 44, fat: 0.5, fiber: 0.6 }
  }
};

// Object to store food keyword mappings for better recognition
const foodMappings: Record<string, string[]> = {
  apple: ["apple", "fruit", "red fruit", "green fruit"],
  banana: ["banana", "yellow fruit"],
  orange: ["orange", "citrus", "tangerine"],
  pizza: ["pizza", "pepperoni", "cheese pizza", "pie"],
  hamburger: ["hamburger", "burger", "cheeseburger", "beef burger"],
  steak: ["steak", "beef", "meat", "sirloin"],
  salad: ["salad", "lettuce", "greens", "vegetables"],
  pasta: ["pasta", "spaghetti", "noodle", "macaroni"],
  chicken: ["chicken", "poultry", "fried chicken", "grilled chicken"],
  sushi: ["sushi", "roll", "california roll", "maki", "japanese"],
  burrito: ["burrito", "wrap", "mexican"],
  taco: ["taco", "mexican", "shell"],
  sandwich: ["sandwich", "bread", "toast", "sub"],
  burrito_bowl: ["bowl", "rice bowl", "chipotle"],
  ice_cream: ["ice cream", "frozen", "dessert", "gelato"],
  donut: ["donut", "doughnut", "pastry"],
  cake: ["cake", "dessert", "birthday", "pastry"],
  cookie: ["cookie", "biscuit", "chocolate chip"],
  soup: ["soup", "broth", "chowder", "stew"],
  rice: ["rice", "grain", "white rice", "brown rice"]
};

// Load model for image classification
let classifier: any = null;

export async function initializeFoodRecognizer() {
  if (!classifier) {
    try {
      // Using a more accurate model for food recognition
      classifier = await pipeline(
        "image-classification",
        "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
        { device: "cpu" }
      );
      console.log("Food recognition model initialized successfully");
    } catch (error) {
      console.error("Error initializing food recognition model:", error);
      throw new Error("Failed to load food recognition model");
    }
  }
  return classifier;
}

interface RecognitionResult {
  foodKey: string;
  confidence: number;
  alternativeFoods: { key: string; confidence: number }[];
}

export async function recognizeFood(imageSource: string | Blob): Promise<RecognitionResult> {
  try {
    const model = await initializeFoodRecognizer();
    const result = await model(imageSource, { topk: 5 }); // Get top 5 predictions
    
    console.log("Raw model predictions:", result);
    
    // Process all predictions to find food matches
    const matches: { key: string; confidence: number }[] = [];
    
    // Check each prediction against our food mappings
    result.forEach((prediction: { label: string; score: number }) => {
      const predictedClass = prediction.label.toLowerCase();
      
      for (const [foodKey, keywords] of Object.entries(foodMappings)) {
        // Check if any keyword matches the prediction
        if (keywords.some(keyword => predictedClass.includes(keyword))) {
          matches.push({
            key: foodKey,  // Changed from foodKey to key
            confidence: prediction.score
          });
          break;
        }
      }
      
      // Direct match with food keys
      const directMatch = Object.keys(foodDatabase).find(food => 
        predictedClass.includes(food)
      );
      
      if (directMatch && !matches.some(m => m.key === directMatch)) {
        matches.push({
          key: directMatch,  // Changed from foodKey to key
          confidence: prediction.score
        });
      }
    });
    
    // Sort matches by confidence
    matches.sort((a, b) => b.confidence - a.confidence);
    
    // If we have matches, return the best one with alternatives
    if (matches.length > 0) {
      return {
        foodKey: matches[0].key,
        confidence: matches[0].confidence,
        alternativeFoods: matches.slice(1, 3) // Include up to 2 alternatives
      };
    }
    
    // Fallback to "unknown" if no matches
    return {
      foodKey: "unknown",
      confidence: 0,
      alternativeFoods: []
    };
  } catch (error) {
    console.error("Error recognizing food:", error);
    return {
      foodKey: "unknown",
      confidence: 0,
      alternativeFoods: []
    };
  }
}

// Helper function to get food info from our database
export function getFoodInfo(foodKey: string) {
  return foodDatabase[foodKey] || {
    name: "Unknown Food",
    calories: 0,
    nutrition: { protein: 0, carbs: 0, fat: 0, fiber: 0 }
  };
}
