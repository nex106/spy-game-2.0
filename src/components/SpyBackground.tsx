import React from 'react';

export function SpyBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Cinematic Spy City Skyline Artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 filter brightness-[0.75] contrast-[1.12]"
        style={{
          backgroundImage: "url('/assets/spy_bg.png')",
          backgroundPosition: 'center 20%',
        }}
      />

      {/* Deep Noir Darkening & Contrast Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060e]/92 via-[#070b1a]/82 to-[#03050c]/96" />

      {/* Radial Vignette to emphasize center cards and content */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, transparent 20%, rgba(3, 5, 12, 0.75) 85%)',
        }}
      />

      {/* Neon Red Helicopter Beacon & Skyline Ambient Glow */}
      <div className="absolute top-[8%] right-[18%] w-80 h-80 bg-rose-600/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Neon Cyan Harbor Water Reflection Glow */}
      <div className="absolute bottom-[12%] left-[15%] w-96 h-96 bg-cyan-500/12 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Indigo Stealth Paranoia Light */}
      <div className="absolute top-[40%] left-[5%] w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
