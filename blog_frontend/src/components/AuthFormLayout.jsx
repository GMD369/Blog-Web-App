// src/components/AuthFormLayout.jsx
import React from "react";

const AuthFormLayout = ({ title, children }) => {
  return (
    /* ↙︎ relative so the animated squares can live behind the card */
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] overflow-hidden px-4">
      {/* ── animated background squares ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* you can add / remove spans or tweak size + position */}
        <span className="square left-8  top-12"  />
        <span className="square left-1/3 top-1/4 delay-1500" />
        <span className="square right-10 top-20 delay-3000" />
        <span className="square right-1/4 bottom-16 delay-4500" />
        <span className="square left-14 bottom-10 delay-6000" />
        <span className="square left-1/2 bottom-1/3 delay-7500" />
      </div>

      {/* ── auth card ─────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md p-8 rounded-2xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
