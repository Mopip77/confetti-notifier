#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.substring(2);
      const value = args[i + 1];

      if (key === 'duration') {
        config.duration = parseInt(value, 10);
        i++;
      } else if (key === 'particleCount') {
        config.particleCount = parseInt(value, 10);
        i++;
      } else if (key === 'angle') {
        config.angle = parseInt(value, 10);
        i++;
      } else if (key === 'spread') {
        config.spread = parseInt(value, 10);
        i++;
      } else if (key === 'velocity') {
        config.velocity = parseInt(value, 10);
        i++;
      } else if (key === 'text') {
        config.text = value;
        i++;
      } else if (key === 'location') {
        config.location = value;
        i++;
      }
    }
  }

  return config;
}

// Validate required arguments
function validateConfig(config) {
  if (!config.duration) {
    console.error('Error: --duration is required');
    console.log('Usage: node index.js --duration <ms> [--particleCount <n>] [--angle <degrees>] [--spread <degrees>] [--velocity <n>] [--text <emoji>] [--location <T|TR|R|BR|B|BL|L|TL>]');
    process.exit(1);
  }

  if (config.location && !['T', 'TR', 'R', 'BR', 'B', 'BL', 'L', 'TL'].includes(config.location)) {
    console.error('Error: --location must be one of: T, TR, R, BR, B, BL, L, TL');
    process.exit(1);
  }
}

const config = parseArgs();
validateConfig(config);

// Launch Electron with config
const electronPath = require('electron');
const appPath = __dirname;

const electron = spawn(electronPath, [appPath, JSON.stringify(config)], {
  stdio: 'inherit'
});

electron.on('close', (code) => {
  process.exit(code);
});
