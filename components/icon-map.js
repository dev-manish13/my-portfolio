import {
  Atom,
  FileCode,
  Palette,
  LayoutTemplate,
  Server,
  Route,
  Database,
  Plug,
  Terminal,
  Soup,
  ArrowLeftRight,
  Bot,
  GitBranch,
  SquareCode,
  TerminalSquare,
  Mail,
  Phone,
} from "lucide-react";
import GithubMark from "@/components/icons/GithubMark";

// Maps the string icon names stored in /data/*.json to the actual
// icon components, so data files stay framework-agnostic.
export const iconMap = {
  Atom,
  FileCode,
  Palette,
  LayoutTemplate,
  Server,
  Route,
  Database,
  Plug,
  Terminal,
  Soup,
  ArrowLeftRight,
  Bot,
  GitBranch,
  SquareCode,
  TerminalSquare,
  Mail,
  Phone,
  GithubMark,
};

export function SkillIcon({ name, ...props }) {
  const Icon = iconMap[name] ?? Atom;
  return <Icon {...props} />;
}
