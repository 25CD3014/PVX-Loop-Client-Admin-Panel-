import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from '@/lib/auth';
import { AdminPortalLayout } from '@/components/AdminPortalLayout';
export const AdminProtectedRoute = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const isAdmin = useAuthStore(s => s.isAdmin);
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <AdminPortalLayout>
      <Outlet />
    </AdminPortalLayout>
  );
};