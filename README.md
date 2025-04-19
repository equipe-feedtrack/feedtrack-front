
- **Tipos de commit:**
- `feat`: Para novas funcionalidades.
- `fix`: Para correções de bugs.
- `docs`: Para mudanças na documentação.
- `chore`: Para tarefas gerais e atualizações.

### Exemplos de Commits:
- `feat(navbar): Adicionar dropdown para usuário`
- `fix(button): Corrigir alinhamento do botão principal`

## Padrões de Branches

- **Branch principal**: `main`
- **Branch de desenvolvimento**: `develop`
- **Prefixos de branches:**
- `feature/`: Para novas funcionalidades.
- `bugfix/`: Para correções de bugs.
- `release/`: Para preparar novas versões.
- `hotfix/`: Para correções urgentes de produção.

### Exemplos de nomes de branches:
- `feature/html-to-jsx`
- `bugfix/corrigir-erro-login`
- `release/1.0.0`

## Fluxo de Trabalho para Enzo

1. **Criação da branch de funcionalidade (feature):**
 - Enzo cria a branch `feature/html-to-jsx` a partir da `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/html-to-jsx
   ```

2. **Fazendo commits:**
 - Enzo faz commits conforme for desenvolvendo a funcionalidade.

3. **Atualizando a branch `feature/html-to-jsx` com as mudanças da `develop`:**
 - Antes de finalizar, Enzo deve garantir que sua branch está atualizada com a última versão da `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/html-to-jsx
   git merge develop
   ```

4. **Enviando a branch para o repositório remoto:**
 - Enzo envia suas alterações para o repositório remoto:
   ```bash
   git push origin feature/html-to-jsx
   ```

5. **Criando um Pull Request (PR):**
 - Enzo cria um PR para a branch `feature/html-to-jsx` para ser integrado à `develop`.

6. **Atualizando a branch `develop`:**
 - Após o merge do PR, todos devem manter a branch `develop` atualizada:
   ```bash
   git checkout develop
   git pull origin develop
   ```

## Contribuindo

- Siga os padrões de commit e as convenções de branch estabelecidas neste repositório para garantir uma colaboração eficiente.
- Caso tenha dúvidas sobre o fluxo de trabalho ou sobre as branches, consulte os colegas ou abra uma issue para discussão.
