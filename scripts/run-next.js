#!/usr/bin/env node
const { spawn } = require('node:child_process');

const mode = process.argv[2] ?? 'dev';
const extraArgs = process.argv.slice(3);

const host = process.env.HOST || '0.0.0.0';
const defaultPort = mode === 'dev' ? '3000' : '3000';
const port = process.env.PORT || defaultPort;

const nextBin = require.resolve('next/dist/bin/next');

const child = spawn(process.execPath, [nextBin, mode, '-H', host, '-p', port, ...extraArgs], {
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
