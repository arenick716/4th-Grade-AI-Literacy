/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StationInfo, FamilyAgreement } from '../types';
import { DILEMMA_SCENARIOS, DEFAULT_FAMILY_RULES } from '../data/stationData';

interface Station4Props {
  station: StationInfo;
  isStamped: boolean;
  onStamp: () => void;
  onOpenPassport: () => void;
  agreement: FamilyAgreement;
  onUpdateAgreement: (updated: FamilyAgreement) => void;
}

export const Station4EthicsCouncil: React.FC<Station4Props> = ({
  station,
  isStamped,
  onStamp,
  onOpenPassport,
  agreement,
  onUpdateAgreement,
}) => {
  const [activeDilemmaIndex, setActiveDilemmaIndex] = useState<number>(0);
  const currentDilemma = DILEMMA_SCENARIOS[activeDilemmaIndex];

  // Family Voting Tally state for the current dilemma
  const [votes, setVotes] = useState<{ [id: string]: { allowed: number; notAllowed: number; depends: number } }>({});
  const [newCustomRule, setNewCustomRule] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'dilemmas' | 'agreement'>('dilemmas');

  const currentVotes = votes[currentDilemma.id] || { allowed: 0, notAllowed: 0, depends: 0 };

  const handleCastVote = (type: 'allowed' | 'notAllowed' | 'depends') => {
    setVotes((prev) => ({
      ...prev,
      [currentDilemma.id]: {
        ...currentVotes,
        [type]: currentVotes[type] + 1,
      },
    }));
  };

  const handleResetVotes = () => {
    setVotes((prev) => ({
      ...prev,
      [currentDilemma.id]: { allowed: 0, notAllowed: 0, depends: 0 },
    }));
  };

  const handleToggleRule = (rule: string) => {
    const isPresent = agreement.rules.includes(rule);
    const updatedRules = isPresent
      ? agreement.rules.filter((r) => r !== rule)
      : [...agreement.rules, rule];
    onUpdateAgreement({ ...agreement, rules: updatedRules });
  };

  const handleAddCustomRule = () => {
    if (!newCustomRule.trim()) return;
    onUpdateAgreement({
      ...agreement,
      customRules: [...agreement.customRules, newCustomRule.trim()],
    });
    setNewCustomRule('');
  };

  const handleRemoveCustomRule = (idx: number) => {
    const updated = agreement.customRules.filter((_, i) => i !== idx);
    onUpdateAgreement({ ...agreement, customRules: updated });
  };

  const handlePrintAgreementOnly = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-4">
      {/* Station Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold text-indigo-700 tracking-wider font-mono uppercase mb-1">
            Station 04 · {station.concept}
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
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {isStamped ? 'Station 4 Stamped!' : 'Stamp Station 4'}
          </button>
          <button
            onClick={onOpenPassport}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Final Passport 🏆
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('dilemmas')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'dilemmas'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Family Dilemma Card Deck ({activeDilemmaIndex + 1}/{DILEMMA_SCENARIOS.length})
        </button>
        <button
          onClick={() => setActiveTab('agreement')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'agreement'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Family AI Code of Conduct Generator 📜
        </button>
      </div>

      {activeTab === 'dilemmas' ? (
        /* Dilemmas View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: The Dilemma Card Stage */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm">
                  Dilemma #{activeDilemmaIndex + 1}
                </span>
                <span className="text-xs text-slate-500">
                  {currentDilemma.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={activeDilemmaIndex === 0}
                  onClick={() => setActiveDilemmaIndex((prev) => Math.max(0, prev - 1))}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer font-medium"
                >
                  ← Prev
                </button>
                <button
                  disabled={activeDilemmaIndex === DILEMMA_SCENARIOS.length - 1}
                  onClick={() =>
                    setActiveDilemmaIndex((prev) =>
                      Math.min(DILEMMA_SCENARIOS.length - 1, prev + 1)
                    )
                  }
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-30 cursor-pointer font-medium"
                >
                  Next →
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
                {currentDilemma.title}
              </h2>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mb-4 leading-relaxed">
                <strong>Situation:</strong> {currentDilemma.context}
              </div>
              <p className="text-base font-semibold text-slate-900 leading-snug">
                "{currentDilemma.question}"
              </p>
            </div>

            {/* Voting Arena */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase font-mono">
                  Simultaneous Family Vote:
                </span>
                <button
                  onClick={handleResetVotes}
                  className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Reset Tally
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCastVote('allowed')}
                  className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 transition-all cursor-pointer text-center group"
                >
                  <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                    👍
                  </span>
                  <span className="text-xs font-bold block">Ethical / Allowed</span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold block mt-1">
                    {currentVotes.allowed} votes
                  </span>
                </button>

                <button
                  onClick={() => handleCastVote('notAllowed')}
                  className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/70 hover:bg-rose-100 text-rose-950 transition-all cursor-pointer text-center group"
                >
                  <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                    👎
                  </span>
                  <span className="text-xs font-bold block">Unethical / Not Allowed</span>
                  <span className="text-[11px] font-mono text-rose-700 font-bold block mt-1">
                    {currentVotes.notAllowed} votes
                  </span>
                </button>

                <button
                  onClick={() => handleCastVote('depends')}
                  className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 text-amber-950 transition-all cursor-pointer text-center group"
                >
                  <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                    🫱
                  </span>
                  <span className="text-xs font-bold block">It Depends / Need Info</span>
                  <span className="text-[11px] font-mono text-amber-700 font-bold block mt-1">
                    {currentVotes.depends} votes
                  </span>
                </button>
              </div>
            </div>

            {/* Guided Perspectives Breakdown */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block font-mono uppercase">
                Ethical Angles to Debate:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-slate-600">
                <div className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <strong className="text-emerald-900 block mb-0.5">When it works:</strong>
                  {currentDilemma.suggestedAnswers.allowed}
                </div>
                <div className="p-2.5 bg-rose-50/50 rounded-lg border border-rose-100">
                  <strong className="text-rose-900 block mb-0.5">The Red Flag:</strong>
                  {currentDilemma.suggestedAnswers.notAllowed}
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-100">
                  <strong className="text-amber-900 block mb-0.5">The Nuance:</strong>
                  {currentDilemma.suggestedAnswers.itDepends}
                </div>
              </div>
            </div>
          </div>

          {/* Right Zone: Parent Spark & Fast Jump */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 uppercase font-mono">
                  Parent & Guardian Discussion Spark
                </span>
                <span className="text-xs text-indigo-700 font-medium">Family Tip</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                {currentDilemma.parentTip}
              </p>
              <div className="pt-3 border-t border-indigo-200/80 text-xs text-indigo-900/80">
                Ask your 4th grader: "If you were the teacher or friend in this situation, how would you feel?"
              </div>
            </div>

            {/* Quick Card List Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase font-mono block mb-2">
                All 6 Dilemmas in the Deck:
              </span>
              <div className="space-y-1.5">
                {DILEMMA_SCENARIOS.map((dil, idx) => (
                  <button
                    key={dil.id}
                    onClick={() => setActiveDilemmaIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      activeDilemmaIndex === idx
                        ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>
                      {idx + 1}. {dil.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {dil.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase font-bold">
                Next Step:
              </div>
              <h4 className="font-bold text-sm font-display">
                Create Your Family AI Agreement!
              </h4>
              <p className="text-xs text-slate-300">
                Once your family has debated a few dilemmas, click the "Code of Conduct Generator" tab to create your home agreement card to hang on the fridge.
              </p>
              <button
                onClick={() => setActiveTab('agreement')}
                className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Go to Family Agreement Builder →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Family AI Code of Conduct Generator View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: Agreement Configurator */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Customize Your Family AI Rules
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Check the core rules that fit your household, add your own custom rules, and type your family signatures below.
              </p>
            </div>

            {/* Family & Signer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Family Name:
                </label>
                <input
                  type="text"
                  value={agreement.familyName}
                  onChange={(e) =>
                    onUpdateAgreement({ ...agreement, familyName: e.target.value })
                  }
                  placeholder="e.g. The Taylor Family"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Student Name (4th Grader):
                </label>
                <input
                  type="text"
                  value={agreement.signatureStudent}
                  onChange={(e) =>
                    onUpdateAgreement({ ...agreement, signatureStudent: e.target.value })
                  }
                  placeholder="e.g. Maya Taylor"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Parent / Guardian Name:
                </label>
                <input
                  type="text"
                  value={agreement.signatureParent}
                  onChange={(e) =>
                    onUpdateAgreement({ ...agreement, signatureParent: e.target.value })
                  }
                  placeholder="e.g. Sarah Taylor"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Agreement Date:
                </label>
                <input
                  type="text"
                  value={agreement.date}
                  onChange={(e) =>
                    onUpdateAgreement({ ...agreement, date: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Core Rules Checkboxes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase font-mono block">
                Select Household AI Rules:
              </label>
              <div className="space-y-2">
                {DEFAULT_FAMILY_RULES.map((rule, idx) => {
                  const isChecked = agreement.rules.includes(rule);
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-indigo-300 bg-indigo-50/50 text-indigo-950 font-medium'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleRule(rule)}
                        className="mt-0.5 rounded-sm text-indigo-600 cursor-pointer"
                      />
                      <span>{rule}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Family Rule */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 uppercase font-mono block">
                Add a Custom Family Rule:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCustomRule}
                  onChange={(e) => setNewCustomRule(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomRule()}
                  placeholder="e.g. Only use AI at the kitchen counter, not in bedrooms"
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddCustomRule}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Add Rule
                </button>
              </div>

              {agreement.customRules.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  {agreement.customRules.map((cr, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-indigo-50 p-2 rounded-md text-xs text-indigo-900 border border-indigo-200"
                    >
                      <span>★ {cr}</span>
                      <button
                        onClick={() => handleRemoveCustomRule(idx)}
                        className="text-slate-400 hover:text-red-500 font-bold px-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Zone: Live Certificate Fridge Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase font-mono">
                Refrigerator Pledge Preview:
              </span>
              <button
                onClick={handlePrintAgreementOnly}
                className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🖨️ Print Fridge Certificate</span>
              </button>
            </div>

            {/* Printable Fridge Card Layout */}
            <div
              id="family-ai-pledge-card"
              className="bg-white border-4 border-double border-indigo-300 rounded-2xl p-6 sm:p-8 shadow-md text-slate-900 relative overflow-hidden"
            >
              {/* Corner Emblems */}
              <div className="absolute top-2 left-2 text-xs font-mono text-indigo-400 font-bold">
                [4TH GRADE AI ETHICS]
              </div>
              <div className="absolute top-2 right-2 text-xs font-mono text-indigo-400 font-bold">
                [OATH & CODE]
              </div>

              <div className="text-center mt-2 mb-6">
                <span className="text-2xl mb-1 block">🛡️</span>
                <h3 className="text-2xl font-bold font-display text-indigo-950">
                  {agreement.familyName || 'Our Family'}'s AI Code of Conduct
                </h3>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  Adopted at 4th Grade AI Literacy Night · {agreement.date}
                </p>
              </div>

              <div className="space-y-2 mb-6 text-xs text-slate-800">
                <p className="font-semibold text-slate-900 text-center italic mb-3">
                  "We believe artificial intelligence is a powerful tool. We promise to use it with honesty, kindness, and caution."
                </p>
                {agreement.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">✓</span>
                    <span className="leading-tight">{rule}</span>
                  </div>
                ))}
                {agreement.customRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 font-medium text-indigo-900">
                    <span className="text-indigo-600 font-bold">★</span>
                    <span className="leading-tight">{rule}</span>
                  </div>
                ))}
              </div>

              {/* Signatures */}
              <div className="pt-4 border-t-2 border-dashed border-indigo-200 grid grid-cols-2 gap-6 text-xs">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-mono mb-1">
                    Student Pledge:
                  </div>
                  <div className="font-serif italic text-base text-indigo-900 min-h-6 border-b border-slate-300">
                    {agreement.signatureStudent || '____________________'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">4th Grade AI Explorer</div>
                </div>

                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-mono mb-1">
                    Parent / Guardian:
                  </div>
                  <div className="font-serif italic text-base text-indigo-900 min-h-6 border-b border-slate-300">
                    {agreement.signatureParent || '____________________'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Family Tech Partner</div>
                </div>
              </div>
            </div>

            {/* What It Teaches Callout */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1">
              <span className="font-bold text-indigo-900 block font-display">
                💡 What It Teaches
              </span>
              <p className="leading-relaxed">
                Technology is a tool, and humans are responsible for how it is used. Discussing guidelines around privacy, academic integrity, and permission helps ensure AI is used safely and ethically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
