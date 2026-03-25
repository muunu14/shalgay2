import { suggestWithBolor } from "./bolor-spell";
import { correctWithOpenAI } from "./openai";

export type CheckResult = {
  original: string;
  corrected: string;
  changed: boolean;
  suggestions: string[];
  mode: "openai-galig" | "bolor-suggest" | "none";
};

const isCyrillicText = (text: string) => /^[А-Яа-яӨөҮүЁёЇїІіҐґ\s]+$/.test(text.trim());
const isLatinText = (text: string) => /^[A-Za-z\s]+$/.test(text.trim());
const isSingleWord = (text: string) => text.trim().length > 0 && !/\s/.test(text.trim());

export const checkText = async (text: string): Promise<CheckResult> => {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      original: text,
      corrected: text,
      changed: false,
      suggestions: [],
      mode: "none",
    };
  }


  if (isSingleWord(trimmed) && isCyrillicText(trimmed)) {
    const suggestions = await suggestWithBolor(trimmed);
    const firstSuggestion = suggestions[0]?.suggestion || trimmed;

    return {
      original: text,
      corrected: firstSuggestion,
      changed: firstSuggestion !== trimmed,
      suggestions: suggestions.map((s) => s.suggestion),
      mode: suggestions.length > 0 && firstSuggestion !== trimmed ? "bolor-suggest" : "none",
    };
  }

  // 2️⃣ Latin → OpenAI
  if (isLatinText(trimmed)) {
    const corrected = await correctWithOpenAI(trimmed);

    return {
      original: text,
      corrected,
      changed: corrected !== trimmed,
      suggestions: corrected !== trimmed ? [corrected] : [],
      mode: corrected !== trimmed ? "openai-galig" : "none",
    };
  }


  return {
    original: text,
    corrected: text,
    changed: false,
    suggestions: [],
    mode: "none",
  };
};