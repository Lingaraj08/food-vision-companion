
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ChevronRight, Cpu, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center pb-16">
        <div className="mb-6 text-center w-full">
          <h1 className="text-2xl font-bold">About FoodVision</h1>
          <p className="text-muted-foreground text-sm">
            How this app works
          </p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Food Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                FoodVision uses computer vision technology to identify food items from images captured
                by your camera. Point your camera at any food item, and our AI will try to recognize it.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                AI Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our app utilizes a machine learning model that runs completely on your device.
                This means your photos aren't sent to a server, keeping your data private.
                The model is trained to recognize common food items and provide nutritional information.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Nutrition Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Nutritional information is based on average values for standard serving sizes.
                The calorie count and nutrition breakdown (protein, carbs, fat, fiber) are
                approximate and should be used as a general guide.
              </p>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              FoodVision v1.0.0 - Developed with ❤️
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
