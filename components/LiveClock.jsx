"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function LiveClock({ className = "" }) {
  // Starts null so the server-rendered markup and the pre-effect client
  // render match exactly (both show the placeholder) — no hydration mismatch.
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono tabular-nums ${className}`}>
      <Clock size={13} />
      {time ?? "--:--:-- --"} <span className="opacity-70">NPT</span>
    </span>
  );
}
