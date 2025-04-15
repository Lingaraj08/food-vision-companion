
// Food item interface
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  imageUrl?: string;
  timestamp: string;
}
