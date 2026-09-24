import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#020617",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(56,189,248,0.12), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontFamily: "monospace",
            color: "#38bdf8",
          }}
        >
          <span>{"<"}</span>
          <span style={{ color: "#f1f5f9" }}>MK</span>
          <span>{"/>"}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 72,
            fontWeight: 700,
            color: "#f1f5f9",
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#34d399",
            fontWeight: 600,
          }}
        >
          {profile.role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 24,
            color: "#94a3b8",
            maxWidth: 820,
          }}
        >
          {profile.bio}
        </div>
      </div>
    ),
    { ...size }
  );
}
