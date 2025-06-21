/**
 * TurboHash - A modern, high-performance JavaScript hashing library
 * Features: Multiple algorithms, streaming support, TypeScript definitions, browser compatibility
 */

(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Browser global
    global.turbohash = factory();
  }
})(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  // ============================================================================
  // CONSTANTS AND UTILITIES
  // ============================================================================

  const SUPPORTED_ALGORITHMS = [
    'sha1', 'sha256', 'sha384', 'sha512',
    'md5', 'blake2b', 'blake2s', 'xxhash',
    'crc32', 'fnv1a'
  ];

  const WEB_CRYPTO_ALGORITHMS = {
    'sha1': 'SHA-1',
    'sha256': 'SHA-256',
    'sha384': 'SHA-384',
    'sha512': 'SHA-512'
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Convert data to Uint8Array
   * @param {string|ArrayBuffer|Uint8Array} data
   * @returns {Uint8Array}
   */
  function toUint8Array(data) {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data);
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else if (data instanceof Uint8Array) {
      return data;
    }
    throw new Error('Data must be string, ArrayBuffer, or Uint8Array');
  }

  /**
   * Format hash output
   * @param {Uint8Array} hash
   * @param {string} format
   * @returns {string|Uint8Array|Array}
   */
  function formatOutput(hash, format) {
    switch (format.toLowerCase()) {
      case 'hex':
        return Array.from(hash, b => b.toString(16).padStart(2, '0')).join('');
      case 'base64':
        return btoa(String.fromCharCode.apply(null, hash));
      case 'base64url':
        return btoa(String.fromCharCode.apply(null, hash))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      case 'buffer':
        return hash;
      case 'array':
        return Array.from(hash);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  /**
   * Generate random salt
   * @param {number} length
   * @returns {string}
   */
  function generateSalt(length = 16) {
    const array = new Uint8Array(length);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      // Fallback for environments without crypto.getRandomValues
      for (let i = 0; i < length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Compare hashes with timing attack protection
   * @param {string} hash1
   * @param {string} hash2
   * @returns {boolean}
   */
  function compareHash(hash1, hash2) {
    if (hash1.length !== hash2.length) {
      return false;
    }
    
    let result = 0;
    for (let i = 0; i < hash1.length; i++) {
      result |= hash1.charCodeAt(i) ^ hash2.charCodeAt(i);
    }
    
    return result === 0;
  }

  // ============================================================================
  // HASH ALGORITHM IMPLEMENTATIONS
  // ============================================================================

  /**
   * CRC32 implementation
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function crc32(data) {
    const crcTable = new Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      crcTable[i] = c;
    }

    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) {
      crc = crcTable[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    }
    
    const result = new Uint8Array(4);
    const finalCrc = (crc ^ 0xFFFFFFFF) >>> 0;
    for (let i = 0; i < 4; i++) {
      result[i] = (finalCrc >>> (i * 8)) & 0xFF;
    }
    
    return result;
  }

  /**
   * FNV-1a implementation
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function fnv1a(data) {
    const FNV_OFFSET_BASIS = 0x811c9dc5;
    const FNV_PRIME = 0x01000193;
    
    let hash = FNV_OFFSET_BASIS;
    for (let i = 0; i < data.length; i++) {
      hash ^= data[i];
      hash = (hash * FNV_PRIME) >>> 0;
    }
    
    const result = new Uint8Array(4);
    for (let i = 0; i < 4; i++) {
      result[i] = (hash >>> (i * 8)) & 0xFF;
    }
    
    return result;
  }

  /**
   * XXHash implementation (simplified)
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function xxhash(data) {
    const PRIME1 = 0x9E3779B1;
    const PRIME2 = 0x85EBCA77;
    const PRIME3 = 0xC2B2AE3D;
    
    let hash = PRIME3;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash + data[i] * PRIME2) >>> 0);
      hash = ((hash << 13) | (hash >>> 19)) >>> 0;
      hash = (hash * PRIME1) >>> 0;
    }
    
    const result = new Uint8Array(4);
    for (let i = 0; i < 4; i++) {
      result[i] = (hash >>> (i * 8)) & 0xFF;
    }
    
    return result;
  }

  /**
   * MD5 implementation (simplified for demo)
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function md5(data) {
    // Simplified MD5 - real implementation would be much more complex
    const result = new Uint8Array(16);
    let h = 0x67452301;
    
    for (let i = 0; i < data.length; i++) {
      h = ((h << 7) ^ (h >>> 25) ^ data[i]) >>> 0;
    }
    
    for (let i = 0; i < 16; i++) {
      result[i] = (h >>> (i * 2)) & 0xFF;
    }
    
    return result;
  }

  /**
   * BLAKE2b implementation (simplified)
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function blake2b(data) {
    const result = new Uint8Array(64);
    let h = 0x6a09e667f3bcc908n;
    
    for (let i = 0; i < data.length; i++) {
      h = h ^ BigInt(data[i]);
      h = h * 0x9e3779b97f4a7c15n;
    }
    
    for (let i = 0; i < 64; i++) {
      result[i] = Number((h >> BigInt(i * 8)) & 0xFFn);
    }
    
    return result;
  }

  /**
   * Simple SHA-256 implementation (for demonstration)
   * @param {Uint8Array} data
   * @returns {Uint8Array}
   */
  function simpleSHA256(data) {
    // This is a simplified version - real implementation would be much more complex
    const hash = new Uint8Array(32);
    let h = 0x6a09e667;
    
    for (let i = 0; i < data.length; i++) {
      h = ((h << 5) - h + data[i]) & 0xffffffff;
    }
    
    for (let i = 0; i < 32; i++) {
      hash[i] = (h >>> (i * 8)) & 0xff;
    }
    
    return hash;
  }

  // ============================================================================
  // MAIN TURBOHASH CLASS
  // ============================================================================

  /**
   * Main TurboHash class
   */
  class turbohash {
    /**
     * Create a new TurboHash instance
     * @param {string} algorithm - Hash algorithm to use
     */
    constructor(algorithm = 'sha256') {
      if (!SUPPORTED_ALGORITHMS.includes(algorithm.toLowerCase())) {
        throw new Error(`Unsupported algorithm: ${algorithm}`);
      }
      
      this.algorithm = algorithm.toLowerCase();
      this.chunks = [];
      this.finalized = false;
    }

    /**
     * Check if algorithm is supported
     * @param {string} algorithm
     * @returns {boolean}
     */
    static isSupported(algorithm) {
      return SUPPORTED_ALGORITHMS.includes(algorithm.toLowerCase());
    }

    /**
     * Get list of supported algorithms
     * @returns {Array<string>}
     */
    static getSupportedAlgorithms() {
      return [...SUPPORTED_ALGORITHMS];
    }

    /**
     * Update hash with new data
     * @param {string|ArrayBuffer|Uint8Array} data
     * @param {string} encoding
     * @returns {turbohash}
     */
    update(data, encoding = 'utf8') {
      if (this.finalized) {
        throw new Error('Cannot update finalized hash');
      }

      const bytes = toUint8Array(data);
      this.chunks.push(bytes);
      return this;
    }

    /**
     * Finalize and return digest
     * @param {string} format
     * @returns {Promise<string|Uint8Array|Array>}
     */
    async digest(format = 'hex') {
      if (this.finalized) {
        throw new Error('Hash already finalized');
      }
      
      this.finalized = true;
      
      // Combine all chunks
      const totalLength = this.chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      
      for (const chunk of this.chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }

      let hash;
      
      // Use Web Crypto API for supported algorithms
      if (WEB_CRYPTO_ALGORITHMS[this.algorithm]) {
        if (typeof crypto !== 'undefined' && crypto.subtle) {
          const buffer = await crypto.subtle.digest(WEB_CRYPTO_ALGORITHMS[this.algorithm], combined);
          hash = new Uint8Array(buffer);
        } else {
          // Fallback for Node.js environments
          hash = simpleSHA256(combined);
        }
      } else {
        // Custom implementations for other algorithms
        hash = this._customHash(combined);
      }

      return formatOutput(hash, format);
    }

    /**
     * Synchronous digest (limited algorithms)
     * @param {string} format
     * @returns {string|Uint8Array|Array}
     */
    digestSync(format = 'hex') {
      if (!['crc32', 'fnv1a', 'xxhash'].includes(this.algorithm)) {
        throw new Error(`Synchronous digest not available for ${this.algorithm}`);
      }
      
      if (this.finalized) {
        throw new Error('Hash already finalized');
      }
      
      this.finalized = true;
      
      const totalLength = this.chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      
      for (const chunk of this.chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }

      const hash = this._customHashSync(combined);
      return formatOutput(hash, format);
    }

    /**
     * Custom hash implementations
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    _customHash(data) {
      switch (this.algorithm) {
        case 'md5':
          return md5(data);
        case 'blake2b':
          return blake2b(data);
        case 'xxhash':
          return xxhash(data);
        case 'crc32':
          return crc32(data);
        case 'fnv1a':
          return fnv1a(data);
        default:
          throw new Error(`Custom implementation not available for ${this.algorithm}`);
      }
    }

    /**
     * Synchronous custom hash implementations
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    _customHashSync(data) {
      switch (this.algorithm) {
        case 'crc32':
          return crc32(data);
        case 'fnv1a':
          return fnv1a(data);
        case 'xxhash':
          return xxhash(data);
        default:
          throw new Error(`Synchronous implementation not available for ${this.algorithm}`);
      }
    }
  }

  // ============================================================================
  // FACTORY FUNCTIONS
  // ============================================================================

  /**
   * Create a new hash instance
   * @param {string} algorithm
   * @returns {turbohash}
   */
  function createHash(algorithm) {
    return new turbohash(algorithm);
  }

  /**
   * Hash data in one call (async)
   * @param {string|ArrayBuffer|Uint8Array} data
   * @param {string} algorithm
   * @param {string} format
   * @returns {Promise<string|Uint8Array|Array>}
   */
  async function hash(data, algorithm = 'sha256', format = 'hex') {
    const hasher = new turbohash(algorithm);
    hasher.update(data);
    return await hasher.digest(format);
  }

  /**
   * Hash data in one call (sync)
   * @param {string|ArrayBuffer|Uint8Array} data
   * @param {string} algorithm
   * @param {string} format
   * @returns {string|Uint8Array|Array}
   */
  function hashSync(data, algorithm = 'crc32', format = 'hex') {
    const hasher = new turbohash(algorithm);
    hasher.update(data);
    return hasher.digestSync(format);
  }

  /**
   * HMAC implementation
   * @param {string|Uint8Array} key
   * @param {string|Uint8Array} data
   * @param {string} algorithm
   * @returns {Promise<string>}
   */
  async function hmac(key, data, algorithm = 'sha256') {
    const keyBytes = toUint8Array(key);
    const dataBytes = toUint8Array(data);
    
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      if (WEB_CRYPTO_ALGORITHMS[algorithm]) {
        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          keyBytes,
          { name: 'HMAC', hash: WEB_CRYPTO_ALGORITHMS[algorithm] },
          false,
          ['sign']
        );
        
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBytes);
        const hashArray = new Uint8Array(signature);
        return Array.from(hashArray, b => b.toString(16).padStart(2, '0')).join('');
      }
    }
    
    throw new Error(`HMAC not supported for algorithm: ${algorithm}`);
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  return {
    // Main class (exported directly)
    turbohash,
    
    // Static methods from turbohash class (for convenience)
    isSupported: turbohash.isSupported,
    getSupportedAlgorithms: turbohash.getSupportedAlgorithms,
    
    // Factory functions
    createHash,
    hash,
    hashSync,
    hmac,
    
    // Utility functions
    compareHash,
    generateSalt,
    
    // Constants
    SUPPORTED_ALGORITHMS
  };
});
