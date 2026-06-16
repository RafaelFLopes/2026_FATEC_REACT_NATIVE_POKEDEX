import { Pokemon } from '@/@types/pokemon';

export interface PokemonCardProps {
  pokemon: Pokemon;
  onPress?: () => void;
  selected?: boolean;
  onCapture?: () => void;
  captured?: boolean;
}
