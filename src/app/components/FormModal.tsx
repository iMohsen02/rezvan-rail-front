"use client";

import type { ReactNode, MouseEvent } from "react";

type FormModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function FormModal({ title, onClose, children }: FormModalProps) {
  return (
    <div className="fixed inset-0 z-50" aria-modal role="dialog" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm grayscale" />
      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e: MouseEvent) => e.stopPropagation()}>
        <div className="card w-full max-w-xl max-h-[85vh] overflow-auto">
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--neutral-200)" }}>
            <h3 className="font-bold text-lg">{title || "فرم"}</h3>
            <button className="btn-ghost" onClick={onClose}>بستن</button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

