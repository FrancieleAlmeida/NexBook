# 📚 NexBook

Aplicativo mobile desenvolvido com **React Native**, **TypeScript** e **Expo Router**, com foco em busca, visualização e favoritação de livros utilizando a API do **Google Books**.  
O app possui tema escuro e oferece uma experiência agradável para usuários que desejam explorar livros com facilidade.

---

## 🎯 Objetivo

Permitir ao usuário:
- Buscar livros por categoria ou título
- Ver detalhes do livro (autor, descrição, idioma, etc)
- Favoritar livros e marcar com status personalizado
- Remover favoritos
- Gerenciar o perfil de usuário
- Navegar entre telas com fluidez

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

## 📲 Telas do Aplicativo

- **Login**
- **Cadastro**
- **Página Principal**
  - Seções com livros por categoria
- **Detalhes do Livro**
- **Favoritos**
- **Perfil do Usuário**

---

## 🧠 Estrutura do Projeto

```
📦 NexBook
├── assets/                 # Imagens (ícone, fundo, splash)
├── components/            # Componentes reutilizáveis
├── contexts/              # Contextos globais (ex: AuthContext)
├── pages/                 # Telas internas (BookDetails, etc.)
├── (tabs)/                # Navegação por abas principais
├── services/              # Comunicação com API externa e Supabase
├── styles/                # Estilos globais e compartilhados
├── app.config.ts / json   # Configuração do projeto
└── ...
```

---

## 🔐 Autenticação

- Autenticação de usuários via **Supabase Auth**
- Salvamento do estado de login usando o `AsyncStorage`
- Redirecionamento automático entre login/cadastro e a tela principal

---

## 📦 Como rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/FrancieleAlmeida/NexBook.git
cd NexBook
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
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

## 🧪 Possíveis Melhorias Futuras

- Filtro por categoria/idioma na busca
- Avaliação dos livros pelo próprio usuário
- Sistema de comentários e reviews
- Sincronização de favoritos na nuvem

---

## 👩‍💻 Desenvolvedoras

Feito com ❤️ por **Franciele Almeida** e **Isabelle Rancan**
