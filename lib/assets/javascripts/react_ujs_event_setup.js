// TODO give this file a good name

// Detect which kind of events to set up:
if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
  ReactRailsUJS.TurbolinksClassic.setup();
} else {
  ReactRailsUJS.Native.setup()
}
