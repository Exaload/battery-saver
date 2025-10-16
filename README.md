# ⚡ Battery Saver

> Intelligent animation and transition reduction based on device battery level

Battery Saver is a lightweight JavaScript library that automatically optimizes your website's performance by reducing animations, transitions, and other power-consuming visual effects based on the user's battery level. Perfect for improving battery life on mobile devices and laptops.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

- 🔋 **Automatic Battery Detection** - Uses the Battery API to monitor device battery level
- 🎨 **Progressive Animation Reduction** - Four modes: Normal, Medium, Low, and Critical
- ⚙️ **Customizable Thresholds** - Configure when different power-saving modes activate
- 💾 **Persistent Settings** - User preferences saved in localStorage
- 🎯 **CSS Utility Classes** - Easy integration with existing projects
- 📱 **Mobile & Desktop Support** - Works across all modern browsers
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript
- 🔌 **Event-Driven** - React to battery and mode changes
- 🚀 **Easy Integration** - Auto-initialize or manual control

## 🚀 Quick Start

### 1. Include the files

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

That's it! Battery Saver will automatically monitor battery levels and adjust animations accordingly.

### 2. See it in action

Open `demo.html` in your browser to see a live demonstration of all features.

## 📦 What's Included

```
battery-saver/
├── battery-saver.js      # Main library (12KB)
├── battery-saver.css     # Optimized styles (6KB)
├── demo.html             # Interactive demo
├── USAGE.md              # Detailed documentation
├── README.md             # This file
└── LICENSE               # MIT License
```

## 🎯 How It Works

Battery Saver monitors your device's battery level and automatically switches between four optimization modes:

### 🟢 Normal Mode (>50% or charging)
- All animations work normally
- Full GPU acceleration
- All effects enabled

### 🟡 Medium Mode (30-50%)
- Animations reduced to 0.5s
- Transitions reduced to 0.3s
- Parallax effects disabled

### 🟠 Low Mode (15-30%)
- Animations reduced to 0.2s
- Transitions reduced to 0.15s
- Shadows and blur removed
- Video autoplay disabled

### 🔴 Critical Mode (<15%)
- All animations disabled
- All transitions disabled
- Maximum power saving

## 💡 Usage Examples

### Auto-Initialize

```html
<html data-battery-saver-auto>
```

### Manual Control

```javascript
const batterySaver = new BatterySaver({
    enabled: true,
    thresholds: {
        critical: 15,
        low: 30,
        medium: 50
    }
});

// Listen to events
batterySaver.on('modeChange', (data) => {
    console.log('Battery mode:', data.currentMode);
});

batterySaver.on('batteryChange', (data) => {
    console.log('Battery level:', data.level + '%');
});
```

### Custom Configuration

```javascript
const batterySaver = new BatterySaver({
    thresholds: {
        critical: 10,  // More aggressive
        low: 25,
        medium: 60
    },
    updateInterval: 10000  // Check every 10 seconds
});
```

### Enable/Disable

```javascript
// Toggle on/off
batterySaver.toggle();

// Enable
batterySaver.enable();

// Disable
batterySaver.disable();

// Check status
if (batterySaver.isEnabled()) {
    console.log('Battery Saver is active');
}
```

## 🎨 CSS Integration

### Automatic Classes

Battery Saver automatically applies these classes:

```css
/* Applied when battery saving is active */
.battery-saver-active { }
.battery-saver-reduce-shadows { }
.battery-saver-reduce-blur { }
.battery-saver-reduce-gradients { }
.battery-saver-reduce-motion { }
```

### HTML Attributes

```html
<html data-battery-saver-mode="low">
```

### CSS Custom Properties

```css
:root {
    --battery-saver-animation-duration: 1s;
    --battery-saver-transition-duration: 0.3s;
}

/* Use in your styles */
.my-animation {
    animation-duration: var(--battery-saver-animation-duration);
}
```

### Utility Classes

```html
<!-- Opt-in to optimizations -->
<div class="battery-saver-enabled">...</div>

<!-- Exclude from battery saver -->
<div class="battery-saver-exclude">...</div>
```

## 📖 API Reference

### Methods

| Method | Description |
|--------|-------------|
| `init()` | Initialize Battery Saver |
| `enable()` | Enable battery saving |
| `disable()` | Disable battery saving |
| `toggle()` | Toggle on/off |
| `isEnabled()` | Check if enabled |
| `getStatus()` | Get current status |
| `setMode(mode)` | Manually set mode |
| `updateThresholds(obj)` | Update thresholds |
| `on(event, callback)` | Add event listener |
| `off(event, callback)` | Remove event listener |
| `destroy()` | Clean up instance |

### Events

| Event | Description | Data |
|-------|-------------|------|
| `modeChange` | Fired when mode changes | `{ previousMode, currentMode, modeConfig }` |
| `batteryChange` | Fired when battery updates | `{ level, isCharging, mode }` |

## 🌐 Browser Support

| Browser | Support | Battery API |
|---------|---------|-------------|
| Chrome | ✅ | ✅ 38+ |
| Edge | ✅ | ✅ 79+ |
| Firefox | ✅ | ⚠️ Behind flag |
| Safari | ✅ | ❌ Graceful fallback |
| Opera | ✅ | ✅ 25+ |

**Note:** On browsers without Battery API support, the library still works with manual mode control.

## 🎯 Best Practices

1. **Use GPU-accelerated properties**: Prefer `transform` and `opacity`
2. **Provide fallbacks**: Design with battery saving in mind
3. **Test on real devices**: Battery behavior varies
4. **Respect user preferences**: Honor `prefers-reduced-motion`
5. **Monitor performance**: Use DevTools to verify improvements

## 📚 Documentation

- **[USAGE.md](USAGE.md)** - Complete usage guide with examples
- **[demo.html](demo.html)** - Interactive demo
- **[API Reference](USAGE.md#api-reference)** - Detailed API documentation

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Ideas for Improvement

We're always looking for ways to improve battery savings! Consider:

- **Adaptive Quality**: Reduce image quality dynamically
- **Lazy Loading**: Defer non-critical resources
- **Network Optimization**: Reduce API calls on low battery
- **Video Quality**: Lower video resolution automatically
- **Background Tasks**: Pause background animations
- **Service Workers**: Cache more aggressively
- **WebGL**: Reduce polygon count or shader complexity

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for better battery life on mobile devices
- Built with web standards and best practices
- Community-driven development

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Exaload/battery-saver/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Exaload/battery-saver/discussions)

---

Made with ⚡ and ❤️ for a greener web
