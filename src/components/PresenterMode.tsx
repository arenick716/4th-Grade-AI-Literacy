/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { STATIONS } from '../data/stationData';

interface PresenterModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresenterMode: React.FC<PresenterModeProps> = ({ isOpen, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen) return null;

  const currentStation = STATIONS[currentSlideIndex];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
      {/* Presenter Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800/60">
            Big Screen Smartboard Mode
          </span>
          <span className="text-sm font-semibold text-slate-400">
            4th Grade AI Literacy Night
          </span>
        </div>

        {/* Global Rotation Timer */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">
              Rotation Countdown
            </span>
            <span className="font-mono text-2xl font-extrabold text-amber-300 tabular-nums">
              {formatTime(timerSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg cursor-pointer"
            >
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(600);
              }}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
            >
              10m
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
        >
          Exit Presenter Mode [ESC]
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8 space-y-8 text-center sm:text-left">
        <div>
          <div className="font-mono text-base font-bold text-amber-400 uppercase tracking-wider mb-2">
            Station 0{currentStation.number} of 04 · {currentStation.concept}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white">
            {currentStation.title}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mt-2 font-medium">
            {currentStation.tagline}
          </p>
        </div>

        {/* Big Goal & Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-amber-400 font-bold">
              🎯 Table Mission & Goal
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              {currentStation.skillGoal}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
              💡 Core Takeaway
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              {currentStation.number === 1 &&
                'AI follows instructions literally without human common sense. If your prompt is vague, it fills blanks with guesses!'}
              {currentStation.number === 2 &&
                'Algorithms do not have feelings or personal lives; they only reflect patterns in the data humans feed them.'}
              {currentStation.number === 3 &&
                'AI predicts pixels rather than understands reality. Look for hands with extra fingers, scrambled text, and melting edges!'}
              {currentStation.number === 4 &&
                'AI is a tool, and humans are responsible for its ethical use. Always ask before uploading photos or using AI on schoolwork.'}
            </p>
          </div>
        </div>
      </div>

      {/* Slide Navigation Bottom Bar */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          {STATIONS.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                currentSlideIndex === idx
                  ? 'bg-amber-400 text-slate-950 font-display'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Station {st.number}: {st.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={currentSlideIndex === 0}
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg cursor-pointer text-slate-300"
          >
            ← Previous Station
          </button>
          <button
            disabled={currentSlideIndex === STATIONS.length - 1}
            onClick={() => setCurrentSlideIndex((prev) => Math.min(STATIONS.length - 1, prev + 1))}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg cursor-pointer text-slate-300"
          >
            Next Station →
          </button>
        </div>
      </div>
    </div>
  );
};
