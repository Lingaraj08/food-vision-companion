
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FoodItem } from "@/types";

interface FoodInfoCardProps {
  food: FoodItem;
}

export default function FoodInfoCard({ food }: FoodInfoCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <span>{food.name}</span>
          <span className="text-secondary font-bold">{food.calories} cal</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {food.imageUrl && (
          <div className="mb-4 w-full flex justify-center">
            <img 
              src={food.imageUrl} 
              alt={food.name} 
              className="rounded-lg max-h-48 object-cover"
            />
          </div>
        )}
        
        <div className="space-y-3 mt-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-sm text-muted-foreground">{food.nutrition.protein}g</span>
            </div>
            <Progress value={food.nutrition.protein * 2.5} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Carbs</span>
              <span className="text-sm text-muted-foreground">{food.nutrition.carbs}g</span>
            </div>
            <Progress value={food.nutrition.carbs / 2} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Fat</span>
              <span className="text-sm text-muted-foreground">{food.nutrition.fat}g</span>
            </div>
            <Progress value={food.nutrition.fat * 3} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Fiber</span>
              <span className="text-sm text-muted-foreground">{food.nutrition.fiber}g</span>
            </div>
            <Progress value={food.nutrition.fiber * 10} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
