import { Platform } from 'react-native';
import { TeamSlotsSectionProps } from './types';

import TeamSlotsSectionAndroid from './index.android';
import TeamSlotsSectionIOS from './index.ios';
import TeamSlotsSectionWeb from './index.web';

export * from './types';

const TeamSlotsSectionImplementation = Platform.select({
    ios: TeamSlotsSectionIOS,
    android: TeamSlotsSectionAndroid,
    web: TeamSlotsSectionWeb,
    default: TeamSlotsSectionAndroid,
}) as React.FC<TeamSlotsSectionProps>;

export { TeamSlotsSectionImplementation as TeamSlotsSection };
