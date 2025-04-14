
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import FoodInfoCard from '@/components/FoodInfoCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useFoodStore } from '@/store/foodStore';
import { format } from 'date-fns';

export default function HistoryPage() {
  const { scannedFoods, clearHistory } = useFoodStore();
  const [selectedFood, setSelectedFood] = useState(null);

  // Format date for display
  const formatDate = (isoString: string) => {
    try {
      return format(new Date(isoString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center pb-16">
        <div className="mb-6 text-center w-full">
          <h1 className="text-2xl font-bold">Food History</h1>
          <p className="text-muted-foreground text-sm">
            View your previously scanned foods
          </p>
        </div>

        {scannedFoods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your history is empty.</p>
            <p className="text-muted-foreground">Scan some food to see it here.</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">{scannedFoods.length} items</p>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Trash2 size={14} />
                    <span>Clear</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear history?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will delete all your food scan history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={clearHistory}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="space-y-4">
              {scannedFoods.map((food) => (
                <Dialog key={food.id}>
                  <DialogTrigger asChild>
                    <div className="bg-card border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                      {food.imageUrl && (
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={food.imageUrl} 
                            alt={food.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-medium">{food.name}</h3>
                        <p className="text-sm text-muted-foreground">{food.calories} calories</p>
                        <p className="text-xs text-muted-foreground">{formatDate(food.timestamp)}</p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Food Details</DialogTitle>
                    </DialogHeader>
                    <FoodInfoCard food={food} />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
