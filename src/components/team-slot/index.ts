import { Platform } from 'react-native';
import { TeamSlotProps } from './types';

import TeamSlotIOS from './index.ios';
import TeamSlotAndroid from './index.android';
import TeamSlotWeb from './index.web';

export { TeamSlotImplementation as TeamSlot };
export * from './types';

const TeamSlotImplementation = Platform.select({
    ios: TeamSlotIOS,
    android: TeamSlotAndroid,
    web: TeamSlotWeb,
    default: TeamSlotAndroid,
}) as React.FC<TeamSlotProps>;
