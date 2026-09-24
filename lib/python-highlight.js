const KEYWORDS = new Set([
  "class", "def", "if", "elif", "else", "return", "import", "from", "for",
  "in", "while", "try", "except", "self", "True", "False", "None", "and",
  "or", "not", "is", "with", "as",
  // JS keywords too — the same tokenizer lights up the project flip-card
  // "core code" snippets, which are plain JS rather than Python.
  "function", "const", "let", "var", "async", "await", "new", "of", "this",
  "static", "export", "default",
]);

const TOKEN_RE =
  /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|([A-Za-z_][A-Za-z0-9_]*)|([{}()[\]:,.=])/gm;

/**
 * Splits a single line of Python source into `{ text, kind }` tokens for
 * lightweight, dependency-free syntax highlighting in the terminal widget.
 */
export function highlightPythonLine(line) {
  const tokens = [];
  let lastIndex = 0;
  let match;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), kind: "plain" });
    }

    const [full, comment, string, number, word, punct] = match;
    if (comment) tokens.push({ text: full, kind: "comment" });
    else if (string) tokens.push({ text: full, kind: "string" });
    else if (number) tokens.push({ text: full, kind: "number" });
    else if (word) tokens.push({ text: full, kind: KEYWORDS.has(full) ? "keyword" : "identifier" });
    else if (punct) tokens.push({ text: full, kind: "punct" });

    lastIndex = match.index + full.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), kind: "plain" });
  }

  return tokens;
}

// VS Code Light+-ish palette in light mode, neon terminal palette in dark
// mode — the terminal widget follows the site theme via `dark:` variants
// instead of forcing a single fixed theme.
export const tokenClassName = {
  comment: "text-slate-400 italic dark:text-slate-500",
  string: "text-green-700 dark:text-accent-emerald",
  number: "text-amber-600 dark:text-amber-400",
  keyword: "text-blue-700 font-medium dark:font-normal dark:text-accent-cyan",
  identifier: "text-slate-700 dark:text-slate-200",
  punct: "text-slate-500 dark:text-slate-400",
  plain: "text-slate-600 dark:text-slate-300",
};
