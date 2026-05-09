import { Platform } from 'react-native';
import { PokemonListProps } from './types';

import PokemonListIOS from './index.ios';
import PokemonListAndroid from './index.android';
import PokemonListWeb from './index.web';

export { PokemonListImplementation as PokemonList };
export * from './types';

const PokemonListImplementation = Platform.select({
    ios: PokemonListIOS,
    android: PokemonListAndroid,
    web: PokemonListWeb,
    default: PokemonListAndroid,
}) as React.FC<PokemonListProps>;
