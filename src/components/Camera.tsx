
import { useRef, useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraProps {
  onCapture: (imageData: string) => void;
  onClose?: () => void;
}

export default function CameraComponent({ onCapture, onClose }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Could not access camera. Please ensure you have granted camera permissions.');
        setIsStreaming(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && isStreaming) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL and pass to parent component
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {error && (
        <div className="bg-destructive/20 text-destructive p-4 rounded-md mb-4 w-full">
          {error}
        </div>
      )}
      
      <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {onClose && (
          <button 
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mt-4 w-full flex justify-center">
        <Button 
          onClick={captureImage} 
          className="rounded-full w-16 h-16 flex items-center justify-center bg-primary"
          disabled={!isStreaming}
        >
          <Camera size={28} />
        </Button>
      </div>
    </div>
  );
}
