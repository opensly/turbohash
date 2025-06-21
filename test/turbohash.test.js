const turbohash = require('../index.js');

describe('TurboHash', () => {
  describe('Constants', () => {
    test('should have SUPPORTED_ALGORITHMS', () => {
      expect(turbohash.SUPPORTED_ALGORITHMS).toBeDefined();
      expect(Array.isArray(turbohash.SUPPORTED_ALGORITHMS)).toBe(true);
      expect(turbohash.SUPPORTED_ALGORITHMS).toContain('sha256');
      expect(turbohash.SUPPORTED_ALGORITHMS).toContain('md5');
    });
  });

  describe('TurboHash.isSupported', () => {
    test('should return true for supported algorithms', () => {
      expect(turbohash.isSupported('sha256')).toBe(true);
      expect(turbohash.isSupported('md5')).toBe(true);
      expect(turbohash.isSupported('crc32')).toBe(true);
    });

    test('should return false for unsupported algorithms', () => {
      expect(turbohash.isSupported('unsupported')).toBe(false);
      expect(turbohash.isSupported('')).toBe(false);
    });

    test('should be case insensitive', () => {
      expect(turbohash.isSupported('SHA256')).toBe(true);
      expect(turbohash.isSupported('Sha256')).toBe(true);
    });
  });

  describe('TurboHash.getSupportedAlgorithms', () => {
    test('should return array of supported algorithms', () => {
      const algorithms = turbohash.getSupportedAlgorithms();
      expect(Array.isArray(algorithms)).toBe(true);
      expect(algorithms.length).toBeGreaterThan(0);
      expect(algorithms).toContain('sha256');
    });
  });

  describe('createHash', () => {
    test('should create hash instance with default algorithm', () => {
      const hasher = turbohash.createHash();
      expect(hasher).toBeInstanceOf(turbohash.turbohash);
      expect(hasher.algorithm).toBe('sha256');
    });

    test('should create hash instance with specified algorithm', () => {
      const hasher = turbohash.createHash('md5');
      expect(hasher).toBeInstanceOf(turbohash.turbohash);
      expect(hasher.algorithm).toBe('md5');
    });

    test('should throw error for unsupported algorithm', () => {
      expect(() => turbohash.createHash('unsupported')).toThrow();
    });
  });

  describe('hash', () => {
    test('should hash string data', async () => {
      const result = await turbohash.hash('hello world', 'sha256', 'hex');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should hash with different formats', async () => {
      const hexResult = await turbohash.hash('test', 'sha256', 'hex');
      const base64Result = await turbohash.hash('test', 'sha256', 'base64');
      const bufferResult = await turbohash.hash('test', 'sha256', 'buffer');
      const arrayResult = await turbohash.hash('test', 'sha256', 'array');

      expect(typeof hexResult).toBe('string');
      expect(typeof base64Result).toBe('string');
      expect(bufferResult).toBeInstanceOf(Uint8Array);
      expect(Array.isArray(arrayResult)).toBe(true);
    });

    test('should use default algorithm and format', async () => {
      const result = await turbohash.hash('test');
      expect(typeof result).toBe('string');
    });
  });

  describe('hashSync', () => {
    test('should hash synchronously with supported algorithms', () => {
      const result = turbohash.hashSync('hello world', 'crc32', 'hex');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should throw error for unsupported synchronous algorithms', () => {
      expect(() => {
        turbohash.hashSync('hello world', 'sha256', 'hex');
      }).toThrow();
    });
  });

  describe('TurboHash instance', () => {
    let hasher;

    beforeEach(() => {
      hasher = turbohash.createHash('sha256');
    });

    test('should update with string data', () => {
      const result = hasher.update('hello');
      expect(result).toBe(hasher);
    });

    test('should update with Uint8Array data', () => {
      const data = new TextEncoder().encode('hello');
      const result = hasher.update(data);
      expect(result).toBe(hasher);
    });

    test('should throw error when updating finalized hash', async () => {
      await hasher.digest();
      expect(() => hasher.update('test')).toThrow();
    });

    test('should digest with different formats', async () => {
      hasher.update('test');
      const hexResult = await hasher.digest('hex');
      expect(typeof hexResult).toBe('string');
    });

    test('should throw error when digesting twice', async () => {
      await hasher.digest();
      await expect(hasher.digest()).rejects.toThrow();
    });

    test('should digest synchronously with supported algorithms', () => {
      const syncHasher = turbohash.createHash('crc32');
      syncHasher.update('test');
      const result = syncHasher.digestSync('hex');
      expect(typeof result).toBe('string');
    });
  });

  describe('hmac', () => {
    test('should create HMAC', async () => {
      const result = await turbohash.hmac('key', 'message', 'sha256');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should use default algorithm', async () => {
      const result = await turbohash.hmac('key', 'message');
      expect(typeof result).toBe('string');
    });
  });

  describe('compareHash', () => {
    test('should return true for identical hashes', () => {
      const hash1 = 'a1b2c3d4e5f6';
      const hash2 = 'a1b2c3d4e5f6';
      expect(turbohash.compareHash(hash1, hash2)).toBe(true);
    });

    test('should return false for different hashes', () => {
      const hash1 = 'a1b2c3d4e5f6';
      const hash2 = 'f6e5d4c3b2a1';
      expect(turbohash.compareHash(hash1, hash2)).toBe(false);
    });

    test('should return false for different length hashes', () => {
      const hash1 = 'a1b2c3d4e5f6';
      const hash2 = 'a1b2c3d4e5f6g7';
      expect(turbohash.compareHash(hash1, hash2)).toBe(false);
    });
  });

  describe('generateSalt', () => {
    test('should generate salt with default length', () => {
      const salt = turbohash.generateSalt();
      expect(typeof salt).toBe('string');
      expect(salt.length).toBe(32); // 16 bytes = 32 hex chars
    });

    test('should generate salt with specified length', () => {
      const salt = turbohash.generateSalt(32);
      expect(typeof salt).toBe('string');
      expect(salt.length).toBe(64); // 32 bytes = 64 hex chars
    });

    test('should generate different salts', () => {
      const salt1 = turbohash.generateSalt();
      const salt2 = turbohash.generateSalt();
      expect(salt1).not.toBe(salt2);
    });
  });

  describe('Algorithm implementations', () => {
    test('should work with SHA-256', async () => {
      const result = await turbohash.hash('test', 'sha256', 'hex');
      expect(result).toBeDefined();
    });

    test('should work with MD5', async () => {
      const result = await turbohash.hash('test', 'md5', 'hex');
      expect(result).toBeDefined();
    });

    test('should work with CRC32', async () => {
      const result = await turbohash.hash('test', 'crc32', 'hex');
      expect(result).toBeDefined();
    });

    test('should work with FNV-1a', async () => {
      const result = await turbohash.hash('test', 'fnv1a', 'hex');
      expect(result).toBeDefined();
    });

    test('should work with XXHash', async () => {
      const result = await turbohash.hash('test', 'xxhash', 'hex');
      expect(result).toBeDefined();
    });
  });

  describe('Error handling', () => {
    test('should handle invalid data types', () => {
      const hasher = turbohash.createHash();
      expect(() => hasher.update(null)).toThrow();
      expect(() => hasher.update(undefined)).toThrow();
      expect(() => hasher.update(123)).toThrow();
    });

    test('should handle invalid formats', async () => {
      const hasher = turbohash.createHash();
      hasher.update('test');
      await expect(hasher.digest('invalid')).rejects.toThrow();
    });
  });
}); 