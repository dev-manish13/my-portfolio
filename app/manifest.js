import { profile, BRAND } from "@/data/profile";
import { SITE_TITLE } from "@/lib/seo";

export default function manifest() {
  return {
    name: SITE_TITLE,
    short_name: BRAND,
    description: profile.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#FA4616",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
