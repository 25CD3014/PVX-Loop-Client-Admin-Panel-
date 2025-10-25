import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ContactPage } from '@/pages/ContactPage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/portal/DashboardPage';
import { SchedulePickupPage } from '@/pages/portal/SchedulePickupPage';
import { PickupHistoryPage } from '@/pages/portal/PickupHistoryPage';
import { DocumentsPage } from '@/pages/portal/DocumentsPage';
import { Toaster } from '@/components/ui/sonner';
import { PublicLayout } from './components/layouts/PublicLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminProtectedRoute } from './components/layouts/AdminProtectedRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/portal",
    element: <ProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "schedule-pickup", element: <SchedulePickupPage /> },
      { path: "history", element: <PickupHistoryPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "", element: <Navigate to="dashboard" replace /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "inquiries", element: <AdminInquiriesPage /> },
      { path: "", element: <Navigate to="dashboard" replace /> },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);