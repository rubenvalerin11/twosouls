"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-[250px] bg-neutral-950 border-r border-neutral-800">
        <Sidebar />
      </div>

      {/* TOPBAR + CONTENT */}
      <div className="flex-1 flex flex-col h-full">
        <div className="h-16 bg-neutral-950 border-b border-neutral-800">
          <Topbar />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>

    </div>
  );
}
