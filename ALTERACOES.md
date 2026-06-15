# Alterações Realizadas — Integração da API + Melhorias de UI

---

## 1. Arquivos Criados

### `src/integration/authIntegration.ts`
Integração com os endpoints de autenticação da API do professor.

- `register(username, password)` → `POST /auth/v1/register`
- `login(username, password)` → `POST /auth/v1/login` — retorna `{ token, userId }`
- `getStats(userId)` → `GET /auth/v1/stats/{userId}` — retorna `{ userId, username, level, vitorias, derrotas }`
- `updateStats(userId, { level, vitorias, derrotas })` → `PUT /auth/v1/stats/{userId}`

---

### `src/integration/teamIntegration.ts`
Integração com os endpoints de time e pokémons capturados.

- `getTeam(userId)` → `GET /pokemon/v1/team?user-id={userId}` — retorna `{ team: Pokemon[], capture: Pokemon[] }`
- `updateTeam(userId, removedPokemon?, newPokemon?)` → `PUT /pokemon/v1/team` (query params)
- `addCaptured(userId, pokemonId)` → `PUT /pokemon/v1/captured` (query params)
- `deleteCaptured(userId, pokemonId)` → `DELETE /pokemon/v1/captured` (query params)

> Inclui função `mapApiPokemon` que converte o formato da API (`name`, `image`, `types`, `abilities`) para o tipo interno do projeto (`nome`, `imagem`, `tipos`, `poderes`).

---

### `src/components/stat-card/index.tsx`
Novo componente reutilizável para exibir estatísticas (nível, vitórias, derrotas).

Props: `value: string`, `label: string`, `color: string`

Usado na tela de perfil.

---

### `src/app/(auth)/register.tsx` — Tela de Cadastro (Mobile)
Mesmo layout da tela de login (SpinningPokeball + PokemonMascot + Card).

- Campos: Usuário, Senha, Confirmar Senha
- Validações: campos obrigatórios, senhas iguais
- Chama `signUp()` do AuthContext
- Sucesso → volta para o login após 1,8s
- Erro → exibe Alert

---

### `src/app/(auth)/register.web.tsx` — Tela de Cadastro (Web)
Versão web da tela de cadastro. Mesmo layout de `index.web.tsx` (card centralizado com largura fixa 480px).

---

### `src/app/(app)/profile.web.tsx` — Perfil (Web)
Versão web da tela de perfil (arquivo novo — Expo Router usa este em vez de `profile.tsx` no browser).

- Card único centralizado com `maxWidth: 520px`
- Avatar + nome + tag "TREINADOR" no topo
- Campo de nome de usuário (desabilitado fora do modo edição)
- Stats em linha: Nível (amarelo), Vitórias (verde), Derrotas (vermelho)
- Botões **EDITAR PERFIL** e **SAIR** dentro do card

---

## 2. Arquivos Modificados

### `src/context/AuthContext.tsx`
**Antes:** login com credenciais hardcoded, sem token, sem userId.

**Depois:**
- Adicionado `token: string | null` e `userId: string | null` ao contexto
- Adicionado `signUp(username, password)` — chama `register()` da API
- `signIn(username, password)` agora chama `login()` da API real e salva `token` + `userId` no AsyncStorage
- `signOut()` também limpa `@Auth:token` e `@Auth:userId` do AsyncStorage
- `loadStorageData` carrega os três valores salvos na inicialização

---

### `src/app/(auth)/index.tsx` — Login (Mobile)
- Removida validação hardcoded (`rafael/1234`, `jovana/1234`)
- `handleLogin()` assíncrono com try/catch chamando `signIn(username, password)` da API
- Removido texto de hint com credenciais fixas
- Adicionado botão **CRIAR CONTA** que navega para `/register`

---

### `src/app/(auth)/index.web.tsx` — Login (Web)
Mesmas alterações do `index.tsx`.

---

### `src/app/(app)/profile.tsx` — Perfil (Mobile)
- Carrega stats reais via `getStats(userId)` no `useEffect`
- Campo "Partidas" substituído por **"Nível"** (campo `level` da API)
- Vitórias e Derrotas exibidas em `StatCard` em vez de `Input`
- Avatar com borda vermelha e nome exibido abaixo
- Botões **EDITAR** e **SAIR** dentro do card (footer removido)
- Modo de edição: botão EDITAR mostra campo de nome editável; SALVAR/CANCELAR confirmam ou revertem

---

### `src/app/(app)/team.tsx` — Time
- Carrega time real da API via `getTeam(userId)` no `useEffect` (em paralelo com os pokémons da PokeAPI)
- **Ao adicionar pokémon:** chama `addCaptured()` + `updateTeam()` com o `newPokemon`
- **Ao remover pokémon:** chama `updateTeam()` com `removedPokemon`
- IDs enviados à API sem padding: `"025"` → `"25"` via `parseInt`
- Adicionado `Alert` para erros de rede
- `MAX_TEAM` mantido em 5

---

## 3. Observações Importantes

### Edição de perfil (limitação da API)
O botão **EDITAR** libera o campo de nome, mas ao clicar **SALVAR** a mudança é apenas local — não persiste após reiniciar o app. Isso ocorre porque a API não disponibiliza um endpoint para atualizar o username. O endpoint `PUT /auth/v1/stats/{userId}` só aceita `level`, `vitorias` e `derrotas` (controlados pelo sistema de batalha).

### Mapeamento da API de Time
A API retorna pokémons com campos em inglês (`name`, `image`, `types`, `abilities`). A função `mapApiPokemon` em `teamIntegration.ts` converte para o padrão português do projeto (`nome`, `imagem`, `tipos`, `poderes`).

### Roteamento Web (Expo Router)
O Expo Router resolve automaticamente arquivos `.web.tsx` para o browser:
- `/register` → usa `register.web.tsx` (web) ou `register.tsx` (mobile)
- `/profile` → usa `profile.web.tsx` (web) ou `profile.tsx` (mobile)

---

## 4. Estrutura Final de Arquivos Novos/Alterados

```
src/
├── integration/
│   ├── authIntegration.ts       ← NOVO
│   ├── teamIntegration.ts       ← NOVO
│   └── pokemonIntegration.ts    (sem alteração)
│
├── context/
│   └── AuthContext.tsx          ← ALTERADO
│
├── components/
│   └── stat-card/
│       └── index.tsx            ← NOVO
│
└── app/
    ├── (auth)/
    │   ├── index.tsx            ← ALTERADO
    │   ├── index.web.tsx        ← ALTERADO
    │   ├── register.tsx         ← NOVO
    │   └── register.web.tsx     ← NOVO
    └── (app)/
        ├── profile.tsx          ← ALTERADO
        ├── profile.web.tsx      ← NOVO
        └── team.tsx             ← ALTERADO
```
