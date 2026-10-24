// Keep the dashboard decision separate from React/Ink. Watchers import CLI and
// usage helpers, so they must be able to check this without loading the UI.
import { getConfig } from '../settings.js';

export function shouldUseDashboard({
  force = null,
  json = false,
  isTTY = process.stdout?.isTTY && process.stdin?.isTTY,
  env = process.env,
  automatic = true,
} = {}) {
  if (force === true) return true;
  if (force === false) return false;
  if (automatic && !getConfig('autoDashboard')) return false;
  if (json) return false;
  if (env.NO_COLOR != null && env.NO_COLOR !== '') return false;
  if (env.CI === 'true' || env.CI === '1') return false;
  if (env.TERM === 'dumb') return false;
  return !!isTTY;
}
