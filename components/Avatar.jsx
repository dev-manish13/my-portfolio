"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

export default function Avatar({ size = 160, className = "" }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // The image can finish loading (and fail) before React hydrates and
    // attaches the onError listener, so the error event fires unseen.
    // Catch that already-broken state explicitly once on mount.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br from-accent-cyan/20 to-accent-emerald/20 ${className}`}
      style={{ width: size, height: size }}
    >
      {!failed ? (
        // Plain <img>, not next/image: /public/profile.jpg is expected to be
        // absent until the real photo is added, and a 404 should fall back
        // to the initials badge instead of Next's image error overlay.
        // TODO: Add profile.jpg to public folder
        // eslint-disable-next-line @next/next/no-img-element -- needs a real onError fallback
        <img
          ref={imgRef}
          src={profile.avatar}
          alt={profile.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="text-gradient font-mono font-bold"
            style={{ fontSize: size * 0.32 }}
          >
            {profile.initials}
          </span>
        </div>
      )}
    </div>
  );
}
