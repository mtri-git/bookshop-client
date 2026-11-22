import Icon from './Icon'

const LoadingIndicator = ({ 
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text = null,
  fullScreen = false,
  transparent = false,
  className = ''
}) => {
  // Size mappings
  const sizeMap = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color mappings
  const colorMap = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'text-orange-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    white: 'text-white'
  };

  // Get appropriate size and color classes
  const sizeClass = sizeMap[size] || sizeMap.medium;
  const colorClass = colorMap[color] || colorMap.primary;
  
  // Container classes for positioning
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center z-50' + (transparent ? ' bg-black/30' : ' bg-white')
    : 'flex flex-col items-center justify-center ' + className;

  // Render the appropriate loader type
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`flex space-x-2 ${colorClass}`}>
            <div className={`animate-bounce delay-75 rounded-full ${sizeClass.split(' ')[0].replace('w-', 'w-2 ')} ${sizeClass.split(' ')[1].replace('h-', 'h-2 ')} bg-current`}></div>
            <div className={`animate-bounce delay-150 rounded-full ${sizeClass.split(' ')[0].replace('w-', 'w-2 ')} ${sizeClass.split(' ')[1].replace('h-', 'h-2 ')} bg-current`}></div>
            <div className={`animate-bounce delay-300 rounded-full ${sizeClass.split(' ')[0].replace('w-', 'w-2 ')} ${sizeClass.split(' ')[1].replace('h-', 'h-2 ')} bg-current`}></div>
          </div>
        );
        
      case 'pulse':
        return (
          <div className={`${sizeClass} ${colorClass} relative`}>
            <div className="absolute inset-0 rounded-full bg-current opacity-75 animate-ping"></div>
            <div className="relative rounded-full bg-current w-full h-full"></div>
          </div>
        );

      case 'bar':
        return (
          <div className={`w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden`}>
            <div className={`h-full ${colorClass.replace('text-', 'bg-')} animate-progress origin-left`}></div>
          </div>
        );
        
      case 'book':
        // Custom book loading animation
        return (
          <div className={`${sizeClass} ${colorClass} relative`}>
            <div className="animate-book-flip absolute w-full h-full">
              <div className="absolute inset-0 border-2 border-current rounded-r transform origin-left"></div>
              <div className="absolute inset-0 border-2 border-current rounded-l transform origin-right"></div>
            </div>
          </div>
        );

      default: // 'spinner' is default
        return (
          <Icon name='spinner' className={`animate-spin ${sizeClass} ${colorClass}`} />
        );
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoader()}
      {text && <p className={`mt-3 font-medium ${colorClass}`}>{text}</p>}
    </div>
  );
};

export default LoadingIndicator;
