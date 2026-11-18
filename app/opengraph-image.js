import { ImageResponse } from "next/og";
import { profile, BRAND } from "@/data/profile";

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
          backgroundColor: "#111111", // Ember dark surface-0
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontFamily: "sans-serif",
            color: "#B4B4B4",
          }}
        >
          <span style={{ width: 16, height: 16, backgroundColor: "#FA4616" }} />
          <span style={{ color: "#EEEEEE" }}>{BRAND}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#EEEEEE",
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#FF9275",
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
            color: "#B4B4B4",
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
