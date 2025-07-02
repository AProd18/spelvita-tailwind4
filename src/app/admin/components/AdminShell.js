"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import MenuIcon from "@mui/icons-material/Menu";

export default function AdminShell({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)] relative">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[color:var(--color-dark-olive)] text-white p-2 rounded-full shadow-md"
        aria-label="Otvori meni"
      >
        <MenuIcon />
      </button>

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 md:ml-64 p-4 md:p-12 overflow-auto w-full z-10">
        {children}
      </main>
    </div>
  );
}
