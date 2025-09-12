#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analizira bundle size i identificira teške komponente
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Bundle Analysis...\n');

// 1. Run build with bundle analyzer
console.log('1. Building with bundle analyzer...');
try {
  execSync('ANALYZE=true npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// 2. Check if bundle analyzer files exist
const analyzeDir = path.join(process.cwd(), '.next', 'analyze');
if (fs.existsSync(analyzeDir)) {
  console.log('2. Bundle analyzer files created:');
  const files = fs.readdirSync(analyzeDir);
  files.forEach(file => {
    console.log(`   📄 ${file}`);
  });
  console.log(`\n   🌐 Open: ${analyzeDir}/client.html\n`);
} else {
  console.log('2. ⚠️  Bundle analyzer files not found');
}

// 3. Analyze package.json dependencies
console.log('3. Analyzing dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

console.log(`   📦 Production dependencies: ${dependencies.length}`);
console.log(`   🔧 Development dependencies: ${devDependencies.length}`);

// 4. Check for large dependencies
const largeDeps = [
  '@dnd-kit/core',
  '@dnd-kit/sortable',
  '@dnd-kit/utilities',
  'next',
  'react',
  'react-dom',
];

console.log('\n4. Checking large dependencies:');
largeDeps.forEach(dep => {
  if (dependencies.includes(dep)) {
    console.log(`   ⚠️  ${dep} - Large dependency`);
  }
});

// 5. Analyze component sizes
console.log('\n5. Analyzing component structure...');
const srcDir = path.join(process.cwd(), 'src');
const componentsDir = path.join(srcDir, 'components');

if (fs.existsSync(componentsDir)) {
  const components = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`   📁 Component directories: ${components.length}`);
  components.forEach(comp => {
    console.log(`      - ${comp}`);
  });
}

console.log('\n✅ Bundle Analysis completed!');
console.log('\n📊 Next steps:');
console.log('   1. Open bundle analyzer HTML files');
console.log('   2. Identify largest chunks');
console.log('   3. Look for optimization opportunities');
console.log('   4. Consider code splitting for large components');
