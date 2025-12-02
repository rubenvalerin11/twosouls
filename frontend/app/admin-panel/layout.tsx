"use client";

import React from "react";
import "./admin-panel.css"; // ✅ Importamos estilos locales

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li><a href="/admin-panel">Dashboard</a></li>
          <li><a href="/admin-panel/orders">Pedidos</a></li>
          <li><a href="/admin-panel/products">Productos</a></li>
        </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
