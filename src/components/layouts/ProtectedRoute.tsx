import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from '@/lib/auth';
import { PortalLayout } from '@/components/PortalLayout';
export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
};