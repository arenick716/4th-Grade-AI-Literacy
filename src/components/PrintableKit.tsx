/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STATIONS, DILEMMA_SCENARIOS, DEFAULT_FAMILY_RULES } from '../data/stationData';

interface PrintableKitProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableKit: React.FC<PrintableKitProps> = ({ isOpen, onClose }) => {
  const [filterSection, setFilterSection] = useState<'all' | 'signs' | 'worksheets' | 'agreement'>('all');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar */}
        <div className="no-print bg-slate-950 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Event Coordinator & Teacher Resource
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              Printable Station Kits & Worksheets
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>🖨️ Print to Paper / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Filter Bar (no-print) */}
        <div className="no-print px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-500 uppercase font-mono mr-2">
            View Section:
          </span>
          <button
            onClick={() => setFilterSection('all')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              filterSection === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Materials
          </button>
          <button
            onClick={() => setFilterSection('signs')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              filterSection === 'signs'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Table Signs (Stations 1–4)
          </button>
          <button
            onClick={() => setFilterSection('worksheets')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              filterSection === 'worksheets'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Activity Sheets & Checklists
          </button>
          <button
            onClick={() => setFilterSection('agreement')}
            className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
              filterSection === 'agreement'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Family AI Agreement Card
          </button>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-12 text-slate-900 bg-white">
          {/* STATION 1 TABLE SIGN */}
          {(filterSection === 'all' || filterSection === 'signs') && (
            <div className="page-break-before border-4 border-slate-900 p-8 rounded-2xl space-y-6">
              <div className="border-b-4 border-slate-900 pb-4 text-center">
                <div className="font-mono text-sm uppercase tracking-widest font-bold text-slate-600">
                  4th Grade AI Literacy Night · Table Sign
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight font-display mt-1">
                  STATION 1: THE PROMPT ARCHITECT
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Core Concept: Generative AI & Prompt Engineering · Skill Goal: Precise Procedural Communication
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-1">
                  🎯 Your Goal:
                </h3>
                <p className="text-sm leading-relaxed text-slate-800">
                  Work in pairs to build or draw a hidden creation using clear, step-by-step instructions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-3">
                  🛠️ How to Play:
                </h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-slate-800 leading-relaxed">
                  <li>
                    <strong>Set Up the Barrier:</strong> Place the folder divider between you and your partner. One person is the Prompt Engineer (User), and the other is the AI Generator (Robot).
                  </li>
                  <li>
                    <strong>Create the Secret:</strong> The Prompt Engineer secretly builds a small Lego structure or draws a simple image behind the barrier.
                  </li>
                  <li>
                    <strong>Write the Prompt:</strong> The Prompt Engineer writes down step-by-step instructions on an index card. Use the Prompt Formula:
                    <div className="mt-1.5 p-2 bg-slate-50 border border-slate-300 rounded-md font-mono text-xs font-bold text-center">
                      Subject + Specific Shapes/Sizes + Exact Placement + Details
                    </div>
                  </li>
                  <li>
                    <strong>Run the Code:</strong> Pass the card to the AI Generator. The AI must draw or build using <em>only</em> what is written on the card—no speaking or pointing allowed!
                  </li>
                  <li>
                    <strong>Compare:</strong> Remove the divider! How close was the AI’s creation to the original design?
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl">
                <h4 className="font-bold text-xs uppercase font-mono text-slate-900 mb-1">
                  💡 What It Teaches:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  AI text and image generators don't "know" what you are thinking. They follow instructions literally. If your directions are vague, the AI fills in the blanks with its own guesses—which can lead to unexpected or funny errors!
                </p>
              </div>
            </div>
          )}

          {/* STATION 2 TABLE SIGN */}
          {(filterSection === 'all' || filterSection === 'signs') && (
            <div className="page-break-before border-4 border-slate-900 p-8 rounded-2xl space-y-6">
              <div className="border-b-4 border-slate-900 pb-4 text-center">
                <div className="font-mono text-sm uppercase tracking-widest font-bold text-slate-600">
                  4th Grade AI Literacy Night · Table Sign
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight font-display mt-1">
                  STATION 2: PATTERN DETECTIVE
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Core Concept: Machine Learning & Algorithmic Bias · Skill Goal: Understand Datasets & Opinions
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-1">
                  🎯 Your Goal:
                </h3>
                <p className="text-sm leading-relaxed text-slate-800">
                  Train an "algorithm" to recognize secret patterns, then discover how missing data or personal opinions change the results.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-3">
                  🛠️ How to Play:
                </h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-slate-800 leading-relaxed">
                  <li>
                    <strong>Assign Roles:</strong> One person is the Data Trainer, and one person is the Machine Learning Model.
                  </li>
                  <li>
                    <strong>Set a Secret Rule:</strong> The Data Trainer secretly chooses a rule (e.g., "Things with four legs" or "Fun weekend activities").
                  </li>
                  <li>
                    <strong>Load the Training Data:</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                      <li>Place 4 matching item cards into Tray A (Positive Training Data).</li>
                      <li>Place 4 non-matching cards into Tray B (Negative Training Data).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Test the Model:</strong> The Machine Learning Model inspects the trays and attempts to correctly sort 3 new "test cards" based on the patterns they see.
                  </li>
                  <li>
                    <strong>Spot the Bias:</strong> Switch to an opinion-based rule (e.g., "Best foods"). Notice how your partner sorts items differently based on their own preferences!
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl">
                <h4 className="font-bold text-xs uppercase font-mono text-slate-900 mb-1">
                  💡 What It Teaches:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Machine learning algorithms do not have personal experiences; they only know what is in their training data. If the data is incomplete, outdated, or based on personal opinions, the AI learns and repeats those exact biases.
                </p>
              </div>
            </div>
          )}

          {/* STATION 3 TABLE SIGN */}
          {(filterSection === 'all' || filterSection === 'signs') && (
            <div className="page-break-before border-4 border-slate-900 p-8 rounded-2xl space-y-6">
              <div className="border-b-4 border-slate-900 pb-4 text-center">
                <div className="font-mono text-sm uppercase tracking-widest font-bold text-slate-600">
                  4th Grade AI Literacy Night · Table Sign
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight font-display mt-1">
                  STATION 3: SPOT THE BOT!
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Core Concept: Media Literacy & AI Hallucinations · Skill Goal: Inspect Synthetic Media Critically
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-1">
                  🎯 Your Goal:
                </h3>
                <p className="text-sm leading-relaxed text-slate-800">
                  Examine gallery images with a magnifying glass, spot AI errors ("hallucinations"), and separate real photos from synthetic ones.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-3">
                  🛠️ How to Play:
                </h3>
                <ol className="text-sm space-y-2.5 list-decimal list-inside text-slate-800 leading-relaxed">
                  <li>
                    <strong>Grab Your Gear:</strong> Pick up a magnifying glass and an Investigation Checklist.
                  </li>
                  <li>
                    <strong>Inspect the Gallery:</strong> Examine each image using the 3-Point AI Test:
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 ml-4">
                      <div className="p-2 border border-slate-300 rounded bg-white text-xs">
                        <strong>🖐️ Anatomy & Symmetry:</strong> Fingers, teeth, pupils, background people.
                      </div>
                      <div className="p-2 border border-slate-300 rounded bg-white text-xs">
                        <strong>🔤 Text & Logic:</strong> Background signs, scrambled letters, shadow directions.
                      </div>
                      <div className="p-2 border border-slate-300 rounded bg-white text-xs">
                        <strong>👓 Edge Alignment:</strong> Glasses frames, fences melting into grass.
                      </div>
                    </div>
                  </li>
                  <li>
                    <strong>Cast Your Vote:</strong> Place a Green Note (Real) or Red Note (AI Generated) next to each picture.
                  </li>
                  <li>
                    <strong>Cite Evidence:</strong> Write down at least one specific visual flaw that proved your decision.
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl">
                <h4 className="font-bold text-xs uppercase font-mono text-slate-900 mb-1">
                  💡 What It Teaches:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Generative AI models predict patterns rather than understand reality, leading to logical glitches called hallucinations. Never assume online media is real just because it looks realistic at first glance!
                </p>
              </div>
            </div>
          )}

          {/* STATION 4 TABLE SIGN */}
          {(filterSection === 'all' || filterSection === 'signs') && (
            <div className="page-break-before border-4 border-slate-900 p-8 rounded-2xl space-y-6">
              <div className="border-b-4 border-slate-900 pb-4 text-center">
                <div className="font-mono text-sm uppercase tracking-widest font-bold text-slate-600">
                  4th Grade AI Literacy Night · Table Sign
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight font-display mt-1">
                  STATION 4: AI ETHICS COUNCIL
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  Core Concept: Digital Ethics, Privacy & Responsible Use · Skill Goal: Real-World Scenarios & Family Rules
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border border-slate-300">
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-1">
                  🎯 Your Goal:
                </h3>
                <p className="text-sm leading-relaxed text-slate-800">
                  Debate realistic AI scenarios as a family and create your personalized Family AI Agreement.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base uppercase font-display text-slate-900 mb-3">
                  🛠️ How to Play:
                </h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-slate-800 leading-relaxed">
                  <li>
                    <strong>Draw a Dilemma Card:</strong> Read the scenario card out loud to your group.
                    <div className="ml-6 mt-1 text-xs text-slate-600 italic">
                      Example: "Is it okay to use AI to generate an essay outline if you write the actual paragraphs yourself?"
                    </div>
                  </li>
                  <li>
                    <strong>Vote:</strong> Everyone holds up a vote at the same time:
                    <div className="flex gap-4 mt-1.5 ml-6 font-semibold text-xs">
                      <span>👍 Ethical / Allowed</span>
                      <span>👎 Unethical / Not Allowed</span>
                      <span>🫱 It Depends / Need More Info</span>
                    </div>
                  </li>
                  <li>
                    <strong>Debate:</strong> Explain your vote! Discuss how privacy, school rules, and honesty apply to the situation.
                  </li>
                  <li>
                    <strong>Take-Home Agreement:</strong> Fill out and sign your Family AI Code of Conduct card to display at home.
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl">
                <h4 className="font-bold text-xs uppercase font-mono text-slate-900 mb-1">
                  💡 What It Teaches:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Technology is a tool, and humans are responsible for how it is used. Discussing guidelines around privacy, academic integrity, and permission helps ensure AI is used safely and ethically.
                </p>
              </div>
            </div>
          )}

          {/* WORKSHEET 1: STATION 1 PROMPT CARDS & DRAWING GRIDS */}
          {(filterSection === 'all' || filterSection === 'worksheets') && (
            <div className="page-break-before space-y-6">
              <div className="text-center pb-2 border-b border-slate-300">
                <h2 className="text-2xl font-bold font-display">
                  Station 1 Worksheet: The Prompt Engineer's Index Cards
                </h2>
                <span className="text-xs text-slate-500 font-mono">
                  Cut along dashed line · Two Cards Per Page
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((cardNum) => (
                  <div
                    key={cardNum}
                    className="border-2 border-dashed border-slate-400 p-6 rounded-xl space-y-4 bg-white"
                  >
                    <div className="flex justify-between items-center text-xs font-mono font-bold border-b pb-2">
                      <span>PROMPT ENGINEER INDEX CARD #{cardNum}</span>
                      <span>STATION 01</span>
                    </div>

                    <div className="text-xs space-y-1 font-semibold text-slate-700">
                      <div>Formula: Subject + Shapes/Sizes + Exact Placement + Details</div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-bold block mb-1">1. Subject:</span>
                        <div className="border-b border-slate-300 h-6"></div>
                      </div>
                      <div>
                        <span className="font-bold block mb-1">2. Shapes & Dimensions:</span>
                        <div className="border-b border-slate-300 h-6"></div>
                      </div>
                      <div>
                        <span className="font-bold block mb-1">3. Placement on Grid:</span>
                        <div className="border-b border-slate-300 h-6"></div>
                      </div>
                      <div>
                        <span className="font-bold block mb-1">4. Colors & Specific Details:</span>
                        <div className="border-b border-slate-300 h-6"></div>
                      </div>
                      <div>
                        <span className="font-bold block mb-1">AI Generator Drawing Result (Score 1-5):</span>
                        <div className="h-28 border border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-[10px]">
                          [Robot Drawing Box]
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORKSHEET 2: STATION 3 INVESTIGATION CHECKLIST */}
          {(filterSection === 'all' || filterSection === 'worksheets') && (
            <div className="page-break-before space-y-6">
              <div className="text-center pb-2 border-b border-slate-300">
                <h2 className="text-2xl font-bold font-display">
                  Station 3 Worksheet: Detective Forensic Checklist
                </h2>
                <span className="text-xs text-slate-500 font-mono">
                  Inspect Each Gallery Photo With Your Magnifying Glass
                </span>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((caseNum) => (
                  <div
                    key={caseNum}
                    className="border border-slate-300 p-4 rounded-xl space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="font-mono uppercase">Case Photo #{caseNum}</span>
                      <span className="flex gap-4">
                        <label className="flex items-center gap-1">
                          <input type="checkbox" className="rounded-sm" /> 🟢 Authentic Real Photo
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="checkbox" className="rounded-sm" /> 🔴 AI Generated
                        </label>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-200">
                      <div>
                        <strong>1. Anatomy Test:</strong>
                        <div className="text-slate-500">Extra fingers, odd teeth, mismatched eyes?</div>
                      </div>
                      <div>
                        <strong>2. Text / Physics Test:</strong>
                        <div className="text-slate-500">Unreadable letters, wrong shadow angles?</div>
                      </div>
                      <div>
                        <strong>3. Edge Alignment:</strong>
                        <div className="text-slate-500">Melting frames, fused objects, blurry seams?</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-semibold block text-[11px]">Evidence Found:</span>
                      <div className="border-b border-slate-300 h-6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORKSHEET 3: FAMILY AI CODE OF CONDUCT FRIDGE CERTIFICATE */}
          {(filterSection === 'all' || filterSection === 'agreement') && (
            <div className="page-break-before border-4 border-slate-900 p-8 rounded-2xl space-y-6 text-slate-900 bg-white">
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-500">
                  4th Grade AI Literacy Night · Official Family Take-Home Agreement
                </div>
                <h2 className="text-3xl font-bold font-display uppercase mt-1">
                  Our Family AI Code of Conduct
                </h2>
                <p className="text-xs text-slate-600 italic mt-0.5">
                  Display this pledge on your home refrigerator!
                </p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="font-semibold text-center italic text-sm mb-4">
                  "We believe artificial intelligence is a powerful tool. We promise to use it with honesty, kindness, and caution."
                </div>

                <div className="space-y-2">
                  {DEFAULT_FAMILY_RULES.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 border border-slate-400 rounded-sm shrink-0 mt-0.5"></span>
                      <span>{rule}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-200">
                    <span className="w-4 h-4 border border-slate-400 rounded-sm shrink-0 mt-0.5"></span>
                    <span className="text-slate-500">Our Custom Family Rule: __________________________________________________________________</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t-2 border-dashed border-slate-400 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <div className="font-bold uppercase font-mono text-[10px] text-slate-500 mb-1">
                    Student Signature (4th Grader):
                  </div>
                  <div className="border-b-2 border-slate-900 h-8"></div>
                  <div className="text-[10px] text-slate-500 mt-1">Date: __________________</div>
                </div>

                <div>
                  <div className="font-bold uppercase font-mono text-[10px] text-slate-500 mb-1">
                    Parent / Guardian Signature:
                  </div>
                  <div className="border-b-2 border-slate-900 h-8"></div>
                  <div className="text-[10px] text-slate-500 mt-1">Family Tech Partner</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
