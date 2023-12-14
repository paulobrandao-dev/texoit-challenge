# Texo IT Frontend Challenge

## Em que consiste o desafio

Desenvolver uma interface para possibilitar a leitura da lista de indicados e vencedores da categoria **Pior Filme** do _Golden Raspberry Awards_.

A Aplicação deverá ser composta por duas _views_:

- Dashboard
- Lista de todos os filmes

## Como foi realizado

### O ambiente

O desenvolvimento iniciou-se com escolha das melhores ferramentas para compor o ambiente de desenvolvimento. Segue o _setup_:

- Node 18.18.2 (não é antigo, e nem beta)
- NPM 10.2.1 como gestor de pacote
- Vite para geração de pacote por ser rápido, simples e, por usar TypeScript, é bem intuitivo
- Vitest como framework de teste por ser bem semelhante ao Jest, mas bem mais rápido
- React 18.2
- TypeScript - A melhor forma de tornar o código do frontend autodocumentado
- SASS como pré-processador de CSS

## Dependências

### Gestão de rotas

O meu gestor de rotas é o [React Router DOM v6](https://reactrouter.com/en/main) por ser o mais utilizado para essa funcionalidade, ser bem documentado e fácil de utilizar.

### Gestão de estado

Escolhi a biblioteca [ReactQuery](https://tanstack.com/query/latest) como gestor de estado assíncrono, já que todos os dados exibidos são provenientes de API.

### Qualidade de código

Escolhi duas ferramentas para garantir qualidade de código. Uma delas é o [ES Lint](https://eslint.org/), que vem configurado por padrão no template React do Vite. E, para complementar, faço uso do [Prettier](https://prettier.io/) para garantir a melhor leitura do código.

Além disso, foi inserido um _hook_ pré _commit_ que faz o _lint_ no código que vai subir, além de rodar os testes para garantir que o novo código não vai quebrar o que já foi desenvolvido.

## UI

Pensando em interface, a escolha mais lógica pra mim foi utilizar o sistema de design [Material 3 da Google](https://m3.material.io). Neste caso não optei por biblioteca pelo fato de estar desenvolvendo uma biblioteca nesse sistema de design, logo, achei conveniente aproveitar um pouco do código que já havia desenvolvido para uso nesse desafio.

## Testes

Os testes escritos incluem "Testes de Unidade" para os _hooks_ de API e "Testes de Integração" para validar o comportamento das _views_.

## Comando disponíveis

- `npm run dev`: Para iniciar o servidor de desenvolvimento
- `npm test`: Para o desenvolvimento de testes
- `npm run coverage`: Para gerar documentação da cobertura de testes
- `npm run coverage-ui`: Inicia uma UI para acompanhar a cobertura de testes pelo navegador
- `npm run build`: Criar os estáticos para produção
- `npm run preview`: Sobe um _server_ local para visualizar os estáticos gerados ou até mesmo a documentação do coverage
