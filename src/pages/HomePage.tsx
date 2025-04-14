
import { useNavigate } from "react-router-dom";
import { Camera, ClipboardList, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-8 pt-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">FoodVision</h1>
          <p className="text-muted-foreground">Analyze food with just a scan</p>
        </div>

        <div className="grid gap-6 w-full max-w-md">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 h-auto flex justify-start items-center space-x-4"
                onClick={() => navigate('/scan')}
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Camera size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Scan Food</h3>
                  <p className="text-muted-foreground text-sm">
                    Identify food and get nutrition facts
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 h-auto flex justify-start items-center space-x-4"
                onClick={() => navigate('/history')}
              >
                <div className="bg-secondary/10 p-4 rounded-full">
                  <ClipboardList size={24} className="text-secondary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">History</h3>
                  <p className="text-muted-foreground text-sm">
                    View your previously scanned foods
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full p-6 h-auto flex justify-start items-center space-x-4"
                onClick={() => navigate('/about')}
              >
                <div className="bg-accent/10 p-4 rounded-full">
                  <Info size={24} className="text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">About</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn how FoodVision works
                  </p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
