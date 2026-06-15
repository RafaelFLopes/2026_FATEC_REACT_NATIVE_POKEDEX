import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon',
});

export interface UserStats {
  userId: string;
  username: string;
  level: string;
  vitorias: string;
  derrotas: string;
}

export async function register(username: string, password: string): Promise<void> {
  await api.post('/auth/v1/register', { username, password });
}

export async function login(username: string, password: string): Promise<{ token: string; userId: string }> {
  const response = await api.post('/auth/v1/login', { username, password });
  return response.data;
}

export async function getStats(userId: string): Promise<UserStats> {
  const response = await api.get(`/auth/v1/stats/${userId}`);
  return response.data;
}

export async function updateStats(
  userId: string,
  stats: { level: string; vitorias: string; derrotas: string }
): Promise<void> {
  await api.put(`/auth/v1/stats/${userId}`, stats);
}
