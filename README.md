# Confetti Notifier

A macOS full-screen confetti animation triggered from the command line. The window is transparent except for the confetti particles, allowing your desktop to remain visible.

## Installation

```bash
npm install
```

## Usage

Basic usage with required duration parameter:

```bash
node index.js --duration 3000
```

Full example with all parameters:

```bash
node index.js --duration 3000 --location TR --text ✅🚧❌
```

## Parameters

### Required

- `--duration <milliseconds>`: Duration of the confetti animation

### Optional

- `--particleCount <number>`: Number of confetti particles (default: 50)
- `--angle <degrees>`: Launch angle in degrees (0-360, default: depends on location)
- `--spread <degrees>`: Angular spread of particles (default: 45)
- `--velocity <number>`: Initial launch velocity in pixels, controls how far particles travel (default: 45, try 60-100 for longer distance)
- `--text <string>`: Custom emoji or text characters to use as confetti shapes
- `--location <position>`: Launch position. Options:
  - `T`: Top center
  - `TR`: Top right
  - `R`: Right center
  - `BR`: Bottom right
  - `B`: Bottom center (default)
  - `BL`: Bottom left
  - `L`: Left center
  - `TL`: Top left

## Examples

### Basic confetti from bottom
```bash
node index.js --duration 2000
```

### Confetti from top-right corner
```bash
node index.js --duration 3000 --location TR
```

### Custom emoji confetti
```bash
node index.js --duration 4000 --text 🎉✨🎊
```

### Status indicators from top
```bash
node index.js --duration 3000 --location T --text ✅❌⚠️
```

### High particle count explosion
```bash
node index.js --duration 5000 --particleCount 300 --spread 120
```

### Longer distance confetti
```bash
node index.js --duration 4000 --velocity 80 --location TR --text 🎉
```

## How It Works

1. The CLI script (`index.js`) parses your command-line arguments
2. Electron launches a transparent, fullscreen window that floats above all other windows
3. The canvas-confetti library renders the animation with your specified parameters
4. The window automatically closes after the animation completes

## Technical Details

- Built with Electron for native macOS transparent window support
- Uses canvas-confetti library for physics-based particle animation
- Text/emoji converted to confetti shapes using `confetti.shapeFromText()`
- Window is click-through, so you can still interact with your desktop
- Auto-closes after animation duration + 500ms buffer

## License

MIT
