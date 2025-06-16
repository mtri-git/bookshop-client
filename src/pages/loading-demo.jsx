import React, { useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

const LoadingDemoPage = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  
  // Show fullscreen loader for 3 seconds when requested
  const handleShowFullScreen = () => {
    setShowFullScreen(true);
    setTimeout(() => {
      setShowFullScreen(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Loading Indicators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Spinner Types */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Spinner (Default)</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Small</p>
              <LoadingIndicator size="small" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Medium (Default)</p>
              <LoadingIndicator />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Large</p>
              <LoadingIndicator size="large" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">With Text</p>
              <LoadingIndicator text="Loading..." />
            </div>
          </div>
        </div>
        
        {/* Dots Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dots</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Small</p>
              <LoadingIndicator type="dots" size="small" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Medium</p>
              <LoadingIndicator type="dots" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Large</p>
              <LoadingIndicator type="dots" size="large" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">With Text</p>
              <LoadingIndicator type="dots" text="Loading..." />
            </div>
          </div>
        </div>
        
        {/* Pulse Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pulse</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Small</p>
              <LoadingIndicator type="pulse" size="small" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Medium</p>
              <LoadingIndicator type="pulse" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">With Text</p>
              <LoadingIndicator type="pulse" text="Loading..." />
            </div>
          </div>
        </div>
        
        {/* Bar Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Bar</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Default</p>
              <LoadingIndicator type="bar" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Success</p>
              <LoadingIndicator type="bar" color="success" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">With Text</p>
              <LoadingIndicator type="bar" text="Loading..." />
            </div>
          </div>
        </div>
        
        {/* Book Type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Book</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Small</p>
              <LoadingIndicator type="book" size="small" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Medium</p>
              <LoadingIndicator type="book" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Large</p>
              <LoadingIndicator type="book" size="large" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">With Text</p>
              <LoadingIndicator type="book" text="Loading Books..." />
            </div>
          </div>
        </div>
        
        {/* Color Variations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Color Variations</h2>
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Primary (Default)</p>
              <LoadingIndicator />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Secondary</p>
              <LoadingIndicator color="secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Accent</p>
              <LoadingIndicator color="accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Success</p>
              <LoadingIndicator color="success" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Warning</p>
              <LoadingIndicator color="warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Danger</p>
              <LoadingIndicator color="danger" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Screen Demo Button */}
      <div className="mt-10 text-center">
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleShowFullScreen}
        >
          Show Full Screen Loading (3s)
        </button>
      </div>
      
      {/* Full Screen Loading Indicator */}
      {showFullScreen && (
        <LoadingIndicator 
          fullScreen 
          transparent 
          size="large" 
          color="white"
          text="Loading Full Screen..." 
        />
      )}
    </div>
  );
};

export default LoadingDemoPage;
