// App Context for global app state
import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for app
const initialState = {
  isAppReady: false,
  loadingMessage: 'Initializing application...',
};

// App reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case 'APP_LOADING':
      return {
        ...state,
        isAppReady: false,
        loadingMessage: action.payload.message || 'Loading...',
      };
    case 'APP_READY':
      return {
        ...state,
        isAppReady: true,
        loadingMessage: 'Application ready!',
      };
    case 'SET_LOADING_MESSAGE':
      return {
        ...state,
        loadingMessage: action.payload,
      };
    default:
      return state;
  }
};

// Create app context
const AppContext = createContext();

// App Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize app on mount
  useEffect(() => {
    // Small delay to show the loading message
    const timer = setTimeout(() => {
      dispatch({ type: 'APP_READY' });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    ...state,
    setLoadingMessage: (message) => dispatch({ type: 'SET_LOADING_MESSAGE', payload: message }),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
