"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {  
  return (
    <html lang="es">
      <body className="bg-black text-white h-screen overflow-hidden">
        <div className="flex h-full w-full">

          {/* SIDEBAR */}
          <div className="w-[250px] bg-neutral-950 border-r border-neutral-800">
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col">

            {/* TOPBAR */}
            <div className="h-16 border-b border-neutral-800 bg-neutral-950">
              <Topbar />
            </div>

            {/* PAGE */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
