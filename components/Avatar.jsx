"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      className={`relative shrink-0 overflow-hidden rounded-full border border-border bg-surface-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <Image
          ref={imgRef}
          src={profile.avatar}
          alt={profile.avatarAlt}
          width={size}
          height={size}
          loading="eager"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="font-semibold"
            style={{ fontSize: size * 0.32 }}
          >
            {profile.name.split(" ").map((w) => w[0]).join("")}
          </span>
        </div>
      )}
    </div>
  );
}
