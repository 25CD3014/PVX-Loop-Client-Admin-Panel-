import { Outlet } from "react-router-dom";
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
export const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <SiteHeader />
    <main className="flex-grow">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);