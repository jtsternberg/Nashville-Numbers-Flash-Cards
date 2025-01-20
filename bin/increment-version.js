#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagePath = resolve(__dirname, '../package.json');

// Read the package.json
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

// Increment the patch version
packageJson.version = packageJson.version.replace(/\d+$/, match => +match + 1);

// Write back to package.json with proper formatting
writeFileSync(packagePath, JSON.stringify(packageJson, null, '\t') + '\n');

console.log(`Version incremented to ${packageJson.version}`);