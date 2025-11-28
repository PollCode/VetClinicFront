import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/templates/Layout";
import LoadingScreen from "./components/atoms/LoadingScreen";

// Lazy load pages for better performance
const LandingPage = lazy(() => import("./components/pages/LandingPage"));
const LoginForm = lazy(() => import("./components/pages/LoginForm"));
const Dashboard = lazy(() => import("./components/pages/Dashboard"));
const UserManagment = lazy(
  () => import("./components/pages/users/UserManagement")
);
const AreaManagement = lazy(
  () => import("./components/pages/areas/AreaManagement")
);
const SpeciesManagement = lazy(
  () => import("./components/pages/species/SpeciesManagement")
);
const BreedManagement = lazy(
  () => import("./components/pages/breeds/BreedManagement")
);
const Appointments = lazy(() => import("./components/pages/Appointments"));
const FinancialModule = lazy(
  () => import("./components/pages/FinancialModule")
);
const DigitalLibrary = lazy(() => import("./components/pages/DigitalLibrary"));
const NotFound = lazy(() => import("./components/pages/NotFound"));

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UserManagment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/areas"
          element={
            <ProtectedRoute>
              <Layout>
                <AreaManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/species"
          element={
            <ProtectedRoute>
              <Layout>
                <SpeciesManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/breeds"
          element={
            <ProtectedRoute>
              <Layout>
                <BreedManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Layout>
                <Appointments />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/finances"
          element={
            <ProtectedRoute>
              <Layout>
                <FinancialModule />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Layout>
                <DigitalLibrary />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
