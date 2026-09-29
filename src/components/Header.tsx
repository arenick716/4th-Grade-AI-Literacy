/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StationId } from '../types';

interface HeaderProps {
  activeStation: StationId | 'overview';
  onSelectStation: (station: StationId | 'overview') => void;
  onOpenPassport: () => void;
  onOpenPrintKit: () => void;
  onTogglePresenter: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeStation,
  onSelectStation,
  onOpenPassport,
  onOpenPrintKit,
  onTogglePresenter,
  completedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectStation('overview')}
          className="text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors font-display">
            4th Grade AI Literacy Night
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectStation('station-1')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeStation === 'station-1'
                ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-500'
                : ''
            }`}
          >
            1. Prompt Architect
          </button>
          <button
            onClick={() => onSelectStation('station-2')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeStation === 'station-2'
                ? 'text-blue-700 font-semibold underline underline-offset-8 decoration-2 decoration-blue-500'
                : ''
            }`}
          >
            2. Pattern Detective
          </button>
          <button
            onClick={() => onSelectStation('station-3')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeStation === 'station-3'
                ? 'text-amber-700 font-semibold underline underline-offset-8 decoration-2 decoration-amber-500'
                : ''
            }`}
          >
            3. Spot the Bot!
          </button>
          <button
            onClick={() => onSelectStation('station-4')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeStation === 'station-4'
                ? 'text-indigo-700 font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                : ''
            }`}
          >
            4. Ethics Council
          </button>
          <button
            onClick={onOpenPassport}
            className="transition-colors hover:text-slate-900 cursor-pointer flex items-center gap-1.5"
          >
            <span>Passport</span>
            <span className="font-mono text-xs tabular-nums text-slate-500">
              ({completedCount}/4)
            </span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenPrintKit}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Print printable signage, checklists, and index cards for physical stations"
          >
            Print Station Kit
          </button>
          <button
            onClick={onTogglePresenter}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            title="Full-screen presenter view for cafeteria smartboards or classroom projectors"
          >
            Presenter Mode
          </button>
        </div>
      </div>
    </header>
  );
};
