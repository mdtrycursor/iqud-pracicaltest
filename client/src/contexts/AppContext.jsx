// App Context for global app state
import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for app
const initialState = {
  isAppReady: false,
  isServerConnected: false,
  connectionStatus: 'checking', // 'checking', 'connected', 'disconnected', 'error'
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
    case 'SERVER_CONNECTING':
      return {
        ...state,
        connectionStatus: 'checking',
        loadingMessage: 'Connecting to server...',
      };
    case 'SERVER_CONNECTED':
      return {
        ...state,
        isServerConnected: true,
        connectionStatus: 'connected',
        loadingMessage: 'Server connected successfully!',
      };
    case 'SERVER_DISCONNECTED':
      return {
        ...state,
        isServerConnected: false,
        connectionStatus: 'disconnected',
        loadingMessage: 'Server connection lost',
      };
    case 'SERVER_ERROR':
      return {
        ...state,
        isServerConnected: false,
        connectionStatus: 'error',
        loadingMessage: 'Server connection error',
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

  // Check server connection on app start
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        dispatch({ type: 'SERVER_CONNECTING' });
        
        // Try to ping the server
        const response = await fetch('/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          dispatch({ type: 'SERVER_CONNECTED' });
          // Small delay to show the connection success message
          setTimeout(() => {
            dispatch({ type: 'APP_READY' });
          }, 1000);
        } else {
          dispatch({ type: 'SERVER_ERROR' });
        }
      } catch (error) {
        console.log('Server not available, will retry...');
        dispatch({ type: 'SERVER_DISCONNECTED' });
        
        // Retry connection after 3 seconds
        setTimeout(() => {
          checkServerConnection();
        }, 3000);
      }
    };

    // Start checking connection after a short delay
    const timer = setTimeout(() => {
      checkServerConnection();
    }, 500);

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
