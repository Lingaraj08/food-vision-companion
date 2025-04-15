
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CameraComponent from '@/components/Camera';
import FoodInfoCard from '@/components/FoodInfoCard';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@/types';
import { recognizeFood, getFoodInfo } from '@/utils/foodRecognition';
import { useFoodStore } from '@/store/foodStore';

export default function ScanPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null);
  const addFood = useFoodStore(state => state.addFood);

  const handleImageCapture = async (imageData: string) => {
    setScanning(false);
    setCapturedImage(imageData);
    setProcessing(true);

    try {
      // Recognize the food in the captured image
      const foodKey = await recognizeFood(imageData);
      const foodInfo = getFoodInfo(foodKey);
      
      // Create food item with recognized information
      const foodItem: FoodItem = {
        id: `food-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: foodInfo.name,
        calories: foodInfo.calories,
        nutrition: foodInfo.nutrition,
        imageUrl: imageData,
        timestamp: new Date().toISOString()
      };
      
      setDetectedFood(foodItem);
      addFood(foodItem);
    } catch (error) {
      console.error('Error processing food image:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setScanning(true);
    setCapturedImage(null);
    setDetectedFood(null);
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center pb-16">
        <div className="mb-6 text-center w-full">
          <h1 className="text-2xl font-bold">Scan Food</h1>
          <p className="text-muted-foreground text-sm">
            Point your camera at food to identify it
          </p>
        </div>

        <div className="w-full max-w-md">
          {scanning ? (
            <CameraComponent onCapture={handleImageCapture} />
          ) : (
            <div className="space-y-6">
              {processing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">Analyzing food...</p>
                </div>
              ) : detectedFood ? (
                <div className="space-y-6">
                  <FoodInfoCard food={detectedFood} />
                  
                  <div className="flex flex-col space-y-3 w-full">
                    <Button onClick={handleReset} variant="outline">
                      Scan Again
                    </Button>
                    <Button onClick={handleViewHistory}>
                      View History
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Could not identify the food. Please try again.
                  </p>
                  <Button onClick={handleReset}>
                    Retry Scan
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
