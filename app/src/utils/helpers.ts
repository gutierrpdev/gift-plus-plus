/**
 * Simple Typescript helper to ensure we haven't accidentally missed possible
 * cases while doing switch statements / fall-through if statements etc.
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

/***
 * Detects if this is an iOS device
 * Returns true or false
 */
export function isIosDevice(): boolean {

  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) { return true; }
    }
  }

  return false;
}


/***
 * Returns if this is an iOS device using Chrome
 */
export function isIosDeviceUsingChrome(): boolean {
  // CriOS is unique to Chrome on Safari
  return !!navigator.userAgent.match('CriOS');
}

/***
 * Returns is this is a mobile device
 */
export function isMobileDevice(): boolean {
  /* tslint:disable-next-line max-line-length */
  return !!(/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ''));
}
