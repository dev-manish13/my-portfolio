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
          backgroundColor: "#09090b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontFamily: "sans-serif",
            color: "#a1a1aa",
          }}
        >
          <span style={{ color: "#fafafa" }}>manish.dev</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 72,
            fontWeight: 700,
            color: "#fafafa",
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#a1a1aa",
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
            color: "#71717a",
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
