// World News — Thursday, 26 November 2026.
//
// Copies the front-page image (entry.png) into the output directory.
// Node 22, standard library only. No network access. Deterministic:
// the same bytes are written on every run, because the image is a
// fixed file shipped in this repository.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`missing entry image: ${source}`);
}

const bytes = readFileSync(source);

if (bytes.length > MAX_BYTES) {
  throw new Error(`entry image is ${bytes.length} bytes, over the 1 MiB cap`);
}
if (!bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
  throw new Error("entry image is not a PNG (bad magic bytes)");
}

// Read the IHDR chunk: width and height are big-endian uint32s at
// offsets 16 and 20. Both must fit the 1024x1024 cap.
if (bytes.length < 33 || bytes.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry image has no IHDR chunk where one belongs");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry image is ${width}x${height}, over the 1024x1024 cap`);
}

// A whole PNG ends with the 12-byte IEND chunk; refuse a truncated file.
const tail = bytes.subarray(bytes.length - 12);
if (tail.readUInt32BE(0) !== 0 || tail.toString("ascii", 4, 8) !== "IEND") {
  throw new Error("entry image is truncated (no IEND chunk at the end)");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

const written = statSync(target).size;
if (written !== bytes.length) {
  throw new Error(`wrote ${written} bytes, expected ${bytes.length}`);
}

console.log(`wrote ${target} (${written} bytes)`);
