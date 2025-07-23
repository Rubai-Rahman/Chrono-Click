#!/usr/bin/env node

/**
 * Spacing Consistency Checker
 * This script helps identify components with inconsistent spacing patterns
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Patterns to look for (potential inconsistencies)
const INCONSISTENT_PATTERNS = [
  // Old container patterns
  /container mx-auto px-[0-9]/g,
  /max-w-[0-9]xl mx-auto/g,

  // Inconsistent padding patterns
  /py-[0-9](?!\d)/g, // py-8, py-6, etc. (but not py-12, py-16)
  /px-[0-9](?!\d)/g, // px-4, px-6, etc.
  /p-[0-9](?!\d)/g, // p-4, p-6, etc.

  // Inconsistent gap patterns
  /gap-[0-9](?!\d)/g, // gap-4, gap-6, etc.

  // Inconsistent margin patterns
  /my-[0-9](?!\d)/g, // my-4, my-6, etc.
  /mb-[0-9](?!\d)/g, // mb-4, mb-6, etc.
];

// Recommended replacements
const RECOMMENDATIONS = {
  'container mx-auto px-4': 'container-base',
  'py-8': 'section-sm',
  'py-10': 'section-md',
  'py-12': 'section-md',
  'py-16': 'section-lg',
  'p-6': 'card-padding-md',
  'p-8': 'card-padding-lg',
  'gap-4': 'gap-responsive-md',
  'gap-6': 'gap-responsive-lg',
};

function checkFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const issues = [];

    INCONSISTENT_PATTERNS.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const recommendation =
            RECOMMENDATIONS[match] || 'Use standardized spacing class';
          issues.push({
            pattern: match,
            recommendation,
            line:
              content.split('\n').findIndex((line) => line.includes(match)) + 1,
          });
        });
      }
    });

    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir) {
  const results = {};

  function scan(currentDir) {
    const items = readdirSync(currentDir);

    items.forEach((item) => {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.startsWith('.') &&
        item !== 'node_modules'
      ) {
        scan(fullPath);
      } else if (
        item.endsWith('.tsx') ||
        item.endsWith('.ts') ||
        item.endsWith('.jsx') ||
        item.endsWith('.js')
      ) {
        const issues = checkFile(fullPath);
        if (issues.length > 0) {
          results[fullPath] = issues;
        }
      }
    });
  }

  scan(dir);
  return results;
}

// Main execution
const srcDir = join(process.cwd(), 'src');
console.log('🔍 Checking for spacing inconsistencies...\n');

const results = scanDirectory(srcDir);

if (Object.keys(results).length === 0) {
  console.log('✅ No spacing inconsistencies found! Great job!');
} else {
  console.log('⚠️  Found spacing inconsistencies:\n');

  Object.entries(results).forEach(([file, issues]) => {
    console.log(`📁 ${file.replace(process.cwd(), '.')}`);
    issues.forEach((issue) => {
      console.log(
        `   Line ${issue.line}: "${issue.pattern}" → Recommend: ${issue.recommendation}`
      );
    });
    console.log('');
  });

  console.log('💡 Tips:');
  console.log(
    '   - Use container-base, container-narrow, or container-wide for containers'
  );
  console.log(
    '   - Use section-sm, section-md, section-lg, section-xl for section spacing'
  );
  console.log(
    '   - Use card-padding-sm, card-padding-md, card-padding-lg for card padding'
  );
  console.log(
    '   - Use gap-responsive-sm, gap-responsive-md, gap-responsive-lg for gaps'
  );
  console.log('   - See SPACING_SYSTEM.md for complete documentation');
}

console.log('\n📚 For more information, see SPACING_SYSTEM.md');
