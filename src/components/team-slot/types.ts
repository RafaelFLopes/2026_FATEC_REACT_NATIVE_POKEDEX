import { Pokemon } from '@/@types/pokemon';

export interface TeamSlotProps {
    pokemon?: Pokemon;
    onRemove?: () => void;
}
