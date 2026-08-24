import type { ThemeRegistrationRaw } from "shiki";

// Two colours only — accent for keywords, faint for comments, everything
// else falls through to the default foreground. Not a stock rainbow theme.
// Hex values must stay in sync with the --accent/--faint/--ink tokens in
// app/globals.css; Shiki needs real hex, it can't consume var().

const KEYWORD_SCOPES = [
  "keyword",
  "keyword.control",
  "keyword.operator",
  "keyword.other",
  "storage.type",
  "storage.modifier",
  "constant.language",
  "variable.language",
];

const COMMENT_SCOPES = ["comment", "punctuation.definition.comment"];

export const lightCodeTheme: ThemeRegistrationRaw = {
  name: "spperera-light",
  type: "light",
  colors: {
    "editor.foreground": "#141A17",
    "editor.background": "#F1F4EF",
  },
  settings: [
    { scope: COMMENT_SCOPES, settings: { foreground: "#97A29C" } },
    { scope: KEYWORD_SCOPES, settings: { foreground: "#1F5F4F" } },
  ],
};

export const darkCodeTheme: ThemeRegistrationRaw = {
  name: "spperera-dark",
  type: "dark",
  colors: {
    "editor.foreground": "#E8EDE9",
    "editor.background": "#121716",
  },
  settings: [
    { scope: COMMENT_SCOPES, settings: { foreground: "#64716B" } },
    { scope: KEYWORD_SCOPES, settings: { foreground: "#6FBFA6" } },
  ],
};
