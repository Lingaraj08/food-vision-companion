
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to ensure models download correctly
env.allowLocalModels = false;
env.useBrowserCache = false;

// Food database - simplified for demo purposes
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
  }
};

// Load model for image classification
let classifier: any = null;

export async function initializeFoodRecognizer() {
  if (!classifier) {
    try {
      classifier = await pipeline(
        "image-classification",
        "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
        { device: "cpu" } // Use WebGPU if available, otherwise fallback to CPU
      );
    } catch (error) {
      console.error("Error initializing food recognition model:", error);
      throw new Error("Failed to load food recognition model");
    }
  }
  return classifier;
}

export async function recognizeFood(imageSource: string | Blob): Promise<string> {
  try {
    const model = await initializeFoodRecognizer();
    const result = await model(imageSource);
    
    // Just for demo purposes - map the generic classifier result to food items
    const predictedClass = result[0]?.label.toLowerCase() || "";
    
    // Look for food keywords in the prediction
    const foodKeywords = Object.keys(foodDatabase);
    const matchedFood = foodKeywords.find(food => 
      predictedClass.includes(food) || 
      (food.length > 4 && predictedClass.includes(food.substring(0, 4)))
    );
    
    return matchedFood || "unknown";
  } catch (error) {
    console.error("Error recognizing food:", error);
    return "unknown";
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
