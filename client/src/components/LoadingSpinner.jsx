// Loading Spinner Component
import { Loader2, Database, Wifi, Shield } from 'lucide-react';

const LoadingSpinner = ({ 
  text = 'Loading...', 
  size = 'md', 
  className = '',
  type = 'default' // 'default', 'database', 'network', 'auth'
}) => {
  // Size configurations for the spinner
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Icon configurations for different loading types
  const getIcon = () => {
    const iconClass = `${sizeClasses[size]} animate-spin text-blue-600`;
    
    switch (type) {
      case 'database':
        return <Database className={iconClass} />;
      case 'network':
        return <Wifi className={iconClass} />;
      case 'auth':
        return <Shield className={iconClass} />;
      default:
        return <Loader2 className={iconClass} />;
    }
  };

  // Enhanced loading messages
  const getLoadingMessage = () => {
    if (text !== 'Loading...') return text;
    
    switch (type) {
      case 'database':
        return 'Connecting to database...';
      case 'network':
        return 'Establishing connection...';
      case 'auth':
        return 'Authenticating...';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      {/* Spinning loader icon */}
      {getIcon()}
      
      {/* Loading text */}
      <p className="mt-2 text-sm text-gray-600 font-medium">
        {getLoadingMessage()}
      </p>
      
      {/* Additional loading dots animation */}
      <div className="flex space-x-1 mt-2">
        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
