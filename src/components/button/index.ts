import { Platform } from 'react-native';
import { ButtonProps } from './types';

import ButtonIOS from './index.ios';
import ButtonAndroid from './index.android';
import ButtonWeb from './index.web';

export { ButtonImplementation as Button };
export * from './types';

const ButtonImplementation = Platform.select({
  ios: ButtonIOS,
  android: ButtonAndroid,
  web: ButtonWeb,
  default: ButtonAndroid,
}) as React.FC<ButtonProps>;
