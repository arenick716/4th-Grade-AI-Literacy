/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StationInfo } from '../types';

interface Station1Props {
  station: StationInfo;
  isStamped: boolean;
  onStamp: () => void;
  onNextStation: () => void;
}

export const Station1PromptArchitect: React.FC<Station1Props> = ({
  station,
  isStamped,
  onStamp,
  onNextStation,
}) => {
  // Simulator State
  const [promptMode, setPromptMode] = useState<'preset' | 'builder'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<'vague' | 'precise'>('vague');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  // Custom Prompt Builder State
  const [customSubject, setCustomSubject] = useState<'house' | 'robot' | 'rocket' | 'castle'>('house');
  const [customRoofShape, setCustomRoofShape] = useState<'triangle' | 'flat' | 'dome' | 'unspecified'>('unspecified');
  const [customPlacement, setCustomPlacement] = useState<'center' | 'left' | 'right'>('center');
  const [customColor, setCustomColor] = useState<'yellow' | 'blue' | 'red' | 'unspecified'>('unspecified');
  const [customDetails, setCustomDetails] = useState<string[]>(['windows']);

  // Physical Partner Activity Timer
  const [partnerTimer, setPartnerTimer] = useState(120);
  const [isPartnerTimerActive, setIsPartnerTimerActive] = useState(false);

  const toggleDetail = (item: string) => {
    setCustomDetails((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulationStep(step);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Station Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold text-emerald-700 tracking-wider font-mono uppercase mb-1">
            Station 01 · {station.concept}
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
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {isStamped ? 'Station 1 Stamped!' : 'Stamp Station 1'}
          </button>
          <button
            onClick={onNextStation}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Station 2 →
          </button>
        </div>
      </div>

      {/* The 4-Part Prompt Formula Ribbon */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 font-mono">
          The 4th Grade AI Prompt Formula:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
            <span className="font-bold text-emerald-900 block text-sm">1. Subject</span>
            <span className="text-slate-600 text-xs">What thing are you creating? (A house, robot, rocket)</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
            <span className="font-bold text-emerald-900 block text-sm">2. Shapes & Sizes</span>
            <span className="text-slate-600 text-xs">Large square base, tall triangle roof, small circle</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
            <span className="font-bold text-emerald-900 block text-sm">3. Exact Placement</span>
            <span className="text-slate-600 text-xs">Centered, on top of, 2 inches to the right of</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-emerald-200/80 shadow-2xs">
            <span className="font-bold text-emerald-900 block text-sm">4. Key Details</span>
            <span className="text-slate-600 text-xs">Color, windows, doors, textures, background items</span>
          </div>
        </div>
      </div>

      {/* Two-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: The AI Generator Interactive Drawing Stage */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  The Robot Drawing Chamber
                </h3>
                <span className="text-xs text-slate-500">
                  Watch how an AI interprets vague instructions vs precise procedural prompts.
                </span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setPromptMode('preset')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    promptMode === 'preset'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vague vs Precise
                </button>
                <button
                  onClick={() => setPromptMode('builder')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    promptMode === 'builder'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Custom Builder
                </button>
              </div>
            </div>

            {/* Canvas / Visual Stage */}
            <div className="relative w-full h-72 sm:h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
              {/* Grid Background Pattern */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {promptMode === 'preset' ? (
                selectedPreset === 'vague' ? (
                  /* VAGUE PROMPT OUTPUT: AI Hallucinates & Guesses Wildly */
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <svg className="w-48 h-48" viewBox="0 0 200 200">
                      {/* Vague tiny lopsided box */}
                      <rect x="70" y="90" width="60" height="50" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                      {/* Tree randomly stuck on roof because user didn't say where! */}
                      <circle cx="90" cy="65" r="22" fill="#22c55e" />
                      <rect x="86" y="80" width="8" height="15" fill="#78350f" />
                      {/* Random giant balloon/banana the AI hallucinated */}
                      <path d="M 140 100 Q 170 80 150 130 Z" fill="#eab308" />
                      <text x="145" y="145" fill="#facc15" fontSize="8" fontFamily="sans-serif">
                        ? AI Guess ?
                      </text>
                      {/* Door floating in sky */}
                      <rect x="30" y="50" width="16" height="24" fill="#3b82f6" />
                    </svg>
                    <div className="mt-2 bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs px-3 py-1.5 rounded-lg max-w-sm">
                      ⚠️ <strong>Vague Input Error:</strong> The AI had to guess sizes, colors, and placement. Look: the tree ended up on the roof!
                    </div>
                  </div>
                ) : (
                  /* PRECISE PROMPT OUTPUT: Accurate Architectural Match */
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <svg className="w-56 h-56" viewBox="0 0 200 200">
                      {/* Ground line */}
                      <line x1="10" y1="160" x2="190" y2="160" stroke="#334155" strokeWidth="2" />
                      {/* Yellow Center House */}
                      <rect x="50" y="80" width="70" height="80" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="2" />
                      {/* Red Triangle Roof */}
                      <polygon points="45,80 85,35 125,80" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                      {/* Blue Square Windows */}
                      <rect x="58" y="95" width="16" height="16" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
                      <rect x="96" y="95" width="16" height="16" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
                      {/* Brown Door */}
                      <rect x="76" y="125" width="18" height="35" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
                      {/* Precise Tree on Right */}
                      <rect x="148" y="110" width="12" height="50" fill="#78350f" />
                      <circle cx="154" cy="95" r="24" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
                      {/* Sun in top left corner */}
                      <circle cx="28" cy="30" r="14" fill="#f59e0b" />
                    </svg>
                    <div className="mt-2 bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-lg max-w-sm">
                      ✨ <strong>Precise Match:</strong> Every shape, coordinate, and color was executed exactly as coded!
                    </div>
                  </div>
                )
              ) : (
                /* CUSTOM BUILDER OUTPUT */
                <div className="relative z-10 text-center flex flex-col items-center">
                  <svg className="w-56 h-56" viewBox="0 0 200 200">
                    <line x1="10" y1="165" x2="190" y2="165" stroke="#334155" strokeWidth="2" />
                    {/* Position offset */}
                    <g transform={`translate(${customPlacement === 'left' ? -35 : customPlacement === 'right' ? 35 : 0}, 0)`}>
                      {customSubject === 'house' && (
                        <>
                          <rect
                            x="65"
                            y="85"
                            width="70"
                            height="80"
                            fill={
                              customColor === 'yellow'
                                ? '#fde047'
                                : customColor === 'blue'
                                ? '#60a5fa'
                                : customColor === 'red'
                                ? '#f87171'
                                : '#94a3b8'
                            }
                            stroke="#334155"
                            strokeWidth="2"
                          />
                          {customRoofShape === 'triangle' && (
                            <polygon points="60,85 100,45 140,85" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
                          )}
                          {customRoofShape === 'dome' && (
                            <path d="M 65 85 Q 100 40 135 85 Z" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
                          )}
                          {customRoofShape === 'flat' && (
                            <rect x="60" y="80" width="80" height="8" fill="#475569" />
                          )}
                          {customRoofShape === 'unspecified' && (
                            <g>
                              {/* Robot Hallucinates a Propeller */}
                              <ellipse cx="100" cy="70" rx="30" ry="8" fill="#ec4899" />
                              <text x="100" y="60" fill="#f472b6" fontSize="7" textAnchor="middle">
                                [AI Guessed: Giant Spinner]
                              </text>
                            </g>
                          )}
                          {customDetails.includes('windows') && (
                            <>
                              <rect x="75" y="100" width="14" height="14" fill="#93c5fd" />
                              <rect x="111" y="100" width="14" height="14" fill="#93c5fd" />
                            </>
                          )}
                          {customDetails.includes('door') && (
                            <rect x="91" y="125" width="18" height="40" fill="#78350f" />
                          )}
                          {customDetails.includes('chimney') && (
                            <rect x="115" y="55" width="10" height="25" fill="#dc2626" />
                          )}
                        </>
                      )}

                      {customSubject === 'robot' && (
                        <>
                          <rect
                            x="75"
                            y="85"
                            width="50"
                            height="60"
                            fill={customColor === 'blue' ? '#38bdf8' : '#cbd5e1'}
                            stroke="#334155"
                            strokeWidth="2"
                            rx="6"
                          />
                          {/* Head */}
                          <rect x="82" y="50" width="36" height="30" fill="#94a3b8" rx="4" />
                          <circle cx="92" cy="62" r="4" fill="#22c55e" />
                          <circle cx="108" cy="62" r="4" fill="#22c55e" />
                          <line x1="100" y1="50" x2="100" y2="35" stroke="#f59e0b" strokeWidth="2" />
                          <circle cx="100" cy="33" r="4" fill="#f59e0b" />
                          {/* Wheels / Legs */}
                          <circle cx="85" cy="155" r="10" fill="#334155" />
                          <circle cx="115" cy="155" r="10" fill="#334155" />
                        </>
                      )}

                      {customSubject === 'rocket' && (
                        <>
                          {/* Rocket Body */}
                          <path
                            d="M 85 140 L 85 70 Q 100 30 115 70 L 115 140 Z"
                            fill={customColor === 'red' ? '#ef4444' : '#f1f5f9'}
                            stroke="#334155"
                            strokeWidth="2"
                          />
                          {/* Thruster Fins */}
                          <polygon points="85,120 65,145 85,140" fill="#dc2626" />
                          <polygon points="115,120 135,145 115,140" fill="#dc2626" />
                          {/* Window */}
                          <circle cx="100" cy="75" r="10" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                          {/* Flame */}
                          <polygon points="90,140 100,165 110,140" fill="#f59e0b" />
                        </>
                      )}

                      {customSubject === 'castle' && (
                        <>
                          <rect x="70" y="90" width="60" height="75" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                          <rect x="55" y="70" width="22" height="95" fill="#64748b" stroke="#334155" strokeWidth="2" />
                          <rect x="123" y="70" width="22" height="95" fill="#64748b" stroke="#334155" strokeWidth="2" />
                          <polygon points="55,70 66,45 77,70" fill="#dc2626" />
                          <polygon points="123,70 134,45 145,70" fill="#dc2626" />
                        </>
                      )}
                    </g>
                  </svg>
                  <div className="mt-2 text-xs text-slate-300 font-mono">
                    Placement: {customPlacement} · Color: {customColor} · Roof: {customRoofShape}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prompt Formula Execution Output */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
              Executed Prompt Text:
            </div>
            {promptMode === 'preset' ? (
              <p className="text-sm font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                {selectedPreset === 'vague'
                  ? '"Draw a house with a tree."'
                  : '"Draw a large yellow square house centered on ground. Place a red triangle roof on top. Add two blue square windows, a brown door, and a green circular tree with a brown trunk 2 inches to the right."'}
              </p>
            ) : (
              <p className="text-sm font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                {`"Draw a ${customColor !== 'unspecified' ? customColor : '[unspecified color]'} ${customSubject} in the ${customPlacement} with a ${customRoofShape !== 'unspecified' ? customRoofShape + ' roof' : '[unspecified roof]'} and details: ${customDetails.join(', ') || 'none'}."`}
              </p>
            )}
          </div>
        </div>

        {/* Right Zone: Control Deck & Physical Partner Instructions */}
        <div className="lg:col-span-5 space-y-6">
          {promptMode === 'preset' ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Compare Prompt Strategies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click each button to test how the AI generator handles vague versus precise input:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedPreset('vague')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedPreset === 'vague'
                      ? 'border-amber-400 bg-amber-50/70 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-900">Vague Prompt (6 Words)</span>
                    <span className="text-xs font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm">High Glitch Risk</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    "Draw a house with a tree."
                  </p>
                  <div className="text-xs text-amber-800 mt-2">
                    Result: Missing shapes, coordinates, and colors. The AI invents wild guesses.
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPreset('precise')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedPreset === 'precise'
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-900">The Architect Prompt (Formula-Driven)</span>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">Predictable</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    "Yellow square house, center, red triangle roof, blue windows, tree on right."
                  </p>
                  <div className="text-xs text-emerald-800 mt-2">
                    Result: 100% predictable output matching the designer’s intent!
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Custom Prompt Builder Deck */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Assemble Your Prompt
              </h3>

              {/* Step 1: Subject */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  1. Choose Subject:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['house', 'robot', 'rocket', 'castle'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setCustomSubject(sub)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg capitalize border transition-colors cursor-pointer ${
                        customSubject === sub
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Shape / Roof */}
              {customSubject === 'house' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    2. Roof Shape (leave unspecified to test AI hallucination!):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['triangle', 'dome', 'flat', 'unspecified'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setCustomRoofShape(shape)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg capitalize border transition-colors cursor-pointer ${
                          customRoofShape === shape
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {shape === 'unspecified' ? '❓ Leave Blank' : shape}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Exact Placement */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  3. Exact Placement on Canvas:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['left', 'center', 'right'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setCustomPlacement(pos)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg capitalize border transition-colors cursor-pointer ${
                        customPlacement === pos
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Details & Colors */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  4. Colors & Specific Details:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['yellow', 'blue', 'red', 'unspecified'] as const).map((col) => (
                    <button
                      key={col}
                      onClick={() => setCustomColor(col)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize border transition-colors cursor-pointer ${
                        customColor === col
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {col === 'unspecified' ? 'No color specified' : col}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customDetails.includes('windows')}
                      onChange={() => toggleDetail('windows')}
                      className="rounded-sm text-emerald-600"
                    />
                    <span>Windows</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customDetails.includes('door')}
                      onChange={() => toggleDetail('door')}
                      className="rounded-sm text-emerald-600"
                    />
                    <span>Door</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customDetails.includes('chimney')}
                      onChange={() => toggleDetail('chimney')}
                      className="rounded-sm text-emerald-600"
                    />
                    <span>Chimney</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Physical Table Hands-On Guide */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase font-mono">
                Physical Table Activity (Lego & Folder)
              </span>
              <span className="text-xs text-emerald-700 font-semibold">In-Person Mode</span>
            </div>

            <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Set up the barrier:</strong> Put the folder standing up between you and your partner.
              </li>
              <li>
                <strong>Create the secret:</strong> Prompt Engineer secretly builds a small Lego structure or draws an object.
              </li>
              <li>
                <strong>Write the code:</strong> Write step-by-step instructions on your index card using the 4-part formula.
              </li>
              <li>
                <strong>Pass the card:</strong> AI Generator builds using <em>only</em> what is written on the card (no talking or pointing!).
              </li>
              <li>
                <strong>Compare:</strong> Drop the folder! How close did the AI get?
              </li>
            </ol>

            {/* In-Person Rotation Partner Timer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {Math.floor(partnerTimer / 60)}:{(partnerTimer % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-slate-500 ml-1.5">Build Timer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPartnerTimerActive(!isPartnerTimerActive)}
                  className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md cursor-pointer"
                >
                  {isPartnerTimerActive ? 'Pause' : 'Start (2m)'}
                </button>
                <button
                  onClick={() => {
                    setIsPartnerTimerActive(false);
                    setPartnerTimer(120);
                  }}
                  className="px-2 py-1 text-xs text-slate-600 bg-slate-200 rounded-md hover:bg-slate-300 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* What It Teaches Callout */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold text-amber-900 block font-display">
              💡 What It Teaches
            </span>
            <p className="leading-relaxed">
              AI text and image generators don't "know" what you are thinking. They follow instructions literally. If your directions are vague, the AI fills in the blanks with its own guesses—which can lead to unexpected or funny errors!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
