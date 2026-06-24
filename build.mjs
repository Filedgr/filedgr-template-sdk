// Build script: bundles the SDK with esbuild and emits type declarations with tsc.
// Replaces microbundle, whose pinned @babel toolchain carried unpatchable advisories.
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import * as esbuild from 'esbuild'

rmSync('dist', { recursive: true, force: true })

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  target: 'es2017',
  sourcemap: false,
  logLevel: 'info',
}

// Runtime dependencies stay external for the package builds so consumers
// dedupe their own copy; the UMD bundle is self-contained for CDN/<script> use.
const external = ['cross-fetch']

await esbuild.build({
  ...shared,
  format: 'cjs',
  platform: 'node',
  outfile: 'dist/index.js',
  external,
})

await esbuild.build({
  ...shared,
  format: 'esm',
  platform: 'neutral',
  outfile: 'dist/index.m.js',
  external,
})

await esbuild.build({
  ...shared,
  format: 'iife',
  platform: 'browser',
  globalName: 'FiledGrTemplateSDK',
  minify: true,
  outfile: 'dist/index.umd.js',
})

execSync(
  'tsc -p tsconfig.json --emitDeclarationOnly --declaration --incremental false --outDir dist',
  { stdio: 'inherit' }
)
