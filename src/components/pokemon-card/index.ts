import { Platform } from 'react-native';
import { PokemonCardProps } from './types';

import PokemonCardIOS from './index.ios';
import PokemonCardAndroid from './index.android';
import PokemonCardWeb from './index.web';

export { PokemonCardImplementation as PokemonCard };
export * from './types';

const PokemonCardImplementation = Platform.select({
  ios: PokemonCardIOS,
  android: PokemonCardAndroid,
  web: PokemonCardWeb,
  default: PokemonCardAndroid,
}) as React.FC<PokemonCardProps>;
