/**
 * Battery Saver - Reduce animations and transitions based on battery level
 * @version 1.0.0
 * @license MIT
 */

(function(window) {
  'use strict';

  /**
   * Default configuration
   */
  const DEFAULT_CONFIG = {
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
  };

  class BatterySaver {
    constructor(config = {}) {
      this.config = { ...DEFAULT_CONFIG, ...config };
      this.currentMode = 'normal';
      this.batteryLevel = 100;
      this.isCharging = false;
      this.battery = null;
      this.updateTimer = null;
      this.listeners = {
        modeChange: [],
        batteryChange: []
      };
      
      // Load saved settings
      this.loadSettings();
      
      // Initialize if enabled
      if (this.config.enabled) {
        this.init();
      }
    }

    /**
     * Initialize the battery saver
     */
    async init() {
      try {
        // Check for Battery API support
        if ('getBattery' in navigator) {
          this.battery = await navigator.getBattery();
          this.updateBatteryStatus();
          
          // Add battery event listeners
          this.battery.addEventListener('levelchange', () => this.updateBatteryStatus());
          this.battery.addEventListener('chargingchange', () => this.updateBatteryStatus());
        } else {
          console.warn('Battery API not supported. Battery Saver will use default mode.');
          this.applyMode('normal');
        }

        // Set up periodic updates
        this.startPeriodicUpdates();
        
        // Apply initial mode
        this.applyCurrentMode();
        
      } catch (error) {
        console.error('Battery Saver initialization error:', error);
      }
    }

    /**
     * Update battery status
     */
    updateBatteryStatus() {
      if (!this.battery) return;

      this.batteryLevel = Math.round(this.battery.level * 100);
      this.isCharging = this.battery.charging;

      // Determine mode based on battery level and charging status
      let newMode = this.determineMode();
      
      if (newMode !== this.currentMode) {
        this.setMode(newMode);
      }

      // Emit battery change event
      this.emit('batteryChange', {
        level: this.batteryLevel,
        isCharging: this.isCharging,
        mode: this.currentMode
      });
    }

    /**
     * Determine the appropriate mode based on battery level
     */
    determineMode() {
      // If charging, use normal mode
      if (this.isCharging) {
        return 'normal';
      }

      // Determine mode based on thresholds
      if (this.batteryLevel <= this.config.thresholds.critical) {
        return 'critical';
      } else if (this.batteryLevel <= this.config.thresholds.low) {
        return 'low';
      } else if (this.batteryLevel <= this.config.thresholds.medium) {
        return 'medium';
      } else {
        return 'normal';
      }
    }

    /**
     * Set the current mode
     */
    setMode(mode) {
      if (!this.config.modes[mode]) {
        console.error(`Invalid mode: ${mode}`);
        return;
      }

      const previousMode = this.currentMode;
      this.currentMode = mode;
      this.applyMode(mode);
      
      // Emit mode change event
      this.emit('modeChange', {
        previousMode,
        currentMode: mode,
        modeConfig: this.config.modes[mode]
      });
    }

    /**
     * Apply mode settings
     */
    applyMode(mode) {
      const modeConfig = this.config.modes[mode];
      const root = document.documentElement;

      // Apply CSS custom properties
      if (modeConfig.animationDuration !== null) {
        root.style.setProperty('--battery-saver-animation-duration', `${modeConfig.animationDuration}s`);
      } else {
        root.style.removeProperty('--battery-saver-animation-duration');
      }

      if (modeConfig.transitionDuration !== null) {
        root.style.setProperty('--battery-saver-transition-duration', `${modeConfig.transitionDuration}s`);
      } else {
        root.style.removeProperty('--battery-saver-transition-duration');
      }

      // Apply data attribute for CSS targeting
      root.setAttribute('data-battery-saver-mode', mode);

      // Apply body classes
      this.applyBodyClasses(modeConfig);

      // Handle parallax effects
      if (modeConfig.disableParallax) {
        this.disableParallax();
      } else {
        this.enableParallax();
      }

      // Handle video autoplay
      if (modeConfig.disableVideoAutoplay) {
        this.disableVideoAutoplay();
      }

      // Throttle frame rate for animations
      this.setFrameRate(modeConfig.frameRate);
    }

    /**
     * Apply body classes based on mode config
     */
    applyBodyClasses(modeConfig) {
      const body = document.body;
      
      // Remove previous classes
      body.classList.remove(
        'battery-saver-active',
        'battery-saver-reduce-shadows',
        'battery-saver-reduce-blur',
        'battery-saver-reduce-gradients',
        'battery-saver-reduce-motion'
      );

      // Add new classes
      if (this.currentMode !== 'normal') {
        body.classList.add('battery-saver-active');
      }

      if (modeConfig.reduceShadows) {
        body.classList.add('battery-saver-reduce-shadows');
      }

      if (modeConfig.reduceBlur) {
        body.classList.add('battery-saver-reduce-blur');
      }

      if (modeConfig.reduceGradients) {
        body.classList.add('battery-saver-reduce-gradients');
      }

      if (modeConfig.animationDuration === 0) {
        body.classList.add('battery-saver-reduce-motion');
      }
    }

    /**
     * Disable parallax effects
     */
    disableParallax() {
      const parallaxElements = document.querySelectorAll('[data-parallax], .parallax');
      parallaxElements.forEach(el => {
        el.setAttribute('data-battery-saver-parallax-disabled', 'true');
        el.style.transform = 'none';
      });
    }

    /**
     * Enable parallax effects
     */
    enableParallax() {
      const parallaxElements = document.querySelectorAll('[data-battery-saver-parallax-disabled]');
      parallaxElements.forEach(el => {
        el.removeAttribute('data-battery-saver-parallax-disabled');
      });
    }

    /**
     * Disable video autoplay
     */
    disableVideoAutoplay() {
      const videos = document.querySelectorAll('video[autoplay]');
      videos.forEach(video => {
        video.removeAttribute('autoplay');
        if (!video.paused) {
          video.pause();
        }
        video.setAttribute('data-battery-saver-autoplay-disabled', 'true');
      });
    }

    /**
     * Set frame rate limit
     */
    setFrameRate(fps) {
      const root = document.documentElement;
      root.style.setProperty('--battery-saver-frame-interval', `${1000 / fps}ms`);
    }

    /**
     * Apply current mode
     */
    applyCurrentMode() {
      this.applyMode(this.currentMode);
    }

    /**
     * Start periodic battery updates
     */
    startPeriodicUpdates() {
      if (this.updateTimer) {
        clearInterval(this.updateTimer);
      }

      this.updateTimer = setInterval(() => {
        this.updateBatteryStatus();
      }, this.config.updateInterval);
    }

    /**
     * Stop periodic updates
     */
    stopPeriodicUpdates() {
      if (this.updateTimer) {
        clearInterval(this.updateTimer);
        this.updateTimer = null;
      }
    }

    /**
     * Enable battery saver
     */
    enable() {
      this.config.enabled = true;
      this.saveSettings();
      this.init();
    }

    /**
     * Disable battery saver
     */
    disable() {
      this.config.enabled = false;
      this.saveSettings();
      this.stopPeriodicUpdates();
      this.setMode('normal');
    }

    /**
     * Toggle battery saver
     */
    toggle() {
      if (this.config.enabled) {
        this.disable();
      } else {
        this.enable();
      }
      return this.config.enabled;
    }

    /**
     * Check if enabled
     */
    isEnabled() {
      return this.config.enabled;
    }

    /**
     * Get current status
     */
    getStatus() {
      return {
        enabled: this.config.enabled,
        mode: this.currentMode,
        batteryLevel: this.batteryLevel,
        isCharging: this.isCharging,
        modeConfig: this.config.modes[this.currentMode]
      };
    }

    /**
     * Update thresholds
     */
    updateThresholds(thresholds) {
      this.config.thresholds = { ...this.config.thresholds, ...thresholds };
      this.saveSettings();
      this.updateBatteryStatus();
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
      try {
        const settings = {
          enabled: this.config.enabled,
          thresholds: this.config.thresholds
        };
        localStorage.setItem(this.config.storageKey, JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving battery saver settings:', error);
      }
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
      try {
        const saved = localStorage.getItem(this.config.storageKey);
        if (saved) {
          const settings = JSON.parse(saved);
          this.config.enabled = settings.enabled !== undefined ? settings.enabled : this.config.enabled;
          if (settings.thresholds) {
            this.config.thresholds = { ...this.config.thresholds, ...settings.thresholds };
          }
        }
      } catch (error) {
        console.error('Error loading battery saver settings:', error);
      }
    }

    /**
     * Add event listener
     */
    on(eventName, callback) {
      if (this.listeners[eventName]) {
        this.listeners[eventName].push(callback);
      }
    }

    /**
     * Remove event listener
     */
    off(eventName, callback) {
      if (this.listeners[eventName]) {
        this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
      }
    }

    /**
     * Emit event
     */
    emit(eventName, data) {
      if (this.listeners[eventName]) {
        this.listeners[eventName].forEach(callback => callback(data));
      }
    }

    /**
     * Destroy instance
     */
    destroy() {
      this.stopPeriodicUpdates();
      this.setMode('normal');
      this.listeners = { modeChange: [], batteryChange: [] };
    }
  }

  // Export to window
  window.BatterySaver = BatterySaver;

  // Auto-initialize if data attribute is present
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  function autoInit() {
    if (document.documentElement.hasAttribute('data-battery-saver-auto')) {
      window.batterySaver = new BatterySaver();
    }
  }

})(window);
