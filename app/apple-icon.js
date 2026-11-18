import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FA4616", // Ember brand
          color: "#FFFFFF",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
