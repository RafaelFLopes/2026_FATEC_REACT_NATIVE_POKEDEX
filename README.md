<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=24&pause=1000&color=E3350D&center=true&vCenter=true&width=800&lines=Pok%C3%A9dex+App" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=12&duration=1&pause=999999&color=FFFFFF&center=true&vCenter=true&width=1200&lines=Aplicativo+Pok%C3%A9dex+desenvolvido+com+React+Native+e+Expo%2C+com+suporte+a+Android%2C+iOS+e+Web." />
</p>

## Tecnologias

- [Expo](https://expo.dev/) 54
- [React Native](https://reactnative.dev/) 0.81
- [Expo Router](https://expo.github.io/router/) — navegação baseada em arquivos
- TypeScript

## Funcionalidades

- Tela de login com validação de credenciais
- Dashboard com listagem de Pokémons em grid
- Layout responsivo para Web (colunas dinâmicas por breakpoint)
- Componentes com implementações específicas por plataforma (Android / iOS / Web)

## Estrutura do Projeto

```
src/
├── app/
│   ├── _layout.tsx              # Layout raiz (AuthProvider)
│   ├── (auth)/
│   │   ├── index.tsx            # Tela de login (mobile)
│   │   └── index.web.tsx        # Tela de login (web)
│   └── (app)/
│       └── dashboard.tsx        # Dashboard com lista de Pokémons
├── components/
│   ├── alert/                   # Alerta — específico por plataforma
│   ├── button/                  # Botão — específico por plataforma
│   ├── card/                    # Card genérico reutilizável
│   ├── input/                   # Campo de texto
│   ├── icon/                    # Ícone
│   ├── pokeball/                # Pokébola decorativa e versão giratória
│   ├── pokemon-card/            # Card de Pokémon — específico por plataforma
│   ├── pokemon-list/            # Lista de Pokémons — específica por plataforma
│   └── pokemon-mascot/          # Pikachu com animação de glow
├── constants/
│   ├── pokemon.ts               # Dados estáticos dos Pokémons
│   └── colors.ts                # Paleta de cores
└── context/
    └── AuthContext.tsx          # Contexto de autenticação
```

## Componentes com versões por plataforma

Alguns componentes possuem implementações distintas para cada plataforma, seguindo o padrão de resolução do Metro Bundler:

| Componente | Android | iOS | Web |
|---|---|---|---|
| `alert` | Modal nativo | Modal nativo | Modal web |
| `button` | Largura 100% | Largura 100% | Largura máxima 320px, centralizado |
| `pokemon-card` | Borda no topo | Borda na esquerda | Borda em todos os lados |
| `pokemon-list` | 2 colunas | 2 colunas | Responsivo (1 a 4 colunas) |

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```


## Capturas de Tela - WEB 

<table>
  <tr>
    <td align="center">
      <h3>Tela Inicial Login</h3>
      <img src="https://github.com/user-attachments/assets/4081580a-9565-440c-b2d4-9aa3a1ae6319" width="1200">
    </td>
  </tr>

  <tr>
    <td align="center">
      <h3>Cadastro</h3>
      <img src="https://github.com/user-attachments/assets/931dc27b-9a3e-4fa8-88e0-2122161b7491" width="1200">
    </td>
  </tr>

  <tr>
    <td align="center">
      <h3>Pokédex</h3>
      <img src="https://github.com/user-attachments/assets/4053f752-9975-4a95-a6ef-85b8bf915ef7" width="1200">
    </td>
  </tr>

  <tr>
    <td align="center">
      <h3>Meu Time</h3>
      <img src="https://github.com/user-attachments/assets/1694f89d-ca4e-4436-9102-b97dac53d02f" width="1200">
    </td>
  </tr>

  <tr>
    <td align="center">
      <h3>Perfil</h3>
      <img src="https://github.com/user-attachments/assets/e02d3f5b-8de5-4c28-b955-7175aa049943" width="1200">
    </td>
  </tr>
</table>


## Capturas de Tela - MOBILE

<table>
  <tr>
    <td align="center">
      <strong>Perfil</strong><br><br>
      <img src="https://github.com/user-attachments/assets/22b16c67-6246-47b2-ad91-a7a6dba5bebe" width="280">
    </td>
    <td align="center">
      <strong>Meu Time</strong><br><br>
      <img src="https://github.com/user-attachments/assets/fb5f1d9b-0819-4e61-9170-71bd29d96121" width="280">
    </td>
  </tr>

  <tr>
    <td align="center">
      <strong>Perfil (Detalhes)</strong><br><br>
      <img src="https://github.com/user-attachments/assets/31132b02-01e2-45ee-928c-8d0ac89211c0" width="280">
    </td>
    <td align="center">
      <strong>Pokédex</strong><br><br>
      <img src="https://github.com/user-attachments/assets/27670d8c-ffb9-449e-8c9a-152d79218a91" width="280">
    </td>
  </tr>
</table>

