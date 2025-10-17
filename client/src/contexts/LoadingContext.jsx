// Loading Context for API operations
import { createContext, useContext, useReducer } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Initial state for loading
const initialState = {
  loading: {},
  globalLoading: false,
};

// Loading reducer
const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.isLoading,
        },
      };
    case 'SET_GLOBAL_LOADING':
      return {
        ...state,
        globalLoading: action.payload,
      };
    case 'CLEAR_LOADING':
      const newLoading = { ...state.loading };
      delete newLoading[action.payload];
      return {
        ...state,
        loading: newLoading,
      };
    case 'CLEAR_ALL_LOADING':
      return {
        ...state,
        loading: {},
        globalLoading: false,
      };
    default:
      return state;
  }
};

// Create loading context
const LoadingContext = createContext();

// Loading Provider Component
export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  // Set loading state for a specific operation
  const setLoading = (key, isLoading) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { key, isLoading },
    });
  };

  // Set global loading state
  const setGlobalLoading = (isLoading) => {
    dispatch({
      type: 'SET_GLOBAL_LOADING',
      payload: isLoading,
    });
  };

  // Clear loading state for a specific operation
  const clearLoading = (key) => {
    dispatch({
      type: 'CLEAR_LOADING',
      payload: key,
    });
  };

  // Clear all loading states
  const clearAllLoading = () => {
    dispatch({
      type: 'CLEAR_ALL_LOADING',
    });
  };

  // Check if a specific operation is loading
  const isLoading = (key) => {
    return state.loading[key] || false;
  };

  // Check if any operation is loading
  const isAnyLoading = () => {
    return Object.values(state.loading).some(loading => loading) || state.globalLoading;
  };

  // Get all loading operations
  const getLoadingOperations = () => {
    return Object.keys(state.loading).filter(key => state.loading[key]);
  };

  const value = {
    ...state,
    setLoading,
    setGlobalLoading,
    clearLoading,
    clearAllLoading,
    isLoading,
    isAnyLoading,
    getLoadingOperations,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

// Higher-order component for loading states
export const withLoading = (WrappedComponent, loadingKey) => {
  return function WithLoadingComponent(props) {
    const { isLoading } = useLoading();
    const isComponentLoading = isLoading(loadingKey);

    return (
      <div className="relative">
        {isComponentLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <LoadingSpinner size="md" text="Loading..." />
          </div>
        )}
        <WrappedComponent {...props} />
      </div>
    );
  };
};
