import React from 'react';

/**
 * List of supported devices
 */

const SupportedDeviceList: React.FC = () => (
  <>
    <h1>* Desktop</h1>
    <h2>** Mac</h2>
    <ul>
      <li>- Modern Safari</li>
      <li>- Modern Chrome</li>
      <li>- Modern Firefox</li>
    </ul>

    ** Windows
      - Modern Edge
      - Modern Chrome
      - Modern Firefox

    ** Linux
      - Modern Chrome
      - Modern Firefox

    * Tablet
    ** iPad 2 (iOS 9)
      (NOTE: No Gift creation support)
      - Modern Safari
      - Modern Chrome

    ** Modern iPad
      - Modern Safari
      - Modern Chrome (NOTE: No gift creation support)

    * Mobile (iOS 10+, Android 5.0+)
    ** iPhone 5s (iOS 10+)
      - Modern Safari (NOTE: Gift creation support iOS 11+ only)
      - Modern Chrome (NOTE: No gift creation support)

    ** iPhone 6 (iOS 10+)
      - Modern Safari (NOTE: Gift creation support iOS 11+ only)
      - Modern Chrome (NOTE: No gift creation support)

    ** iPhone 7 (iOS 10+)
      - Modern Safari (NOTE: Gift creation support iOS 11+ only)
      - Modern Chrome (NOTE: No gift creation support)

    ** iPhone X (iOS 12+)
      - Modern Safari
      - Modern Chrome (NOTE: No gift creation support)

    ** Low-Mid-Range (Android 5.0) [Moto E = 5.1]
      - Native Browser
      - Modern Firefox
      - Modern Chrome

    ** Lenovo (Android 6.0)
      - Native Browser
      - Modern Firefox
      - Modern Chrome

    ** Blackview (Android 7.0)
      - Native Browser
      - Modern Firefox
      - Modern Chrome

    ** OnePlus 5T (Android 8.1)
      - Modern Firefox
      - Modern Chrome
  </>
);

export {
  SupportedDeviceList,
};
