/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PassportState } from '../types';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passport: PassportState;
  onUpdatePassport: (updated: PassportState) => void;
  onGoToStation: (stationId: 'station-1' | 'station-2' | 'station-3' | 'station-4') => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  passport,
  onUpdatePassport,
  onGoToStation,
}) => {
  if (!isOpen) return null;

  const totalStamped = [
    passport.station1Completed,
    passport.station2Completed,
    passport.station3Completed,
    passport.station4Completed,
  ].filter(Boolean).length;

  const isCompletedAll = totalStamped === 4;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Passport Header */}
        <div className="bg-slate-950 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Official School Credential
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-0.5">
              4th Grade AI Explorer Passport
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer text-lg font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Student Info Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Explorer Student Name:
              </label>
              <input
                type="text"
                value={passport.studentName}
                onChange={(e) =>
                  onUpdatePassport({ ...passport, studentName: e.target.value })
                }
                placeholder="Student Name..."
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Elementary School:
              </label>
              <input
                type="text"
                value={passport.schoolName}
                onChange={(e) =>
                  onUpdatePassport({ ...passport, schoolName: e.target.value })
                }
                placeholder="School Name..."
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* 4 Stamp Slots */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase font-mono">
                Station Badges ({totalStamped}/4 Collected)
              </span>
              <span className="text-xs font-medium text-slate-600">
                {isCompletedAll ? '🎉 All Badges Earned!' : 'Visit stations to earn stamps'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Station 1 Stamp */}
              <div
                onClick={() => {
                  if (!passport.station1Completed) {
                    onClose();
                    onGoToStation('station-1');
                  }
                }}
                className={`p-3.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  passport.station1Completed
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950'
                    : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-400'
                }`}
              >
                <div className="text-2xl mb-1">
                  {passport.station1Completed ? '🏛️' : '⭕'}
                </div>
                <div className="text-xs font-bold text-slate-800">Station 1</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Prompt Architect</div>
                {passport.station1Completed && (
                  <span className="mt-2 inline-block text-[9px] font-mono font-bold text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded-xs">
                    STAMPED
                  </span>
                )}
              </div>

              {/* Station 2 Stamp */}
              <div
                onClick={() => {
                  if (!passport.station2Completed) {
                    onClose();
                    onGoToStation('station-2');
                  }
                }}
                className={`p-3.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  passport.station2Completed
                    ? 'border-blue-500 bg-blue-50/70 text-blue-950'
                    : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-400'
                }`}
              >
                <div className="text-2xl mb-1">
                  {passport.station2Completed ? '🔍' : '⭕'}
                </div>
                <div className="text-xs font-bold text-slate-800">Station 2</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Pattern Detective</div>
                {passport.station2Completed && (
                  <span className="mt-2 inline-block text-[9px] font-mono font-bold text-blue-700 uppercase bg-blue-100 px-1.5 py-0.5 rounded-xs">
                    STAMPED
                  </span>
                )}
              </div>

              {/* Station 3 Stamp */}
              <div
                onClick={() => {
                  if (!passport.station3Completed) {
                    onClose();
                    onGoToStation('station-3');
                  }
                }}
                className={`p-3.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  passport.station3Completed
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950'
                    : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-400'
                }`}
              >
                <div className="text-2xl mb-1">
                  {passport.station3Completed ? '🕵️‍♂️' : '⭕'}
                </div>
                <div className="text-xs font-bold text-slate-800">Station 3</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Spot the Bot!</div>
                {passport.station3Completed && (
                  <span className="mt-2 inline-block text-[9px] font-mono font-bold text-amber-700 uppercase bg-amber-100 px-1.5 py-0.5 rounded-xs">
                    STAMPED
                  </span>
                )}
              </div>

              {/* Station 4 Stamp */}
              <div
                onClick={() => {
                  if (!passport.station4Completed) {
                    onClose();
                    onGoToStation('station-4');
                  }
                }}
                className={`p-3.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                  passport.station4Completed
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950'
                    : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-400'
                }`}
              >
                <div className="text-2xl mb-1">
                  {passport.station4Completed ? '🛡️' : '⭕'}
                </div>
                <div className="text-xs font-bold text-slate-800">Station 4</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Ethics Council</div>
                {passport.station4Completed && (
                  <span className="mt-2 inline-block text-[9px] font-mono font-bold text-indigo-700 uppercase bg-indigo-100 px-1.5 py-0.5 rounded-xs">
                    STAMPED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Master Certificate Banner If All 4 Completed */}
          {isCompletedAll && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-center gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                <h4 className="font-bold font-display text-base text-amber-900">
                  Certified 4th Grade AI Explorer!
                </h4>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Congratulations, {passport.studentName || 'Explorer'}! You understand how prompts work, how bias forms in machine learning, how to spot AI hallucinations, and how to practice ethical technology leadership.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>🖨️ Print Passport</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
