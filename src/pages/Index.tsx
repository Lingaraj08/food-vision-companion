import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Camera, ClipboardList } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-8 pt-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">FoodVision</h1>
          <p className="text-muted-foreground">Scan food to get nutritional information</p>
        </div>

        <div className="grid gap-6 w-full max-w-sm">
          <Button 
            onClick={() => navigate('/scan')}
            className="h-auto py-6 flex justify-start items-center gap-4"
          >
            <Camera size={24} />
            <div className="text-left">
              <div className="font-semibold">Scan Food</div>
              <div className="text-sm opacity-80">Identify food and nutrition</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/history')}
            variant="outline"
            className="h-auto py-6 flex justify-start items-center gap-4"
          >
            <ClipboardList size={24} />
            <div className="text-left">
              <div className="font-semibold">History</div>
              <div className="text-sm opacity-80">View previous scans</div>
            </div>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
