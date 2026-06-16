import { Pokemon } from '@/@types/pokemon';

export interface PokemonListProps {
    data: Pokemon[];
    onPressItem?: (pokemon: Pokemon) => void;
    selectedIds?: string[];
    capturedIds?: string[];
    onCapture?: (pokemon: Pokemon) => void;
}
