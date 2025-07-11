# 📚 NexBook

O **NexBook** é um aplicativo mobile desenvolvido com **React Native** e **TypeScript** que permite aos usuários buscar, visualizar e favoritar livros utilizando a API do Google Books. O app possui uma interface moderna com navegação por abas, tela de login/cadastro com autenticação via Supabase e sistema de favoritos com status personalizados.

---

## 🛠️ Tecnologias Utilizadas

- **React Native**
- **Expo Router**
- **TypeScript**
- **Google Books API**
- **Supabase Auth** (para autenticação)
- **Context API** (para controle global do login)
- **AsyncStorage** (para persistência local)
- **Custom Hooks & Components** reutilizáveis

---

## 🚀 Funcionalidades

- Autenticação de usuário (login e cadastro)
- Tela inicial com sugestões de livros em seções
- Busca por livros com resultado em lista
- Visualização de detalhes do livro
- Favoritar livros e organizar por status (lido, lendo, quero ler)
- Perfil do usuário com opção de logout

---

## 📲 Telas do Aplicativo

### 🌐 Tela de Login e Cadastro

- Tela com design personalizado
- Autenticação integrada com o Supabase
- Feedback de erro e sucesso

---

### 💖 Tela Principal

- Navegação por abas (Home, Buscar, Favoritos, Perfil)
- Cada aba com layout responsivo e dark mode
- Seções com livros organizados por categoria

---

### 📖 Tela de Detalhes do Livro

- Informações detalhadas sobre o livro (título, autor, descrição, nota, idioma etc.)
- Acesso à prévia e link de compra
- Possibilidade de favoritar diretamente dessa tela

---

## 📁 Estrutura do Projeto

``` text
📦 NexBook
├── assets/
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       └── imagem_fundo.png
├── constants/
│   ├── books.ts
│   ├── bookSections.ts
│   └── supabase.ts
├── src/
│   ├── app/
│   │   ├── +not-found.tsx
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── fav.tsx
│   │   │   ├── index.tsx
│   │   │   ├── profile.tsx
│   │   │   └── search.tsx
│   │   ├── auth/
│   │   │   ├── _style.ts
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── pages/
│   │       └── BookDetails.tsx
│   ├── components/
│   │   ├── bookDetailView/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── bookItem/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── booksSection/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── button/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── favoriteButton/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── favoriteItem/
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── input/
│   │       ├── index.tsx
│   │       └── style.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   └── services/
│       ├── api.ts
│       └── favorites.ts
├── .gitignore
├── app.json
├── expo-env.d.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🔧 Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/FrancieleAlmeida/NexBook.git
cd NexBook
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

> O app será carregado no Expo Go, disponível para Android/iOS

---

## 💡 Diferenciais do Projeto

- Design minimalista com **tema escuro**
- Ícones intuitivos com **Ionicons**
- Tela de perfil com nome, e-mail, username e logout
- Componente de botão de favoritos reutilizável
- Mensagens de erro e feedback visual
- Carregamento animado com `ActivityIndicator`

---

## 👩‍💻 Desenvolvedoras

Feito com ❤️ por **Franciele Almeida** e **Isabelle Rancan**
Desenvolvido como projeto final da disciplina de **Desenvolvimento Mobile**.
