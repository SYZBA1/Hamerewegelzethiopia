"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";

// Dynamically import components to reduce initial bundle
const Sidebar = dynamic(() => import("@/components/lms/Sidebar"), { ssr: false });
const TopNavbar = dynamic(() => import("@/components/lms/TopNavbar"), { ssr: false });

export default function LMSLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isAuthRoute = ["/lms/login", "/lms/register", "/lms/forgot-password"].some((route) =>
    pathname.endsWith(route),
  );

  const title = useMemo(() => {
    if (pathname.endsWith("/lms/login")) return "Sign In";
    if (pathname.endsWith("/lms/register")) return "Register";
    if (pathname.endsWith("/lms/forgot-password")) return "Forgot Password";
    if (pathname.includes("/lms/dashboard")) return "Dashboard";
    if (pathname.includes("/lms/courses")) return "Courses";
    return "LMS";
  }, [pathname]);

  return (
    <AuthProvider>
      <div className="relative min-h-screen text-softWhite">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,148,74,0.78),rgba(51,183,79,0.62),rgba(214,255,0,0.45))] backdrop-blur-sm" />

        <div className="relative z-10 min-h-screen">
          {isAuthRoute ? (
            <main className="flex min-h-screen items-center justify-center p-4">{children}</main>
          ) : (
            <div className="flex min-h-screen">
              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed((x) => !x)} />
              </div>
              {/* Mobile Sidebar Overlay */}
              {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                  <div className="absolute inset-0 bg-[var(--charcoal)]/58" onClick={() => setMobileSidebarOpen(false)} />
                  <div className="absolute left-0 top-0 h-full">
                    <Sidebar isCollapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
                  </div>
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <TopNavbar title={title} onMobileMenuToggle={() => setMobileSidebarOpen(true)} />
                <main className="min-h-[calc(100vh-64px)] overflow-y-auto p-4 md:p-6">{children}</main>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}

