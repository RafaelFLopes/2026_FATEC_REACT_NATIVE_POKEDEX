import axios from 'axios';
import { Pokemon } from '../@types/pokemon';

const api = axios.create({
  baseURL: 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon',
});

interface ApiPokemon {
  index: string;
  name: string;
  image: string;
  types: string[];
  abilities: { name: string; strength: number }[];
}

interface TeamResponse {
  id: string;
  userId: string;
  team: ApiPokemon[];
  capture: ApiPokemon[];
}

function mapApiPokemon(api: ApiPokemon): Pokemon {
  return {
    index: api.index,
    nome: api.name,
    imagem: api.image,
    tipos: api.types,
    poderes: api.abilities.map(a => ({ nome: a.name, forca: a.strength })),
  };
}

export async function getTeam(userId: string): Promise<{ team: Pokemon[]; capture: Pokemon[] }> {
  const response = await api.get<TeamResponse>('/pokemon/v1/team', {
    params: { 'user-id': userId },
  });
  return {
    team: response.data.team.map(mapApiPokemon),
    capture: response.data.capture.map(mapApiPokemon),
  };
}

export async function updateTeam(
  userId: string,
  removedPokemon?: string,
  newPokemon?: string
): Promise<void> {
  const params: Record<string, string> = { 'user-id': userId };
  if (removedPokemon) params['removed-pokemon'] = removedPokemon;
  if (newPokemon) params['new-pokemon'] = newPokemon;
  await api.put('/pokemon/v1/team', null, { params });
}

export async function addCaptured(userId: string, pokemonId: string): Promise<void> {
  await api.put('/pokemon/v1/captured', null, {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });
}

export async function deleteCaptured(userId: string, pokemonId: string): Promise<void> {
  await api.delete('/pokemon/v1/captured', {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });
}
