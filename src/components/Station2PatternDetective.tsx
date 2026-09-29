/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StationInfo, TrainingCard } from '../types';
import { TRAINING_CARDS_DATA, ML_SECRET_RULES } from '../data/stationData';

interface Station2Props {
  station: StationInfo;
  isStamped: boolean;
  onStamp: () => void;
  onNextStation: () => void;
}

export const Station2PatternDetective: React.FC<Station2Props> = ({
  station,
  isStamped,
  onStamp,
  onNextStation,
}) => {
  // Current active rule
  const [selectedRuleId, setSelectedRuleId] = useState<string>('four-legs');
  const currentRule = ML_SECRET_RULES.find((r) => r.id === selectedRuleId) || ML_SECRET_RULES[0];

  // Trays state
  const [trayA, setTrayA] = useState<string[]>(currentRule.recommendedPositive);
  const [trayB, setTrayB] = useState<string[]>(currentRule.recommendedNegative);

  // Model Training & Testing state
  const [isTrained, setIsTrained] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ [cardId: string]: boolean }>({});
  const [selectedRole, setSelectedRole] = useState<'trainer' | 'model'>('trainer');

  const handleSelectRule = (ruleId: string) => {
    setSelectedRuleId(ruleId);
    const rule = ML_SECRET_RULES.find((r) => r.id === ruleId) || ML_SECRET_RULES[0];
    setTrayA(rule.recommendedPositive);
    setTrayB(rule.recommendedNegative);
    setIsTrained(false);
    setTestResults({});
  };

  const handleTrainModel = () => {
    setIsTrained(true);
    // Automatically evaluate test batch based on training rule
    const results: { [cardId: string]: boolean } = {};
    currentRule.testBatch.forEach((tb) => {
      const card = TRAINING_CARDS_DATA.find((c) => c.id === tb.cardId);
      if (card) {
        results[tb.cardId] = currentRule.matcher(card);
      }
    });
    setTestResults(results);
  };

  const removeCardFromTray = (cardId: string, tray: 'A' | 'B') => {
    if (tray === 'A') {
      setTrayA((prev) => prev.filter((id) => id !== cardId));
    } else {
      setTrayB((prev) => prev.filter((id) => id !== cardId));
    }
    setIsTrained(false);
  };

  const addCardToTray = (cardId: string, tray: 'A' | 'B') => {
    // Ensure card is not already in either tray
    if (trayA.includes(cardId) || trayB.includes(cardId)) return;
    if (tray === 'A' && trayA.length < 5) {
      setTrayA((prev) => [...prev, cardId]);
    } else if (tray === 'B' && trayB.length < 5) {
      setTrayB((prev) => [...prev, cardId]);
    }
    setIsTrained(false);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Station Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold text-blue-700 tracking-wider font-mono uppercase mb-1">
            Station 02 · {station.concept}
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
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {isStamped ? 'Station 2 Stamped!' : 'Stamp Station 2'}
          </button>
          <button
            onClick={onNextStation}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Station 3 →
          </button>
        </div>
      </div>

      {/* Role Picker Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
        <div className="flex items-center gap-2 text-xs text-blue-900">
          <span className="font-bold">Choose In-Person Role:</span>
          <span className="text-blue-700">Switch halfway through so everyone trains and tests!</span>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-blue-200/80">
          <button
            onClick={() => setSelectedRole('trainer')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedRole === 'trainer'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Role 1: Data Trainer
          </button>
          <button
            onClick={() => setSelectedRole('model')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              selectedRole === 'model'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Role 2: Machine Learning Model
          </button>
        </div>
      </div>

      {/* Rule Selection Segmented Control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm font-display">
              Step 1: Choose or Set the Secret Pattern Rule
            </h3>
            <span className="text-xs text-slate-500">
              Notice the difference between objective physical rules versus subjective human opinion rules.
            </span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-600">
            {currentRule.type === 'objective' ? '📐 Objective Fact' : '💭 Human Opinion / Bias'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ML_SECRET_RULES.map((rule) => (
            <button
              key={rule.id}
              onClick={() => handleSelectRule(rule.id)}
              className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                selectedRuleId === rule.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="font-bold text-slate-900 mb-1">{rule.name}</div>
              <div className="text-slate-500 line-clamp-2 leading-relaxed text-xs">
                {rule.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Educational Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Interactive Training Trays (Tray A & Tray B) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Step 2: Load the Training Trays
                </h3>
                <span className="text-xs text-slate-500">
                  The model only knows what is inside Tray A and Tray B!
                </span>
              </div>
              <button
                onClick={handleTrainModel}
                disabled={trayA.length === 0}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {isTrained ? 'Retrain Model ⚡' : 'Train Model Now ⚡'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tray A: Positive Training Data */}
              <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      A
                    </span>
                    <span className="text-xs font-bold text-emerald-950 uppercase font-mono">
                      Tray A (Matches Rule)
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-mono tabular-nums">
                    {trayA.length} cards
                  </span>
                </div>

                <div className="min-h-36 space-y-2">
                  {trayA.map((cardId) => {
                    const card = TRAINING_CARDS_DATA.find((c) => c.id === cardId);
                    if (!card) return null;
                    return (
                      <div
                        key={card.id}
                        className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs text-xs"
                      >
                        <span className="flex items-center gap-2 font-medium text-slate-800">
                          <span className="text-base">{card.icon}</span>
                          <span>{card.name}</span>
                        </span>
                        <button
                          onClick={() => removeCardFromTray(card.id, 'A')}
                          className="text-slate-400 hover:text-red-500 font-bold px-1.5 cursor-pointer"
                          title="Remove card"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  Positive examples: The AI learns that these represent "True".
                </div>
              </div>

              {/* Tray B: Negative Training Data */}
              <div className="rounded-xl border-2 border-rose-300 bg-rose-50/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                      B
                    </span>
                    <span className="text-xs font-bold text-rose-950 uppercase font-mono">
                      Tray B (Does Not Match)
                    </span>
                  </div>
                  <span className="text-xs text-rose-700 font-mono tabular-nums">
                    {trayB.length} cards
                  </span>
                </div>

                <div className="min-h-36 space-y-2">
                  {trayB.map((cardId) => {
                    const card = TRAINING_CARDS_DATA.find((c) => c.id === cardId);
                    if (!card) return null;
                    return (
                      <div
                        key={card.id}
                        className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-rose-200 shadow-2xs text-xs"
                      >
                        <span className="flex items-center gap-2 font-medium text-slate-800">
                          <span className="text-base">{card.icon}</span>
                          <span>{card.name}</span>
                        </span>
                        <button
                          onClick={() => removeCardFromTray(card.id, 'B')}
                          className="text-slate-400 hover:text-red-500 font-bold px-1.5 cursor-pointer"
                          title="Remove card"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[11px] text-rose-800 font-medium">
                  Negative examples: The AI learns that these represent "False".
                </div>
              </div>
            </div>

            {/* Quick Card Bank to Add Items */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Available Card Bank (Click to add to Tray A or Tray B):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
                {TRAINING_CARDS_DATA.filter(
                  (c) => !trayA.includes(c.id) && !trayB.includes(c.id)
                ).map((card) => (
                  <div
                    key={card.id}
                    className="flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs px-2.5 py-1 rounded-md"
                  >
                    <span>{card.icon}</span>
                    <span className="max-w-[100px] truncate">{card.name}</span>
                    <button
                      onClick={() => addCardToTray(card.id, 'A')}
                      className="ml-1 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-sm hover:bg-emerald-700 font-bold cursor-pointer"
                      title="Add to Tray A"
                    >
                      +A
                    </button>
                    <button
                      onClick={() => addCardToTray(card.id, 'B')}
                      className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded-sm hover:bg-rose-700 font-bold cursor-pointer"
                      title="Add to Tray B"
                    >
                      +B
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testing Phase: Feed Unseen Test Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Step 3: Test the Model on Unseen Cards!
                </h3>
                <span className="text-xs text-slate-500">
                  Can the algorithm generalize or does it make biased mistakes?
                </span>
              </div>
              {!isTrained && (
                <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm font-medium">
                  Click 'Train Model Now' first
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentRule.testBatch.map((tb, idx) => {
                const card = TRAINING_CARDS_DATA.find((c) => c.id === tb.cardId);
                if (!card) return null;
                const prediction = isTrained ? testResults[tb.cardId] : undefined;

                return (
                  <div
                    key={tb.cardId}
                    className={`p-3.5 rounded-xl border text-xs transition-all ${
                      prediction === true
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : prediction === false
                        ? 'border-rose-300 bg-rose-50/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-slate-400 text-[10px] uppercase">
                        Test Item #{idx + 1}
                      </span>
                      {prediction !== undefined && (
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                            prediction
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {prediction ? 'Sorted into Tray A' : 'Sorted into Tray B'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
                      <span className="text-2xl">{card.icon}</span>
                      <span>{card.name}</span>
                    </div>

                    <p className="text-[11px] text-slate-600 italic leading-relaxed">
                      💡 {tb.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Zone: Spot the Bias Breakdown & Physical Activity Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Spot the Bias Educational Reveal */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase font-mono">
                Spot the Bias Revelation
              </span>
              <span className="text-xs font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm">
                Key Lesson
              </span>
            </div>

            <h3 className="font-bold text-amber-950 text-base font-display">
              How Human Choices Create "Algorithmic Bias"
            </h3>

            <p className="text-xs text-amber-950 leading-relaxed">
              If your training data only contains dogs and cats for "living animals", the model might think all animals have fur and 4 legs! When you show it a fish or penguin, it gets confused.
            </p>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1.5">
              <div className="font-bold text-amber-900">Real-World AI Connection:</div>
              <p className="leading-relaxed">
                If engineers train facial recognition using only photos of adults with light skin tones, the camera will fail on kids or darker skin tones. AI only knows the data humans give it!
              </p>
            </div>
          </div>

          {/* Physical Table Hands-On Instructions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase font-mono block">
              Physical Table Activity Steps:
            </span>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Assign Roles:</strong> One person is the Data Trainer; the other is the Machine Learning Model.
              </li>
              <li>
                <strong>Set Secret Rule:</strong> The Trainer picks a secret rule in their head (e.g. "Things that are green" or "Best breakfast").
              </li>
              <li>
                <strong>Fill the Trays:</strong> Place 4 matching cards in Tray A and 4 non-matching cards in Tray B.
              </li>
              <li>
                <strong>Test the Model:</strong> The Model examines the trays and tries to sort 3 new test cards without knowing the rule!
              </li>
              <li>
                <strong>Spot the Bias:</strong> Switch to an opinion rule. Did the Model agree with your definition of "Fun"?
              </li>
            </ol>
          </div>

          {/* What It Teaches Callout */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1">
            <span className="font-bold text-blue-900 block font-display">
              💡 What It Teaches
            </span>
            <p className="leading-relaxed">
              Machine learning algorithms do not have personal experiences; they only know what is in their training data. If the data is incomplete, outdated, or based on personal opinions, the AI learns and repeats those exact biases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
