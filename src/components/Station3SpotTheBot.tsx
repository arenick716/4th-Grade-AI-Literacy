/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { StationInfo } from '../types';
import { SPOT_THE_BOT_IMAGES } from '../data/stationData';

interface Station3Props {
  station: StationInfo;
  isStamped: boolean;
  onStamp: () => void;
  onNextStation: () => void;
}

export const Station3SpotTheBot: React.FC<Station3Props> = ({
  station,
  isStamped,
  onStamp,
  onNextStation,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const currentImage = SPOT_THE_BOT_IMAGES[activeImageIndex];

  // Magnifying glass loupe state
  const [isMagnifierActive, setIsMagnifierActive] = useState<boolean>(true);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number; pctX: number; pctY: number }>({
    x: 0,
    y: 0,
    pctX: 50,
    pctY: 50,
  });
  const [isHoveringImage, setIsHoveringImage] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Voting & Evidence State per image
  const [userVotes, setUserVotes] = useState<{ [id: string]: 'real' | 'ai' }>({});
  const [revealedEvidence, setRevealedEvidence] = useState<{ [id: string]: boolean }>({});
  const [activeGlitchesChecked, setActiveGlitchesChecked] = useState<{ [key: string]: boolean }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupePos({ x, y, pctX, pctY });
  };

  const handleCastVote = (vote: 'real' | 'ai') => {
    setUserVotes((prev) => ({ ...prev, [currentImage.id]: vote }));
    setRevealedEvidence((prev) => ({ ...prev, [currentImage.id]: true }));
  };

  const toggleGlitchCheck = (key: string) => {
    setActiveGlitchesChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasVoted = !!userVotes[currentImage.id];
  const isCorrect = hasVoted && (userVotes[currentImage.id] === 'ai' ? currentImage.isAi : !currentImage.isAi);

  return (
    <div className="space-y-8 py-4">
      {/* Station Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold text-amber-700 tracking-wider font-mono uppercase mb-1">
            Station 03 · {station.concept}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            {station.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {station.skillGoal}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStamp}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              isStamped
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {isStamped ? 'Station 3 Stamped!' : 'Stamp Station 3'}
          </button>
          <button
            onClick={onNextStation}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Station 4 →
          </button>
        </div>
      </div>

      {/* Gallery Selector Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase font-mono">
            Evidence Gallery:
          </span>
          <div className="flex items-center gap-1.5">
            {SPOT_THE_BOT_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeImageIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Case #{idx + 1}: {img.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMagnifierActive(!isMagnifierActive)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isMagnifierActive
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            {isMagnifierActive ? '🔍 Magnifying Loupe ON' : '🔍 Magnifying Loupe OFF'}
          </button>
        </div>
      </div>

      {/* Two-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Interactive Inspection Canvas with Magnifier Loupe */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                {currentImage.title}
              </h3>
              <span className="text-xs text-slate-500">
                Difficulty: {currentImage.difficulty} · Move your cursor over the image to inspect closely with the loupe!
              </span>
            </div>
            {hasVoted && (
              <span
                className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isCorrect ? '✓ Detective Diagnosis Correct!' : '⚠️ Fooled by the Bot!'}
              </span>
            )}
          </div>

          {/* Image Inspection Viewport */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-900 cursor-crosshair border border-slate-200 select-none"
          >
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Hotspot Pins When Evidence is Revealed */}
            {revealedEvidence[currentImage.id] &&
              currentImage.glitches.map((glitch, idx) => (
                <div
                  key={idx}
                  style={{ left: `${glitch.x}%`, top: `${glitch.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <div className="relative">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white font-bold text-xs shadow-lg animate-pulse ring-4 ring-rose-400/50">
                      {idx + 1}
                    </span>
                    {/* Tooltip on Hover */}
                    <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-xl z-30 pointer-events-none">
                      <div className="font-bold text-amber-400">{glitch.title}</div>
                      <div className="text-slate-300 mt-0.5">{glitch.description}</div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Circular Magnifying Loupe Overlay */}
            {isMagnifierActive && isHoveringImage && (
              <div
                style={{
                  left: `${loupePos.x}px`,
                  top: `${loupePos.y}px`,
                  backgroundImage: `url(${currentImage.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '280% 280%',
                  backgroundPosition: `${loupePos.pctX}% ${loupePos.pctY}%`,
                }}
                className="absolute w-36 h-36 -ml-18 -mt-18 rounded-full border-4 border-amber-400 shadow-2xl pointer-events-none z-30 ring-2 ring-black/40"
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                </div>
                <div className="absolute bottom-1 right-2 text-[10px] font-mono font-bold text-amber-300 bg-black/60 px-1 rounded-sm">
                  2.5x Zoom
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>🔍 Hover or drag to move magnifying glass</span>
            <span>
              {revealedEvidence[currentImage.id]
                ? currentImage.isAi
                  ? `${currentImage.glitches.length} Glitch Pins Revealed`
                  : 'Authentic Real Media Verified'
                : 'Examine carefully before casting your vote!'}
            </span>
          </div>
        </div>

        {/* Right Zone: 3-Point Diagnostic Checklist & Voting Desk */}
        <div className="lg:col-span-5 space-y-6">
          {/* The 3-Point AI Test Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-base font-display">
                The 3-Point AI Diagnostic Test
              </h3>
              <span className="text-xs font-mono text-slate-400">Checklist</span>
            </div>

            <div className="space-y-3">
              {/* Test Point 1 */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>🖐️</span>
                    <span>1. Anatomy & Symmetry</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={!!activeGlitchesChecked[`${currentImage.id}-anatomy`]}
                    onChange={() => toggleGlitchCheck(`${currentImage.id}-anatomy`)}
                    className="rounded-sm text-amber-600 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Count fingers and toes! Look for extra knuckles, mismatched eyes, doubled teeth rows, or warped ears.
                </p>
              </div>

              {/* Test Point 2 */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>🔤</span>
                    <span>2. Text & Logic</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={!!activeGlitchesChecked[`${currentImage.id}-text`]}
                    onChange={() => toggleGlitchCheck(`${currentImage.id}-text`)}
                    className="rounded-sm text-amber-600 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Can you read background signs and book titles? Are shadows cast in consistent physical directions?
                </p>
              </div>

              {/* Test Point 3 */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>👓</span>
                    <span>3. Edge Alignment</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={!!activeGlitchesChecked[`${currentImage.id}-edge`]}
                    onChange={() => toggleGlitchCheck(`${currentImage.id}-edge`)}
                    className="rounded-sm text-amber-600 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Do glasses stems connect to ears properly? Do fence posts melt into grass, or table legs vanish into floors?
                </p>
              </div>
            </div>
          </div>

          {/* Voting Action Desk */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm font-display">
              Cast Your Detective Vote:
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleCastVote('real')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  userVotes[currentImage.id] === 'real'
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                    : 'border-emerald-300 bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                <span className="text-xl">🟢</span>
                <span>Green Note: Real Photo</span>
              </button>

              <button
                onClick={() => handleCastVote('ai')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  userVotes[currentImage.id] === 'ai'
                    ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                    : 'border-rose-300 bg-rose-50/70 text-rose-900 hover:bg-rose-100'
                }`}
              >
                <span className="text-xl">🔴</span>
                <span>Red Note: AI Bot Glitch</span>
              </button>
            </div>

            {/* Evidence & Forensic Revelation */}
            {revealedEvidence[currentImage.id] && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  currentImage.isAi
                    ? 'border-rose-200 bg-rose-50/80 text-rose-950'
                    : 'border-emerald-200 bg-emerald-50/80 text-emerald-950'
                }`}
              >
                <div className="font-bold font-display text-sm">
                  {currentImage.isAi
                    ? '🤖 Synthesized by AI! Hallucinations Found:'
                    : '📸 Genuine Camera Photograph!'}
                </div>

                {currentImage.isAi ? (
                  <ul className="space-y-1 list-disc list-inside">
                    {currentImage.glitches.map((g, i) => (
                      <li key={i}>
                        <strong>{g.title}:</strong> {g.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{currentImage.realEvidence}</p>
                )}

                <div className="pt-2 border-t border-slate-200/50 text-[11px] opacity-90">
                  {currentImage.explanation}
                </div>
              </div>
            )}
          </div>

          {/* What It Teaches Callout */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold text-amber-900 block font-display">
              💡 What It Teaches
            </span>
            <p className="leading-relaxed">
              Generative AI models predict patterns rather than understand reality, leading to logical glitches called hallucinations. Never assume online media is real just because it looks realistic at first glance!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
