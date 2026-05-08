import { Platform } from 'react-native';
import { ScreenLayoutProps } from './types';

import ScreenLayoutIOS from './index.ios';
import ScreenLayoutAndroid from './index.android';
import ScreenLayoutWeb from './index.web';

export { ScreenLayoutImplementation as ScreenLayout };
export * from './types';

const ScreenLayoutImplementation = Platform.select({
  ios: ScreenLayoutIOS,
  android: ScreenLayoutAndroid,
  web: ScreenLayoutWeb,
  default: ScreenLayoutWeb,
}) as React.FC<ScreenLayoutProps>;
