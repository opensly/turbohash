# TurboHash

A modern, high-performance JavaScript hashing library with multiple algorithms, streaming support, and browser compatibility.

## Features

- 🔥 **High Performance**: Optimized implementations with Web Crypto API support
- 🌐 **Universal**: Works in Node.js, browsers, and other JavaScript environments
- 🔒 **Multiple Algorithms**: SHA-1, SHA-256, SHA-384, SHA-512, MD5, BLAKE2b, XXHash, CRC32, FNV-1a
- 📦 **Streaming Support**: Update hash with multiple chunks of data
- 🔐 **HMAC Support**: Hash-based Message Authentication Code
- 🛡️ **Security**: Timing attack protection for hash comparison
- 📱 **Browser Compatible**: No external dependencies
- 🎯 **TypeScript Ready**: Full type definitions included

## Installation

### npm
```bash
npm install turbohash
```

### yarn
```bash
yarn add turbohash
```

### CDN (Browser)
```html
<script src="https://unpkg.com/turbohash@1.0.0/dist/turbohash.umd.js"></script>
```

## Quick Start

### Import Methods

```javascript
// CommonJS (Node.js)
const turbohash = require('turbohash');

// ES Modules (Node.js/Bundlers)
import turbohash from 'turbohash';

// ES Modules with named imports
import { hash, hashSync, createHash, hmac, compareHash, generateSalt } from 'turbohash';

// Browser (global variable)
// turbohash is available globally when using the UMD build
// <script src="https://unpkg.com/turbohash@1.0.0/dist/turbohash.umd.js"></script>
```

### Basic Usage

```javascript
// CommonJS (Node.js)
const turbohash = require('turbohash');

// Using the main turbohash object
const hasher = turbohash.createHash('sha256');
hasher.update('hello world');
const digest = await hasher.digest('hex');

// Using named imports
const hasher2 = createHash('sha256');
hasher2.update('hello world');
const digest2 = await hasher2.digest('hex');
```

### Simple Hashing

```javascript
// One-liner hash (using main object)
const hash = await turbohash.hash('hello world', 'sha256', 'hex');
console.log(hash); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9

// Using named imports
const quickHash = await hash('hello world', 'sha256', 'hex');

// Synchronous for fast algorithms
const crc = turbohash.hashSync('hello world', 'crc32', 'hex');
console.log(crc); // 85114a0d

// Using named imports for sync
const crc2 = hashSync('hello world', 'crc32', 'hex');
```

### Streaming Hashing

```javascript
// Create hash instance
const hasher = turbohash.createHash('sha256');

// Update with multiple chunks
hasher.update('hello');
hasher.update(' ');
hasher.update('world');

// Get final digest
const digest = await hasher.digest('hex');
console.log(digest);
```

### HMAC (Hash-based Message Authentication Code)

```javascript
// Using main object
const hmac = await turbohash.hmac('secret-key', 'message', 'sha256');
console.log(hmac);

// Using named imports
const hmac2 = await hmac('secret-key', 'message', 'sha256');
```

### Hash Comparison (Timing Attack Safe)

```javascript
const hash1 = await turbohash.hash('password123', 'sha256');
const hash2 = await turbohash.hash('password123', 'sha256');

// Using main object
const isValid = turbohash.compareHash(hash1, hash2);
console.log(isValid); // true

// Using named imports
const isValid2 = compareHash(hash1, hash2);
```

### Generate Random Salt

```javascript
// Using main object
const salt = turbohash.generateSalt(32);
console.log(salt); // Random 32-byte hex string

// Using named imports
const salt2 = generateSalt(32);
```

## API Reference

### turbohash.createHash(algorithm)

Creates a new hash instance.

**Parameters:**
- `algorithm` (string): Hash algorithm to use. Default: `'sha256'`

**Returns:** TurboHash instance

**Supported Algorithms:**
- `'sha1'` - SHA-1 (160 bits)
- `'sha256'` - SHA-256 (256 bits)
- `'sha384'` - SHA-384 (384 bits)
- `'sha512'` - SHA-512 (512 bits)
- `'md5'` - MD5 (128 bits)
- `'blake2b'` - BLAKE2b (512 bits)
- `'blake2s'` - BLAKE2s (256 bits)
- `'xxhash'` - XXHash (32 bits)
- `'crc32'` - CRC32 (32 bits)
- `'fnv1a'` - FNV-1a (32 bits)

### turbohash.hash(data, algorithm, format)

Hash data in one call (asynchronous).

**Parameters:**
- `data` (string|ArrayBuffer|Uint8Array): Data to hash
- `algorithm` (string): Hash algorithm. Default: `'sha256'`
- `format` (string): Output format. Default: `'hex'`

**Returns:** Promise<string|Uint8Array|Array>

### turbohash.hashSync(data, algorithm, format)

Hash data in one call (synchronous, limited algorithms).

**Parameters:**
- `data` (string|ArrayBuffer|Uint8Array): Data to hash
- `algorithm` (string): Hash algorithm. Default: `'crc32'`
- `format` (string): Output format. Default: `'hex'`

**Returns:** string|Uint8Array|Array

**Note:** Only supports `'crc32'`, `'fnv1a'`, and `'xxhash'` algorithms.

### turbohash.hmac(key, data, algorithm)

Create HMAC (Hash-based Message Authentication Code).

**Parameters:**
- `key` (string|Uint8Array): Secret key
- `data` (string|Uint8Array): Data to authenticate
- `algorithm` (string): Hash algorithm. Default: `'sha256'`

**Returns:** Promise<string>

### turbohash.compareHash(hash1, hash2)

Compare two hashes with timing attack protection.

**Parameters:**
- `hash1` (string): First hash
- `hash2` (string): Second hash

**Returns:** boolean

### turbohash.generateSalt(length)

Generate cryptographically secure random salt.

**Parameters:**
- `length` (number): Salt length in bytes. Default: `16`

**Returns:** string (hex format)

### turbohash.isSupported(algorithm)

Check if an algorithm is supported.

**Parameters:**
- `algorithm` (string): Algorithm name

**Returns:** boolean

### turbohash.getSupportedAlgorithms()

Get list of all supported algorithms.

**Returns:** string[]

## TurboHash Instance Methods

### hasher.update(data, encoding)

Update hash with new data.

**Parameters:**
- `data` (string|ArrayBuffer|Uint8Array): Data to add
- `encoding` (string): String encoding. Default: `'utf8'`

**Returns:** TurboHash instance (for chaining)

### hasher.digest(format)

Finalize and return hash digest.

**Parameters:**
- `format` (string): Output format. Default: `'hex'`

**Returns:** Promise<string|Uint8Array|Array>

**Supported Formats:**
- `'hex'` - Hexadecimal string
- `'base64'` - Base64 encoded string
- `'base64url'` - URL-safe Base64 encoded string
- `'buffer'` - Uint8Array
- `'array'` - Array of numbers

### hasher.digestSync(format)

Synchronous digest (limited algorithms).

**Parameters:**
- `format` (string): Output format. Default: `'hex'`

**Returns:** string|Uint8Array|Array

**Note:** Only supports `'crc32'`, `'fnv1a'`, and `'xxhash'` algorithms.

## Examples

### File Hashing

```javascript
const fs = require('fs');

async function hashFile(filePath) {
  const hasher = turbohash.createHash('sha256');
  const stream = fs.createReadStream(filePath);
  
  for await (const chunk of stream) {
    hasher.update(chunk);
  }
  
  return await hasher.digest('hex');
}

// Usage
hashFile('large-file.txt').then(hash => {
  console.log('File hash:', hash);
});
```

### Password Hashing with Salt

```javascript
async function hashPassword(password) {
  const salt = turbohash.generateSalt(32);
  const hashedPassword = await turbohash.hash(password + salt, 'sha256');
  return { salt, hash: hashedPassword };
}

async function verifyPassword(password, salt, hash) {
  const hashedInput = await turbohash.hash(password + salt, 'sha256');
  return turbohash.compareHash(hashedInput, hash);
}

// Usage
const { salt, hash } = await hashPassword('myPassword123');
const isValid = await verifyPassword('myPassword123', salt, hash);
```

### API Authentication

```javascript
async function createSignature(apiKey, timestamp, data) {
  const message = `${timestamp}:${JSON.stringify(data)}`;
  return await turbohash.hmac(apiKey, message, 'sha256');
}

async function verifySignature(apiKey, timestamp, data, signature) {
  const expectedSignature = await createSignature(apiKey, timestamp, data);
  return turbohash.compareHash(signature, expectedSignature);
}
```

## Browser Support

TurboHash works in all modern browsers that support:
- ES6+ features
- Web Crypto API (for SHA algorithms)
- TextEncoder API

For older browsers, consider using a polyfill for Web Crypto API.

## Node.js Support

Requires Node.js 12.0.0 or higher.

## Performance

- **Web Crypto API**: Uses native browser crypto for SHA algorithms
- **Optimized Implementations**: Custom implementations for other algorithms
- **Streaming**: Efficient memory usage for large files
- **Synchronous Options**: Fast algorithms available synchronously

## Security Considerations

- Hash comparison uses constant-time comparison to prevent timing attacks
- Random salt generation uses cryptographically secure random numbers when available
- HMAC implementation follows RFC 2104 standards
- All cryptographic operations use well-tested algorithms

## License

MIT License - see [LICENSE](LICENSE) file for details.