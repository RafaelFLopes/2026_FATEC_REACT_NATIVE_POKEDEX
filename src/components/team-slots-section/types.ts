import { Pokemon } from '@/@types/pokemon';

export interface TeamSlotsSectionProps {
    team: Pokemon[];
    swapMode: boolean;
    onSlotSwap: (pokemon: Pokemon) => void;
    maxTeam: number;
}
