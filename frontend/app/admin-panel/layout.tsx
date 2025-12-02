// frontend/app/admin-panel/layout.tsx
"use client";

import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#050505] text-white">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8 bg-gradient-to-b from-[#050505] to-black flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
