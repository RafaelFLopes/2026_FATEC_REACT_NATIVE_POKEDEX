export type PokemonType = 'fire' | 'water' | 'grass' | 'electric' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy' | 'normal';

export interface Pokemon {
  id: string;
  name: string;
  type: PokemonType;
  description: string;
  image: string;
}

export const POKEMONS: Pokemon[] = [
  {
    id: '1',
    name: 'Charmander',
    type: 'fire',
    description: 'Um Pokémon de fogo que adora ficar ao sol.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: '2',
    name: 'Squirtle',
    type: 'water',
    description: 'Um Pokémon de água com carapaça protetora.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
  {
    id: '3',
    name: 'Bulbasaur',
    type: 'grass',
    description: 'Um Pokémon de grama com bulbo nas costas.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: '4',
    name: 'Pikachu',
    type: 'electric',
    description: 'O Pokémon elétrico mais famoso do mundo!',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: '5',
    name: 'Snorlax',
    type: 'normal',
    description: 'Um Pokémon que adora comer e dormir.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
  },
  {
    id: '6',
    name: 'Dragonite',
    type: 'dragon',
    description: 'Um Pokémon dragão lendário e poderoso.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  },
  {
    id: '7',
    name: 'Gengar',
    type: 'ghost',
    description: 'Um Pokémon fantasma que vive nas sombras.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  },
  {
    id: '8',
    name: 'Alakazam',
    type: 'psychic',
    description: 'Um Pokémon psíquico com inteligência extraordinária.',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png',
  },
];

export function getPokemonTypeColor(type: PokemonType): string {
  const typeColors: Record<PokemonType, string> = {
    fire: '#FF6B35',
    water: '#4A90E2',
    grass: '#2ECC71',
    electric: '#F1C40F',
    ice: '#3498DB',
    fighting: '#D62828',
    poison: '#9B59B6',
    ground: '#A67C52',
    flying: '#7FB3D5',
    psychic: '#E74C3C',
    bug: '#27AE60',
    rock: '#95A5A6',
    ghost: '#8E44AD',
    dragon: '#2980B9',
    dark: '#2C3E50',
    steel: '#34495E',
    fairy: '#FF1493',
    normal: '#A4ACAF',
  };

  return typeColors[type] || '#999999';
}
