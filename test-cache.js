// Test script za CMS cache funkcionalnost
import { getCacheStats, clearCMSCache } from './src/lib/cms/cache';

console.log('🧪 Testing CMS Cache...\n');

// Test 1: Provjeri početno stanje cache-a
console.log('1. Početno stanje cache-a:');
console.log(getCacheStats());

// Test 2: Simuliraj nekoliko poziva
console.log('\n2. Simulacija poziva...');
console.log('Prvi poziv - trebao bi biti spor (100ms delay)');
console.log('Drugi poziv - trebao bi biti brz (iz cache-a)');

// Test 3: Provjeri cache stats nakon poziva
console.log('\n3. Cache stats nakon poziva:');
console.log(getCacheStats());

// Test 4: Clear cache
console.log('\n4. Clearing cache...');
clearCMSCache();
console.log('Cache cleared!');
console.log(getCacheStats());

console.log('\n✅ CMS Cache test završen!');
