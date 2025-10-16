# Battery Saver - Usage Guide

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Battery Saving Modes](#battery-saving-modes)
- [CSS Classes and Utilities](#css-classes-and-utilities)
- [Advanced Usage](#advanced-usage)
- [Browser Support](#browser-support)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

Battery Saver is a lightweight JavaScript library that automatically reduces animations, transitions, and other power-consuming visual effects based on the device's battery level. This helps improve battery life on mobile devices and laptops while maintaining a good user experience.

### Key Features

- 🔋 Automatic battery level detection using the Battery API
- 🎨 Progressive animation reduction based on battery thresholds
- ⚙️ Customizable thresholds and modes
- 💾 Persistent settings using localStorage
- 🎯 CSS utility classes for easy integration
- 📱 Mobile and desktop support
- ⚡ Zero dependencies
- 🔌 Event-driven architecture

## Installation

### Option 1: Direct Download

Download `battery-saver.js` and `battery-saver.css` and include them in your HTML:

```html
<link rel="stylesheet" href="battery-saver.css">
<script src="battery-saver.js"></script>
```

### Option 2: CDN (when available)

```html
<link rel="stylesheet" href="https://cdn.example.com/battery-saver.css">
<script src="https://cdn.example.com/battery-saver.js"></script>
```

### Option 3: NPM (when available)

```bash
npm install battery-saver
```

```javascript
import BatterySaver from 'battery-saver';
import 'battery-saver/battery-saver.css';
```

## Quick Start

### Auto-Initialization

The simplest way to use Battery Saver is with auto-initialization:

```html
<!DOCTYPE html>
<html lang="en" data-battery-saver-auto>
<head>
    <link rel="stylesheet" href="battery-saver.css">
</head>
<body>
    <!-- Your content -->
    
    <script src="battery-saver.js"></script>
</body>
</html>
```

That's it! Battery Saver will automatically initialize and start monitoring battery levels.

### Manual Initialization

For more control, initialize manually:

```javascript
// Create a new instance with default settings
const batterySaver = new BatterySaver();

// Or with custom configuration
const batterySaver = new BatterySaver({
    enabled: true,
    thresholds: {
        critical: 10,
        low: 25,
        medium: 50
    }
});
```

## Configuration

### Default Configuration

```javascript
{
    enabled: true,
    thresholds: {
        critical: 15,    // Below 15%: Maximum battery saving
        low: 30,         // Below 30%: Aggressive battery saving
        medium: 50       // Below 50%: Moderate battery saving
    },
    modes: {
        critical: {
            animationDuration: 0,
            transitionDuration: 0,
            disableParallax: true,
            disableVideoAutoplay: true,
            reduceShadows: true,
            reduceBlur: true,
            reduceGradients: true,
            frameRate: 30
        },
        low: {
            animationDuration: 0.2,
            transitionDuration: 0.15,
            disableParallax: true,
            disableVideoAutoplay: true,
            reduceShadows: true,
            reduceBlur: true,
            reduceGradients: false,
            frameRate: 30
        },
        medium: {
            animationDuration: 0.5,
            transitionDuration: 0.3,
            disableParallax: true,
            disableVideoAutoplay: false,
            reduceShadows: false,
            reduceBlur: false,
            reduceGradients: false,
            frameRate: 60
        },
        normal: {
            animationDuration: null,  // Use original values
            transitionDuration: null,
            disableParallax: false,
            disableVideoAutoplay: false,
            reduceShadows: false,
            reduceBlur: false,
            reduceGradients: false,
            frameRate: 60
        }
    },
    storageKey: 'battery-saver-settings',
    updateInterval: 30000  // Check battery every 30 seconds
}
```

### Customizing Configuration

```javascript
const batterySaver = new BatterySaver({
    // Only enable on mobile devices
    enabled: /Mobi|Android/i.test(navigator.userAgent),
    
    // Custom thresholds
    thresholds: {
        critical: 10,
        low: 25,
        medium: 60
    },
    
    // Check battery more frequently
    updateInterval: 10000  // 10 seconds
});
```

## API Reference

### Constructor

```javascript
new BatterySaver(config)
```

Creates a new Battery Saver instance with optional configuration.

### Methods

#### `init()`

Initializes the Battery Saver. Called automatically by constructor if enabled.

```javascript
batterySaver.init();
```

#### `enable()`

Enables Battery Saver and starts monitoring.

```javascript
batterySaver.enable();
```

#### `disable()`

Disables Battery Saver and restores normal mode.

```javascript
batterySaver.disable();
```

#### `toggle()`

Toggles Battery Saver on/off. Returns the new state.

```javascript
const isEnabled = batterySaver.toggle();
```

#### `isEnabled()`

Checks if Battery Saver is enabled.

```javascript
if (batterySaver.isEnabled()) {
    console.log('Battery Saver is active');
}
```

#### `getStatus()`

Gets the current status.

```javascript
const status = batterySaver.getStatus();
// Returns:
// {
//     enabled: true,
//     mode: 'low',
//     batteryLevel: 25,
//     isCharging: false,
//     modeConfig: { ... }
// }
```

#### `setMode(mode)`

Manually set a specific mode. Useful for testing.

```javascript
batterySaver.setMode('critical');
// Valid modes: 'normal', 'medium', 'low', 'critical'
```

#### `updateThresholds(thresholds)`

Update battery thresholds.

```javascript
batterySaver.updateThresholds({
    critical: 10,
    low: 30,
    medium: 60
});
```

#### `on(eventName, callback)`

Listen to events.

```javascript
batterySaver.on('modeChange', (data) => {
    console.log('Mode changed:', data);
});

batterySaver.on('batteryChange', (data) => {
    console.log('Battery level:', data.level);
});
```

#### `off(eventName, callback)`

Remove event listener.

```javascript
const handler = (data) => console.log(data);
batterySaver.on('modeChange', handler);
batterySaver.off('modeChange', handler);
```

#### `destroy()`

Destroys the Battery Saver instance.

```javascript
batterySaver.destroy();
```

### Events

#### `modeChange`

Fired when the battery saving mode changes.

```javascript
batterySaver.on('modeChange', (data) => {
    console.log('Previous mode:', data.previousMode);
    console.log('Current mode:', data.currentMode);
    console.log('Mode config:', data.modeConfig);
});
```

#### `batteryChange`

Fired when battery level or charging status changes.

```javascript
batterySaver.on('batteryChange', (data) => {
    console.log('Battery level:', data.level);
    console.log('Charging:', data.isCharging);
    console.log('Current mode:', data.mode);
});
```

## Battery Saving Modes

### Normal Mode (>50% or charging)

All animations and effects work normally. No power-saving restrictions.

**Features:**
- Full animation durations
- All GPU effects enabled
- Parallax effects active
- Video autoplay allowed

### Medium Mode (30-50%)

Moderate battery saving with noticeable but acceptable animation reduction.

**Features:**
- Animation duration: 0.5s
- Transition duration: 0.3s
- Parallax disabled
- All other effects active

### Low Mode (15-30%)

Aggressive battery saving with minimal animations.

**Features:**
- Animation duration: 0.2s
- Transition duration: 0.15s
- Parallax disabled
- Video autoplay disabled
- Shadows removed
- Blur effects removed
- Frame rate capped at 30fps

### Critical Mode (<15%)

Maximum battery saving. Almost all visual effects disabled.

**Features:**
- Animations completely disabled
- Transitions completely disabled
- All shadows, blurs, and gradients removed
- Parallax disabled
- Video autoplay disabled
- Frame rate capped at 30fps

## CSS Classes and Utilities

### Applied Automatically

These classes are automatically applied by Battery Saver:

```css
/* Applied when any battery saving mode is active */
.battery-saver-active { }

/* Applied when shadows should be reduced */
.battery-saver-reduce-shadows { }

/* Applied when blur effects should be reduced */
.battery-saver-reduce-blur { }

/* Applied when gradients should be simplified */
.battery-saver-reduce-gradients { }

/* Applied when motion should be minimized */
.battery-saver-reduce-motion { }
```

### HTML Attributes

```html
<!-- Current mode is set as a data attribute -->
<html data-battery-saver-mode="low">
```

### Manual CSS Classes

Use these classes in your own CSS:

```css
/* Opt-in to battery saver optimizations */
.battery-saver-enabled {
    animation-duration: var(--battery-saver-animation-duration);
    transition-duration: var(--battery-saver-transition-duration);
}

/* Exclude critical elements from battery saver */
.battery-saver-exclude {
    animation-duration: inherit !important;
    transition-duration: inherit !important;
}

/* GPU-accelerated animations */
.battery-saver-gpu-accelerated {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
```

### CSS Custom Properties

Battery Saver exposes CSS variables for dynamic control:

```css
:root {
    --battery-saver-animation-duration: 1s;
    --battery-saver-transition-duration: 0.3s;
    --battery-saver-frame-interval: 16.67ms;
}

/* Use in your CSS */
.my-animation {
    animation-duration: var(--battery-saver-animation-duration);
    transition-duration: var(--battery-saver-transition-duration);
}
```

## Advanced Usage

### Conditional Animations

Create animations that adapt to battery level:

```css
/* Normal animation */
.element {
    animation: slide 2s ease infinite;
}

/* Reduced animation in battery saver mode */
html[data-battery-saver-mode="low"] .element,
html[data-battery-saver-mode="critical"] .element {
    animation: slide-simple 0.5s linear infinite;
}
```

### Protecting Critical Animations

Prevent certain animations from being reduced:

```html
<div class="battery-saver-exclude important-animation">
    Critical UI element
</div>
```

### Custom Mode Detection

React to mode changes in your code:

```javascript
batterySaver.on('modeChange', (data) => {
    if (data.currentMode === 'critical') {
        // Disable expensive features
        disableParticleEffects();
        pauseBackgroundVideo();
    } else {
        // Re-enable features
        enableParticleEffects();
        resumeBackgroundVideo();
    }
});
```

### Framework Integration

#### React

```javascript
import { useEffect, useState } from 'react';
import BatterySaver from './battery-saver';

function App() {
    const [batterySaver] = useState(() => new BatterySaver());
    const [mode, setMode] = useState('normal');

    useEffect(() => {
        const handleModeChange = (data) => {
            setMode(data.currentMode);
        };

        batterySaver.on('modeChange', handleModeChange);
        return () => {
            batterySaver.off('modeChange', handleModeChange);
            batterySaver.destroy();
        };
    }, [batterySaver]);

    return (
        <div className="app" data-battery-mode={mode}>
            {/* Your app */}
        </div>
    );
}
```

#### Vue

```javascript
import BatterySaver from './battery-saver';

export default {
    data() {
        return {
            batterySaver: null,
            mode: 'normal'
        };
    },
    mounted() {
        this.batterySaver = new BatterySaver();
        this.batterySaver.on('modeChange', (data) => {
            this.mode = data.currentMode;
        });
    },
    beforeUnmount() {
        this.batterySaver?.destroy();
    }
};
```

## Browser Support

### Battery API Support

The Battery API is supported in:
- Chrome 38+
- Edge 79+
- Firefox 43+ (behind flag)
- Opera 25+

**Note:** Battery API is **not supported** in Safari and iOS browsers.

### Fallback Behavior

On browsers without Battery API support:
- Battery Saver will still work using CSS classes and manual mode setting
- Automatic battery level detection won't work
- You can still manually set modes or use `prefers-reduced-motion` media query

### Feature Detection

```javascript
if ('getBattery' in navigator) {
    const batterySaver = new BatterySaver();
} else {
    console.log('Battery API not supported');
    // Fall back to reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('battery-saver-reduce-motion');
    }
}
```

## Best Practices

### 1. Use GPU-Accelerated Properties

Prefer `transform` and `opacity` over layout-affecting properties:

```css
/* Good - GPU accelerated */
.element {
    transform: translateX(100px);
    opacity: 0.5;
}

/* Avoid - triggers layout */
.element {
    left: 100px;
    width: 500px;
}
```

### 2. Optimize Animations for Battery Saving

Design animations with battery saving in mind:

```css
/* Provide a simple fallback */
.fancy-animation {
    animation: complex-effect 3s ease;
}

html[data-battery-saver-mode] .fancy-animation {
    animation: simple-effect 0.5s ease;
}
```

### 3. Test on Real Devices

Battery behavior varies across devices. Test on actual hardware with different battery levels.

### 4. Respect User Preferences

Check for `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 5. Monitor Performance

Use browser DevTools to check:
- Paint operations
- Composite layers
- Frame rate
- CPU usage

## Examples

### Example 1: Simple Integration

```html
<!DOCTYPE html>
<html data-battery-saver-auto>
<head>
    <link rel="stylesheet" href="battery-saver.css">
    <style>
        .box {
            animation: spin 2s linear infinite;
        }
    </style>
</head>
<body>
    <div class="box">Animated Box</div>
    <script src="battery-saver.js"></script>
</body>
</html>
```

### Example 2: With UI Controls

```html
<div class="controls">
    <label>
        <input type="checkbox" id="toggle-battery-saver" checked>
        Enable Battery Saver
    </label>
    
    <div id="status">
        Battery: <span id="level">--</span>%
        Mode: <span id="mode">--</span>
    </div>
</div>

<script>
const batterySaver = new BatterySaver();

document.getElementById('toggle-battery-saver').addEventListener('change', (e) => {
    batterySaver.toggle();
});

batterySaver.on('batteryChange', (data) => {
    document.getElementById('level').textContent = data.level;
    document.getElementById('mode').textContent = data.mode;
});
</script>
```

### Example 3: Custom Animations

```css
/* Define multiple animation versions */
@keyframes fancy-animation {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.5); }
}

@keyframes simple-animation {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Use fancy animation by default */
.element {
    animation: fancy-animation 2s ease infinite;
}

/* Switch to simple animation in battery saving mode */
html[data-battery-saver-mode="low"] .element,
html[data-battery-saver-mode="critical"] .element {
    animation: simple-animation 1s ease infinite;
}
```

### Example 4: Progressive Enhancement

```javascript
// Start with basic functionality
const basicMode = true;

// Enhance with battery saving if supported
if ('getBattery' in navigator) {
    const batterySaver = new BatterySaver();
    
    batterySaver.on('modeChange', (data) => {
        // Adjust features based on mode
        if (data.currentMode === 'critical') {
            disableNonEssentialFeatures();
        }
    });
}
```

### Example 5: Analytics Integration

```javascript
const batterySaver = new BatterySaver();

batterySaver.on('modeChange', (data) => {
    // Track mode changes
    analytics.track('Battery Mode Changed', {
        previousMode: data.previousMode,
        currentMode: data.currentMode,
        batteryLevel: batterySaver.getStatus().batteryLevel
    });
});
```

## Troubleshooting

### Battery Level Shows 100% on Desktop

This is normal. Many desktop browsers report 100% battery when connected to AC power.

### Animations Not Reducing

1. Check if Battery Saver is enabled: `batterySaver.isEnabled()`
2. Verify CSS file is loaded
3. Check browser console for errors
4. Ensure Battery API is supported

### Styles Not Applying

Make sure `battery-saver.css` is loaded before your custom styles, or use `!important` in your CSS rules.

### Events Not Firing

Battery API updates are throttled. Events may not fire immediately after battery level changes.

## Contributing

We welcome contributions! Please see our GitHub repository for guidelines.

## License

MIT License - See LICENSE file for details.

## Support

- GitHub Issues: https://github.com/Exaload/battery-saver/issues
- Documentation: https://github.com/Exaload/battery-saver

---

Made with ⚡ by the Battery Saver team
