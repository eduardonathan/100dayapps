# discoteca

Catálogo de discos de vinil (CRUD) feito com Vite + React + TypeScript, `react-router-dom` e uma API fake via `json-server`.

## Rodando

```bash
npm install
npm run dev
```

Em outro terminal, suba a API fake:

```bash
cd api
npm install
npm run dev
```

## Exercício: adicionar Context + Provider

Este projeto foi deixado **sem autenticação de propósito**. Replique o padrão dos outros projetos da pasta (`pet-a-pet`, `mediplus`, `love-food`, `gym-sharks-admin`, `estilos-cabeleireiro`, `livroteca`, `folhagem`):

- `src/contexts/AuthContext.tsx` com `createContext`, `AuthProvider` e um hook `useAuth`
- `src/components/ProtectedRoute.tsx` que redireciona pra `/login` quando `isLoggedIn` é `false`
- Uma `LoginPage` que chama `login()` do context e navega pra `/`
- `App.tsx` envolvendo o `BrowserRouter` com o `AuthProvider`, e as rotas internas protegidas
- `Header.tsx` usando `useAuth()` pra exibir o botão de sair (`logout()`)
