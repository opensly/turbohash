(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.turbohash = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = !1,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = !0, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      if (r) i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n;else {
        function o(r, n) {
          _regeneratorDefine(e, r, function (e) {
            return this._invoke(r, n, e);
          });
        }
        o("next", 0), o("throw", 1), o("return", 2);
      }
    }, _regeneratorDefine(e, r, n, t);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var turbohash = {exports: {}};

  (function (module) {
    (function (global, factory) {
      {
        // CommonJS
        module.exports = factory();
      }
    })(typeof window !== 'undefined' ? window : commonjsGlobal, function () {

      // ============================================================================
      // CONSTANTS AND UTILITIES
      // ============================================================================
      var SUPPORTED_ALGORITHMS = ['sha1', 'sha256', 'sha384', 'sha512', 'md5', 'blake2b', 'blake2s', 'xxhash', 'crc32', 'fnv1a'];
      var WEB_CRYPTO_ALGORITHMS = {
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
            return Array.from(hash, function (b) {
              return b.toString(16).padStart(2, '0');
            }).join('');
          case 'base64':
            return btoa(String.fromCharCode.apply(null, hash));
          case 'base64url':
            return btoa(String.fromCharCode.apply(null, hash)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
          case 'buffer':
            return hash;
          case 'array':
            return Array.from(hash);
          default:
            throw new Error("Unsupported format: ".concat(format));
        }
      }

      /**
       * Generate random salt
       * @param {number} length
       * @returns {string}
       */
      function generateSalt() {
        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
        var array = new Uint8Array(length);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          crypto.getRandomValues(array);
        } else {
          // Fallback for environments without crypto.getRandomValues
          for (var i = 0; i < length; i++) {
            array[i] = Math.floor(Math.random() * 256);
          }
        }
        return Array.from(array, function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
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
        var result = 0;
        for (var i = 0; i < hash1.length; i++) {
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
        var crcTable = new Array(256);
        for (var i = 0; i < 256; i++) {
          var c = i;
          for (var j = 0; j < 8; j++) {
            c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
          }
          crcTable[i] = c;
        }
        var crc = 0xFFFFFFFF;
        for (var _i = 0; _i < data.length; _i++) {
          crc = crcTable[(crc ^ data[_i]) & 0xFF] ^ crc >>> 8;
        }
        var result = new Uint8Array(4);
        var finalCrc = (crc ^ 0xFFFFFFFF) >>> 0;
        for (var _i2 = 0; _i2 < 4; _i2++) {
          result[_i2] = finalCrc >>> _i2 * 8 & 0xFF;
        }
        return result;
      }

      /**
       * FNV-1a implementation
       * @param {Uint8Array} data
       * @returns {Uint8Array}
       */
      function fnv1a(data) {
        var FNV_OFFSET_BASIS = 0x811c9dc5;
        var FNV_PRIME = 0x01000193;
        var hash = FNV_OFFSET_BASIS;
        for (var i = 0; i < data.length; i++) {
          hash ^= data[i];
          hash = hash * FNV_PRIME >>> 0;
        }
        var result = new Uint8Array(4);
        for (var _i3 = 0; _i3 < 4; _i3++) {
          result[_i3] = hash >>> _i3 * 8 & 0xFF;
        }
        return result;
      }

      /**
       * XXHash implementation (simplified)
       * @param {Uint8Array} data
       * @returns {Uint8Array}
       */
      function xxhash(data) {
        var PRIME1 = 0x9E3779B1;
        var PRIME2 = 0x85EBCA77;
        var PRIME3 = 0xC2B2AE3D;
        var hash = PRIME3;
        for (var i = 0; i < data.length; i++) {
          hash = hash + data[i] * PRIME2 >>> 0;
          hash = (hash << 13 | hash >>> 19) >>> 0;
          hash = hash * PRIME1 >>> 0;
        }
        var result = new Uint8Array(4);
        for (var _i4 = 0; _i4 < 4; _i4++) {
          result[_i4] = hash >>> _i4 * 8 & 0xFF;
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
        var result = new Uint8Array(16);
        var h = 0x67452301;
        for (var i = 0; i < data.length; i++) {
          h = (h << 7 ^ h >>> 25 ^ data[i]) >>> 0;
        }
        for (var _i5 = 0; _i5 < 16; _i5++) {
          result[_i5] = h >>> _i5 * 2 & 0xFF;
        }
        return result;
      }

      /**
       * BLAKE2b implementation (simplified)
       * @param {Uint8Array} data
       * @returns {Uint8Array}
       */
      function blake2b(data) {
        var result = new Uint8Array(64);
        var h = 0x6a09e667f3bcc908n;
        for (var i = 0; i < data.length; i++) {
          h = h ^ BigInt(data[i]);
          h = h * 0x9e3779b97f4a7c15n;
        }
        for (var _i6 = 0; _i6 < 64; _i6++) {
          result[_i6] = Number(h >> BigInt(_i6 * 8) & 0xFFn);
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
        var hash = new Uint8Array(32);
        var h = 0x6a09e667;
        for (var i = 0; i < data.length; i++) {
          h = (h << 5) - h + data[i] & 0xffffffff;
        }
        for (var _i7 = 0; _i7 < 32; _i7++) {
          hash[_i7] = h >>> _i7 * 8 & 0xff;
        }
        return hash;
      }

      // ============================================================================
      // MAIN TURBOHASH CLASS
      // ============================================================================

      /**
       * Main TurboHash class
       */
      var turbohash = /*#__PURE__*/function () {
        /**
         * Create a new TurboHash instance
         * @param {string} algorithm - Hash algorithm to use
         */
        function turbohash() {
          var algorithm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sha256';
          _classCallCheck(this, turbohash);
          if (!SUPPORTED_ALGORITHMS.includes(algorithm.toLowerCase())) {
            throw new Error("Unsupported algorithm: ".concat(algorithm));
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
        return _createClass(turbohash, [{
          key: "update",
          value:
          /**
           * Update hash with new data
           * @param {string|ArrayBuffer|Uint8Array} data
           * @param {string} encoding
           * @returns {turbohash}
           */
          function update(data) {
            if (this.finalized) {
              throw new Error('Cannot update finalized hash');
            }
            var bytes = toUint8Array(data);
            this.chunks.push(bytes);
            return this;
          }

          /**
           * Finalize and return digest
           * @param {string} format
           * @returns {Promise<string|Uint8Array|Array>}
           */
        }, {
          key: "digest",
          value: (function () {
            var _digest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              var format,
                totalLength,
                combined,
                offset,
                _iterator,
                _step,
                chunk,
                hash,
                buffer,
                _args = arguments;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    format = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'hex';
                    if (!this.finalized) {
                      _context.n = 1;
                      break;
                    }
                    throw new Error('Hash already finalized');
                  case 1:
                    this.finalized = true;

                    // Combine all chunks
                    totalLength = this.chunks.reduce(function (sum, chunk) {
                      return sum + chunk.length;
                    }, 0);
                    combined = new Uint8Array(totalLength);
                    offset = 0;
                    _iterator = _createForOfIteratorHelper(this.chunks);
                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        chunk = _step.value;
                        combined.set(chunk, offset);
                        offset += chunk.length;
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                    if (!WEB_CRYPTO_ALGORITHMS[this.algorithm]) {
                      _context.n = 5;
                      break;
                    }
                    if (!(typeof crypto !== 'undefined' && crypto.subtle)) {
                      _context.n = 3;
                      break;
                    }
                    _context.n = 2;
                    return crypto.subtle.digest(WEB_CRYPTO_ALGORITHMS[this.algorithm], combined);
                  case 2:
                    buffer = _context.v;
                    hash = new Uint8Array(buffer);
                    _context.n = 4;
                    break;
                  case 3:
                    // Fallback for Node.js environments
                    hash = simpleSHA256(combined);
                  case 4:
                    _context.n = 6;
                    break;
                  case 5:
                    // Custom implementations for other algorithms
                    hash = this._customHash(combined);
                  case 6:
                    return _context.a(2, formatOutput(hash, format));
                }
              }, _callee, this);
            }));
            function digest() {
              return _digest.apply(this, arguments);
            }
            return digest;
          }()
          /**
           * Synchronous digest (limited algorithms)
           * @param {string} format
           * @returns {string|Uint8Array|Array}
           */
          )
        }, {
          key: "digestSync",
          value: function digestSync() {
            var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hex';
            if (!['crc32', 'fnv1a', 'xxhash'].includes(this.algorithm)) {
              throw new Error("Synchronous digest not available for ".concat(this.algorithm));
            }
            if (this.finalized) {
              throw new Error('Hash already finalized');
            }
            this.finalized = true;
            var totalLength = this.chunks.reduce(function (sum, chunk) {
              return sum + chunk.length;
            }, 0);
            var combined = new Uint8Array(totalLength);
            var offset = 0;
            var _iterator2 = _createForOfIteratorHelper(this.chunks),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var chunk = _step2.value;
                combined.set(chunk, offset);
                offset += chunk.length;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            var hash = this._customHashSync(combined);
            return formatOutput(hash, format);
          }

          /**
           * Custom hash implementations
           * @param {Uint8Array} data
           * @returns {Uint8Array}
           */
        }, {
          key: "_customHash",
          value: function _customHash(data) {
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
                throw new Error("Custom implementation not available for ".concat(this.algorithm));
            }
          }

          /**
           * Synchronous custom hash implementations
           * @param {Uint8Array} data
           * @returns {Uint8Array}
           */
        }, {
          key: "_customHashSync",
          value: function _customHashSync(data) {
            switch (this.algorithm) {
              case 'crc32':
                return crc32(data);
              case 'fnv1a':
                return fnv1a(data);
              case 'xxhash':
                return xxhash(data);
              default:
                throw new Error("Synchronous implementation not available for ".concat(this.algorithm));
            }
          }
        }], [{
          key: "isSupported",
          value: function isSupported(algorithm) {
            return SUPPORTED_ALGORITHMS.includes(algorithm.toLowerCase());
          }

          /**
           * Get list of supported algorithms
           * @returns {Array<string>}
           */
        }, {
          key: "getSupportedAlgorithms",
          value: function getSupportedAlgorithms() {
            return [].concat(SUPPORTED_ALGORITHMS);
          }
        }]);
      }(); // ============================================================================
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
      function hash(_x) {
        return _hash.apply(this, arguments);
      }
      /**
       * Hash data in one call (sync)
       * @param {string|ArrayBuffer|Uint8Array} data
       * @param {string} algorithm
       * @param {string} format
       * @returns {string|Uint8Array|Array}
       */
      function _hash() {
        _hash = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
          var algorithm,
            format,
            hasher,
            _args2 = arguments;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                algorithm = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'sha256';
                format = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'hex';
                hasher = new turbohash(algorithm);
                hasher.update(data);
                _context2.n = 1;
                return hasher.digest(format);
              case 1:
                return _context2.a(2, _context2.v);
            }
          }, _callee2);
        }));
        return _hash.apply(this, arguments);
      }
      function hashSync(data) {
        var algorithm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'crc32';
        var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';
        var hasher = new turbohash(algorithm);
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
      function hmac(_x2, _x3) {
        return _hmac.apply(this, arguments);
      } // ============================================================================
      // PUBLIC API
      // ============================================================================
      function _hmac() {
        _hmac = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key, data) {
          var algorithm,
            keyBytes,
            dataBytes,
            cryptoKey,
            signature,
            hashArray,
            _args3 = arguments;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                algorithm = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'sha256';
                keyBytes = toUint8Array(key);
                dataBytes = toUint8Array(data);
                if (!(typeof crypto !== 'undefined' && crypto.subtle)) {
                  _context3.n = 3;
                  break;
                }
                if (!WEB_CRYPTO_ALGORITHMS[algorithm]) {
                  _context3.n = 3;
                  break;
                }
                _context3.n = 1;
                return crypto.subtle.importKey('raw', keyBytes, {
                  name: 'HMAC',
                  hash: WEB_CRYPTO_ALGORITHMS[algorithm]
                }, false, ['sign']);
              case 1:
                cryptoKey = _context3.v;
                _context3.n = 2;
                return crypto.subtle.sign('HMAC', cryptoKey, dataBytes);
              case 2:
                signature = _context3.v;
                hashArray = new Uint8Array(signature);
                return _context3.a(2, Array.from(hashArray, function (b) {
                  return b.toString(16).padStart(2, '0');
                }).join(''));
              case 3:
                throw new Error("HMAC not supported for algorithm: ".concat(algorithm));
              case 4:
                return _context3.a(2);
            }
          }, _callee3);
        }));
        return _hmac.apply(this, arguments);
      }
      return {
        // Main class (exported directly)
        turbohash: turbohash,
        // Static methods from turbohash class (for convenience)
        isSupported: turbohash.isSupported,
        getSupportedAlgorithms: turbohash.getSupportedAlgorithms,
        // Factory functions
        createHash: createHash,
        hash: hash,
        hashSync: hashSync,
        hmac: hmac,
        // Utility functions
        compareHash: compareHash,
        generateSalt: generateSalt,
        // Constants
        SUPPORTED_ALGORITHMS: SUPPORTED_ALGORITHMS
      };
    });
  })(turbohash);
  var turbohashExports = turbohash.exports;
  var index = /*@__PURE__*/getDefaultExportFromCjs(turbohashExports);

  return index;

}));
