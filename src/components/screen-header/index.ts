import { Platform } from 'react-native';
import { ScreenHeaderProps } from './types';

import ScreenHeaderAndroid from './index.android';
import ScreenHeaderIOS from './index.ios';
import ScreenHeaderWeb from './index.web';

export * from './types';

const ScreenHeaderImplementation = Platform.select({
    ios: ScreenHeaderIOS,
    android: ScreenHeaderAndroid,
    web: ScreenHeaderWeb,
    default: ScreenHeaderAndroid,
}) as React.FC<ScreenHeaderProps>;

export { ScreenHeaderImplementation as ScreenHeader };
