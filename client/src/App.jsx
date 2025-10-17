// Main App Component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import Me from './pages/Me';
import LoadingSpinner from './components/LoadingSpinner';

// App Loading Component
const AppLoading = () => {
  const { loadingMessage, connectionStatus } = useApp();

  const getLoadingType = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'network';
      case 'connected':
        return 'default';
      case 'disconnected':
        return 'network';
      case 'error':
        return 'network';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner 
          text={loadingMessage} 
          size="xl" 
          type={getLoadingType()}
          className="mb-4"
        />
        <div className="text-xs text-gray-500 mt-4">
          {connectionStatus === 'disconnected' && 'Retrying connection...'}
          {connectionStatus === 'error' && 'Please check your server connection'}
        </div>
      </div>
    </div>
  );
};

// Root redirect component
const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Authenticating..." size="lg" type="auth" />
      </div>
    );
  }

  // Redirect to /customers if authenticated, /login if not
  return <Navigate to={isAuthenticated ? "/customers" : "/login"} replace />;
};

// Main App Content
const AppContent = () => {
  const { isAppReady } = useApp();

  if (!isAppReady) {
    return <AppLoading />;
  }

  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <div className="App">
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {/* Application Routes */}
          <Routes>
            {/* Root redirect based on auth status */}
            <Route path="/" element={<RootRedirect />} />
            
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <CustomerList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/new"
              element={
                <ProtectedRoute>
                  <CustomerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/:id/edit"
              element={
                <ProtectedRoute>
                  <CustomerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Me />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LoadingProvider>
  );
};

// Main App Component
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
