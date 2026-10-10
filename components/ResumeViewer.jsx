"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { profile } from "@/data/profile";

const MIN = 75;
const MAX = 200;
const STEP = 25;

// Natural (100%) size of the document; roughly A4 proportions.
const BASE_W = 800;
const BASE_H = 1131;

const zoomBtn =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 transition-colors duration-150 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-800/60";

export default function ResumeViewer() {
  const [zoom, setZoom] = useState(100);
  const scale = zoom / 100;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
      <h1 className="sr-only">Resume</h1>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors duration-150 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={zoom <= MIN}
            onClick={() => setZoom((z) => Math.max(MIN, z - STEP))}
            className={zoomBtn}
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            aria-label="Reset zoom to 100%"
            title="Reset zoom"
            onClick={() => setZoom(100)}
            className="w-14 rounded-md py-1 text-center font-mono text-xs text-zinc-500 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
          >
            {zoom}%
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={zoom >= MAX}
            onClick={() => setZoom((z) => Math.min(MAX, z + STEP))}
            className={zoomBtn}
          >
            <Plus size={14} />
          </button>
          <a
            href={profile.resume}
            download
            className="ml-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-zinc-950"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Scroll viewport. `m-auto` on the sizer (not justify-center) keeps the left edge
          reachable when the document is wider than the viewport. */}
      <div className="flex h-[82vh] w-full overflow-auto rounded-xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
        {/* Sizer reserves the scaled footprint so scroll extents are correct. */}
        <div
          className="relative m-auto shrink-0"
          style={{ width: BASE_W * scale, height: BASE_H * scale }}
        >
          <div
            className="absolute top-0 left-1/2"
            style={{
              width: BASE_W,
              height: BASE_H,
              marginLeft: -BASE_W / 2,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out",
            }}
          >
            <iframe
              src={`${profile.resume}#view=FitH`}
              title="Resume"
              className="h-full w-full rounded-lg bg-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
