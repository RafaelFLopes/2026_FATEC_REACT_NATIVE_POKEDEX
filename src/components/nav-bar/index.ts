import { Platform } from 'react-native';
import { NavBarProps } from './types';

import NavBarIOS from './index.ios';
import NavBarAndroid from './index.android';
import NavBarWeb from './index.web';

export { NavBarImplementation as NavBar };
export * from './types';

const NavBarImplementation = Platform.select({
    ios: NavBarIOS,
    android: NavBarAndroid,
    web: NavBarWeb,
    default: NavBarAndroid,
}) as React.FC<NavBarProps>;
