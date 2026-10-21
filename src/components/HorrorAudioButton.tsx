import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1, Plus, Minus, X } from 'lucide-react';
import { useHorrorMusic } from '../context/HorrorMusicContext.js';
import { soundFX } from '../utils/sound.js';

interface HorrorAudioButtonProps {
  className?: string;
}

export function HorrorAudioButton({ className = '' }: HorrorAudioButtonProps) {
  const { volume, isMuted, setVolume } = useHorrorMusic();
  const [isOpen, setIsOpen] = useState(false);

  const isSoundOn = !isMuted && volume > 0;

  const handleVolumeChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(1, Math.round(newVal * 100) / 100));
    setVolume(clamped);
  };

  const handleStep = (delta: number) => {
    handleVolumeChange(volume + delta);
  };

  const getVolumeIcon = () => {
    if (!isSoundOn || volume === 0) return <VolumeX className="w-4 h-4 text-slate-400" />;
    if (volume < 0.5) return <Volume1 className="w-4 h-4 text-cyan-500 animate-pulse" />;
    return <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />;
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Sound Trigger Button in Navbar */}
      <button
        type="button"
        onClick={() => {
          soundFX.playClick();
          setIsOpen(true);
        }}
        className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer border ${
          isSoundOn
            ? 'bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border-cyan-500/50 shadow-[0_0_14px_rgba(6,182,212,0.35)]'
            : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 shadow-xs'
        }`}
        title={`Sound: ${isSoundOn ? `${Math.round(volume * 100)}%` : 'Off'} - Click to adjust volume`}
        aria-label="Sound volume control"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {getVolumeIcon()}
          {isSoundOn && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          )}
        </div>
      </button>

      {/* Minimal Sound Control Modal (Just Low / High Volume) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-pop-in">
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Simple Sound Dashboard Card */}
          <div className="relative w-full max-w-xs bg-white dark:bg-[#0E1428] text-slate-900 dark:text-slate-100 border-2 border-indigo-200 dark:border-cyan-900/70 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                  {getVolumeIcon()}
                </div>
                <span className="font-game font-black text-sm tracking-wide uppercase text-slate-900 dark:text-white">
                  SOUND VOLUME
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Percentage Display */}
            <div className="py-4 text-center">
              <span className="font-mono text-3xl font-extrabold text-cyan-500 dark:text-cyan-400">
                {isMuted || volume === 0 ? 'MUTE' : `${Math.round(volume * 100)}%`}
              </span>
              <p className="text-xs font-game font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {volume === 0 || isMuted
                  ? 'Sound is muted'
                  : volume < 0.4
                  ? 'Low Volume'
                  : volume < 0.75
                  ? 'Medium Volume'
                  : 'High Volume'}
              </p>
            </div>

            {/* Slider with Low / High Step Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleStep(-0.1)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 active:scale-95 shrink-0"
                  title="Lower Sound"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    title="Sound: Low to High"
                  />
                  <div className="flex justify-between text-[10px] font-game font-bold text-slate-400 px-0.5">
                    <span>LOW</span>
                    <span>HIGH</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStep(0.1)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 active:scale-95 shrink-0"
                  title="Higher Sound"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Presets: Low, Medium, High */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleVolumeChange(0.3)}
                  className={`py-2 px-1 rounded-xl text-xs font-game font-black tracking-wide border-2 transition-all cursor-pointer ${
                    !isMuted && Math.abs(volume - 0.3) < 0.15
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  LOW
                </button>

                <button
                  type="button"
                  onClick={() => handleVolumeChange(0.65)}
                  className={`py-2 px-1 rounded-xl text-xs font-game font-black tracking-wide border-2 transition-all cursor-pointer ${
                    !isMuted && Math.abs(volume - 0.65) < 0.15
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  MED
                </button>

                <button
                  type="button"
                  onClick={() => handleVolumeChange(1.0)}
                  className={`py-2 px-1 rounded-xl text-xs font-game font-black tracking-wide border-2 transition-all cursor-pointer ${
                    !isMuted && volume >= 0.85
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  HIGH
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
