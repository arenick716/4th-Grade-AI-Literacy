/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StationId, PassportState } from '../types';
import { STATIONS } from '../data/stationData';

interface HeroOverviewProps {
  onSelectStation: (station: StationId) => void;
  onOpenPassport: () => void;
  onOpenPrintKit: () => void;
  passport: PassportState;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({
  onSelectStation,
  onOpenPassport,
  onOpenPrintKit,
  passport,
}) => {
  // Station rotation timer (default 10 minutes = 600s)
  const [timerSeconds, setTimerSeconds] = useState<number>(600);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(600);

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

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleResetTimer = (duration: number = selectedDuration) => {
    setIsTimerRunning(false);
    setTimerSeconds(duration);
    setSelectedDuration(duration);
  };

  const completedCount = [
    passport.station1Completed,
    passport.station2Completed,
    passport.station3Completed,
    passport.station4Completed,
  ].filter(Boolean).length;

  return (
    <div className="space-y-10 py-6">
      {/* Hero Visual Banner & Welcome */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Elementary STEM & Digital Citizenship</span>
                <span aria-hidden="true">·</span>
                <span>Family Learning Event</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance font-display mb-4">
                Welcome to 4th Grade AI Literacy Night!
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
                Tonight, students and families become AI architects, data detectives, and ethics leaders.
                Explore hands-on stations to discover how artificial intelligence generates ideas, how machine learning spots patterns, where it makes silly glitches, and how to make thoughtful family rules.
              </p>
            </div>

            {/* Quick Passport Status Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-slate-500">Your Family Passport Progress</div>
                <div className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <span>{completedCount} of 4 Stations Completed</span>
                  {completedCount === 4 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                      Master AI Explorer!
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPassport}
                  className="px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                >
                  View Passport & Stamping Book
                </button>
                <button
                  onClick={onOpenPrintKit}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  Print Station Sheets
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-64 sm:min-h-80 bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
            <img
              src="/src/assets/images/hero_ai_literacy_night_1790642687056.jpg"
              alt="4th Grade AI Literacy Night with students, robot mascot, and learning stations"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
              4 Interactive Stations · Hands-On Exploration · For Students & Families
            </div>
          </div>
        </div>
      </section>

      {/* Rotation Timer & Station Schedule Guide */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-mono tracking-wider text-amber-400 uppercase">
            Station Rotation Timer
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
            Keep the Night Moving!
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Each station takes roughly 10–12 minutes. When the rotation timer chimes, trade roles or rotate to the next table!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div className="text-center sm:text-right">
            <div className="font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-wider">
              {formatTime(timerSeconds)}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {isTimerRunning ? 'Rotation in progress' : timerSeconds === 0 ? 'Time to rotate!' : 'Paused'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                isTimerRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
            </button>
            <button
              onClick={() => handleResetTimer(600)}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
            >
              Reset 10m
            </button>
            <button
              onClick={() => handleResetTimer(900)}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer"
            >
              15m
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Stations Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
            The 4 Learning Stations
          </h2>
          <p className="text-sm text-slate-500">
            Click any station to enter its interactive digital sandbox, physical table rules, and student activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STATIONS.map((st) => {
            const isCompleted =
              st.id === 'station-1'
                ? passport.station1Completed
                : st.id === 'station-2'
                ? passport.station2Completed
                : st.id === 'station-3'
                ? passport.station3Completed
                : passport.station4Completed;

            return (
              <div
                key={st.id}
                className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Station 0{st.number}
                    </div>
                    {isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Stamped in Passport
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Ready to explore</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display mb-1">
                    {st.title}
                  </h3>

                  <div className="text-xs font-semibold text-slate-700 mb-3">
                    {st.concept}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {st.skillGoal}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium italic">
                    {st.tagline}
                  </span>
                  <button
                    onClick={() => onSelectStation(st.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Enter Station {st.number} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works for Families Callout */}
      <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-amber-900 font-display mb-2">
          Family Guide: How to Rotate & Learn Together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-amber-950 mt-4">
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60">
            <div className="font-bold text-amber-900 mb-1">1. Take Turns in Pairs</div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Every station is designed for partner play! One person acts as the human (User/Trainer) and the partner acts as the AI (Robot/Model), then switch.
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60">
            <div className="font-bold text-amber-900 mb-1">2. Try Both Digital & Physical</div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Use physical blocks, index cards, and magnifying glasses on the table, or use this digital companion to run simulations and tests!
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-amber-200/60">
            <div className="font-bold text-amber-900 mb-1">3. Collect All 4 Stamps</div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Complete the quick check for each station to stamp your passport. Take home your signed Family AI Agreement at the end!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
