
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, ClipboardList, Home } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-semibold text-xl">
            FoodVision
          </Link>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="flex justify-around py-2">
          <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-primary' : 'text-gray-500'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/scan" className={`flex flex-col items-center p-2 ${location.pathname === '/scan' ? 'text-primary' : 'text-gray-500'}`}>
            <Camera size={24} />
            <span className="text-xs mt-1">Scan Food</span>
          </Link>
          <Link to="/history" className={`flex flex-col items-center p-2 ${location.pathname === '/history' ? 'text-primary' : 'text-gray-500'}`}>
            <ClipboardList size={24} />
            <span className="text-xs mt-1">History</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
