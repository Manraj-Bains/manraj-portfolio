"use client";

import { useState } from "react";
import { ToastContext } from "./use-toast";

export function Toaster({ children }) {
  const [toasts, setToasts] = useState([]);

  function toast({ title, description, variant }) {
    const id = Math.random();
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-[9999] space-y-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md bg-white border p-4 shadow-md text-sm ${
              t.variant === "destructive"
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <p className="font-semibold">{t.title}</p>
            {t.description && (
              <p className="text-xs text-gray-600">{t.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
