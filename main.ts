import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original fortune-cookie line for a software developer.
// It is a single sentence, 104 characters, no trailing newline:
// the gate counts every character in entry.txt, so the file holds
// exactly this line and nothing else.
const FORTUNE =
  "The legacy code you curse was once someone's clever idea, written at 2 a.m. with the best of intentions.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate guard, checked before anything is written: the entry is only
// valid as UTF-8 text of 1-120 characters, not only whitespace.
// Fail loudly here rather than shipping an entry the gate refuses.
// Note the twist the line leans on: "curse" / "clever idea" — the
// code you resent today was somebody's proudest 2 a.m. solution.
const chars = [...FORTUNE].length;
if (chars < 1 || chars > 120 || FORTUNE.trim().length === 0) {
  throw new Error(`fortune must be 1-120 characters, got ${chars}`);
}
if (FORTUNE.includes("\n")) {
  throw new Error("fortune must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), FORTUNE, "utf8");
