import React from 'react';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Error</h3>
      <p className="text-gray-400 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 border border-white/20 rounded-sm hover:bg-white/5 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
