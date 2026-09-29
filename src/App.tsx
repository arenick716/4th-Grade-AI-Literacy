/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StationId, PassportState, FamilyAgreement } from './types';
import { STATIONS, DEFAULT_FAMILY_RULES } from './data/stationData';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { Station1PromptArchitect } from './components/Station1PromptArchitect';
import { Station2PatternDetective } from './components/Station2PatternDetective';
import { Station3SpotTheBot } from './components/Station3SpotTheBot';
import { Station4EthicsCouncil } from './components/Station4EthicsCouncil';
import { PassportModal } from './components/PassportModal';
import { PrintableKit } from './components/PrintableKit';
import { PresenterMode } from './components/PresenterMode';

const DEFAULT_PASSPORT: PassportState = {
  station1Completed: false,
  station2Completed: false,
  station3Completed: false,
  station4Completed: false,
  studentName: '',
  schoolName: 'Elementary School',
};

const DEFAULT_AGREEMENT: FamilyAgreement = {
  familyName: 'Our Family',
  rules: [
    DEFAULT_FAMILY_RULES[0],
    DEFAULT_FAMILY_RULES[1],
    DEFAULT_FAMILY_RULES[2],
    DEFAULT_FAMILY_RULES[3],
    DEFAULT_FAMILY_RULES[4],
  ],
  customRules: [],
  signatureParent: '',
  signatureStudent: '',
  date: 'Tonight',
};

// Simple clean chime audio using Web Audio API (zero external assets)
const playChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Ignore audio context autoplay restrictions
  }
};

export default function App() {
  const [activeStation, setActiveStation] = useState<StationId | 'overview'>('overview');
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isPrintKitOpen, setIsPrintKitOpen] = useState(false);
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);

  // Persistence in localStorage
  const [passport, setPassport] = useState<PassportState>(() => {
    try {
      const saved = localStorage.getItem('ai_night_passport');
      return saved ? JSON.parse(saved) : DEFAULT_PASSPORT;
    } catch {
      return DEFAULT_PASSPORT;
    }
  });

  const [agreement, setAgreement] = useState<FamilyAgreement>(() => {
    try {
      const saved = localStorage.getItem('ai_night_agreement');
      return saved ? JSON.parse(saved) : DEFAULT_AGREEMENT;
    } catch {
      return DEFAULT_AGREEMENT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ai_night_passport', JSON.stringify(passport));
    } catch {
      // Storage unavailable
    }
  }, [passport]);

  useEffect(() => {
    try {
      localStorage.setItem('ai_night_agreement', JSON.stringify(agreement));
    } catch {
      // Storage unavailable
    }
  }, [agreement]);

  const handleStampStation = (stationKey: 'station1Completed' | 'station2Completed' | 'station3Completed' | 'station4Completed') => {
    setPassport((prev) => ({
      ...prev,
      [stationKey]: true,
    }));
    playChime();
  };

  const completedCount = [
    passport.station1Completed,
    passport.station2Completed,
    passport.station3Completed,
    passport.station4Completed,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-amber-200">
      {/* 3-Zone Header Contract */}
      <Header
        activeStation={activeStation}
        onSelectStation={(s) => setActiveStation(s)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenPrintKit={() => setIsPrintKitOpen(true)}
        onTogglePresenter={() => setIsPresenterOpen(true)}
        completedCount={completedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {activeStation === 'overview' && (
          <HeroOverview
            onSelectStation={(stId) => setActiveStation(stId)}
            onOpenPassport={() => setIsPassportOpen(true)}
            onOpenPrintKit={() => setIsPrintKitOpen(true)}
            passport={passport}
          />
        )}

        {activeStation === 'station-1' && (
          <Station1PromptArchitect
            station={STATIONS[0]}
            isStamped={passport.station1Completed}
            onStamp={() => handleStampStation('station1Completed')}
            onNextStation={() => setActiveStation('station-2')}
          />
        )}

        {activeStation === 'station-2' && (
          <Station2PatternDetective
            station={STATIONS[1]}
            isStamped={passport.station2Completed}
            onStamp={() => handleStampStation('station2Completed')}
            onNextStation={() => setActiveStation('station-3')}
          />
        )}

        {activeStation === 'station-3' && (
          <Station3SpotTheBot
            station={STATIONS[2]}
            isStamped={passport.station3Completed}
            onStamp={() => handleStampStation('station3Completed')}
            onNextStation={() => setActiveStation('station-4')}
          />
        )}

        {activeStation === 'station-4' && (
          <Station4EthicsCouncil
            station={STATIONS[3]}
            isStamped={passport.station4Completed}
            onStamp={() => handleStampStation('station4Completed')}
            onOpenPassport={() => setIsPassportOpen(true)}
            agreement={agreement}
            onUpdateAgreement={setAgreement}
          />
        )}
      </main>

      {/* Clean Unboxed Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">4th Grade AI Literacy Night</span>
            <span aria-hidden="true">·</span>
            <span>Elementary STEM & Digital Citizenship</span>
            <span aria-hidden="true">·</span>
            <span>Family Activity Kit</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrintKitOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Print Table Signs & Sheets
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsPassportOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Explorer Passport ({completedCount}/4)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Fullscreen Overlays */}
      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        passport={passport}
        onUpdatePassport={setPassport}
        onGoToStation={(stId) => {
          setIsPassportOpen(false);
          setActiveStation(stId);
        }}
      />

      <PrintableKit
        isOpen={isPrintKitOpen}
        onClose={() => setIsPrintKitOpen(false)}
      />

      <PresenterMode
        isOpen={isPresenterOpen}
        onClose={() => setIsPresenterOpen(false)}
      />
    </div>
  );
}
