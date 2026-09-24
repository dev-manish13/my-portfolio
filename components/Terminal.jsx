"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Circle } from "lucide-react";
import { scriptSource, outputLines } from "@/data/terminal";
import { highlightPythonLine, tokenClassName } from "@/lib/python-highlight";

const outputClassName = {
  command: "text-sky-700 font-semibold dark:text-accent-cyan",
  muted: "text-slate-400 dark:text-slate-500",
  info: "text-sky-600 dark:text-sky-300",
  data: "text-slate-700 dark:text-slate-200",
  success: "text-emerald-700 font-semibold dark:text-accent-emerald",
  blank: "",
};

const scriptLines = scriptSource.split("\n");

export default function Terminal() {
  const [revealed, setRevealed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef(null);

  // Derived, not stored: running/finished always agree with revealed, so
  // there's no separate "running" state to fall out of sync or reset.
  const running = hasStarted && revealed < outputLines.length;
  const finished = hasStarted && revealed >= outputLines.length;

  const runScript = () => {
    if (running) return;
    clearTimeout(timeoutRef.current);
    setRevealed(0);
    setHasStarted(true);
  };

  useEffect(() => {
    if (!running) return;

    const delay = outputLines[revealed]?.type === "blank" ? 60 : 110;
    timeoutRef.current = setTimeout(() => setRevealed((n) => n + 1), delay);

    return () => clearTimeout(timeoutRef.current);
  }, [running, revealed]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glow-cyan w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 font-mono shadow-2xl dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Window chrome — follows the site theme via dark: variants */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Circle size={11} className="fill-red-400 text-red-400" />
          <Circle size={11} className="fill-amber-400 text-amber-400" />
          <Circle size={11} className="fill-emerald-400 text-emerald-400" />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">developer_info.py</span>
        <span className="w-[44px]" aria-hidden="true" />
      </div>

      {/* Script body */}
      <div className="max-h-64 overflow-y-auto px-4 py-4 text-[13px] leading-6 sm:text-sm">
        {scriptLines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-5 shrink-0 select-none text-right text-slate-400 dark:text-slate-600">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {highlightPythonLine(line).map((tok, j) => (
                <span key={j} className={tokenClassName[tok.kind]}>
                  {tok.text}
                </span>
              ))}
              {line.length === 0 ? " " : null}
            </span>
          </div>
        ))}
      </div>

      {/* Run control */}
      <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <button
          type="button"
          onClick={runScript}
          disabled={running}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-emerald px-4 py-2 text-xs font-semibold text-slate-950 transition-opacity disabled:opacity-60 sm:text-sm"
        >
          {finished && !running ? <RotateCcw size={14} /> : <Play size={14} />}
          {running ? "Running…" : finished ? "Run Again" : "Run Script"}
        </button>
      </div>

      {/* Streamed output */}
      <div className="min-h-[220px] border-t border-slate-200 bg-slate-100 px-4 py-4 text-[13px] leading-6 sm:text-sm dark:border-slate-800 dark:bg-slate-950/60">
        {outputLines.slice(0, revealed).map((line, i) => (
          <div key={i} className={outputClassName[line.type]}>
            {line.text || " "}
          </div>
        ))}
        {revealed === 0 && !running && (
          <div className="text-slate-400 dark:text-slate-600">
            <span className="text-sky-600 dark:text-accent-cyan">$</span> awaiting execution
            <span className="caret-blink">▍</span>
          </div>
        )}
        {running && <span className="caret-blink text-sky-600 dark:text-accent-cyan">▍</span>}
      </div>
    </motion.div>
  );
}
