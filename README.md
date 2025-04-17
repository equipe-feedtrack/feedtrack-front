
# FeedTrack - Migração para React

Este projeto é a migração da versão HTML/CSS do FeedTrack para uma aplicação React. O foco é estruturar a aplicação com boas práticas e dividir as responsabilidades de forma colaborativa.

---

## 🚀 Etapas do Projeto

1. Inicializar projeto com React (Vite)
2. Organizar estrutura de pastas e componentes
3. Migrar páginas existentes para React
4. Implementar React Router para navegação
5. Reutilizar e adaptar os estilos CSS
6. Revisar e refatorar onde necessário

---

## 👨‍💻 Equipe

- **Cleilson** - Setup inicial, estrutura do projeto, roteamento, layout base
- **Enzo** - Migração das páginas e criação de componentes

---

## 📂 Estrutura Inicial de Pastas

```bash
src/
├── assets/
├── components/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🧩 Divisão de Tarefas

### 🔧 Cleilson

- [x] Criar projeto com Vite (`npm create vite@latest`)
- [x] Configurar React Router
- [x] Estruturar pastas (`components`, `pages`, `assets`)
- [x] Criar componentes base: `Header`, `Footer`, `Layout`
- [x] Criar sistema de rotas no `App.jsx`
- [x] Comitar base no GitHub

### 🎨 Enzo

Responsável por migrar as 8 páginas existentes para React:

| Página         | Arquivo React     | Componentes Reutilizáveis         |
|----------------|-------------------|-----------------------------------|
| Home           | `Home.jsx`        | Banner, Destaques                 |
| Sobre          | `Sobre.jsx`       | Seções de texto, Missão/Visão     |
| Serviços       | `Servicos.jsx`    | Lista de serviços                 |
| Contato        | `Contato.jsx`     | Formulário, Mapa                  |
| Login          | `Login.jsx`       | Formulário de login               |
| Cadastro       | `Cadastro.jsx`    | Formulário de cadastro            |
| Equipe         | `Equipe.jsx`      | Cards de integrantes              |
| FAQ            | `Faq.jsx`         | Acordeões com perguntas/respostas |

---

## 🔄 Workflow no GitHub

- Cada tarefa deve ser feita em uma branch com nome claro: `feature/home-page`
- Após terminar, abrir um Pull Request para `main`
- O outro membro revisa antes de aprovar o merge

---

## 📋 Quadro de Tarefas (GitHub Projects)

**To Do**
- Migrar página Home
- Migrar página Sobre
- Migrar página Serviços
- ...

**In Progress**
- Página Contato

**Done**
- Setup inicial (por Cleilson)
- Estrutura de rotas

---

## 📆 Prazo

- Setup inicial: até **[definir data]**
- Migração de páginas: até **[definir data]**
- Entrega final: até **[definir data]**
