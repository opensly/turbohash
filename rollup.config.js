import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default [
  // ESM build
  {
    input: 'index.js',
    output: {
      file: 'dist/turbohash.esm.js',
      format: 'esm',
      name: 'turbohash',
      globals: {}
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '12',
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
            }
          }]
        ]
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        sourceMap: true
      })
    ],
    external: []
  },
  // UMD build
  {
    input: 'index.js',
    output: {
      file: 'dist/turbohash.umd.js',
      format: 'umd',
      name: 'turbohash',
      globals: {}
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '12',
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
            }
          }]
        ]
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        sourceMap: true
      })
    ],
    external: []
  },
  // CommonJS build
  {
    input: 'index.js',
    output: {
      file: 'dist/turbohash.cjs',
      format: 'cjs',
      name: 'turbohash',
      globals: {}
    },
    plugins: [
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {
            targets: {
              node: '12',
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
            }
          }]
        ]
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        sourceMap: true
      })
    ],
    external: []
  }
]; 