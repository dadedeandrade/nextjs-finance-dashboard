# NextJS Finance Dashboard

Bem-vindo ao aplicativo de gerenciamento financeiro para o teste técnico da BIX. Esse aplicativo permite filtrar e analisar dados relacionados a despesas, receitas, transações pendentes e saldo geral baseado no JSON fornecido. Com o recurso de gráficos para análise anual e tabela de transações penmdentes

## Features

- Filtragem de dados por
- - Datas: Filtre seus dados financeiros com base em datas específicas.
- - Estado: Visualize as transações por seu estado.
- - Setor: Agrupe transações com base em tipos de setores.
- - Contas: Filtrar dados de acordo com contas específicas.

## Análise

- Análise de despesas: Entenda seus hábitos de gastos por meio de análises detalhadas de despesas.
- Análise de receita: Acompanhe e analise suas fontes de renda.
- Gráficos anuais: Visualize seus dados financeiros ao longo de um ano para uma melhor análise de tendências.
- Autenticação do usuário
  Google Sign-In: Acesse com segurança suas informações financeiras por meio do Google Sign-In.

## Stacks

Foi utilizado:
- Next.js
- Redux
- TypeScript
- Material-UI (MUI)
- Styled-components
- Design responsivo e interativo

## Primeiros passos

Etapas para instalação em maquina local:

1. Clone o repositório: git clone https://github.com/andradeviniicius/nextjs-finance-dashboard.git
2. Instale as dependências: 
```
npm install
```
3. Configure as variáveis de ambiente.

```
GOOGLE_CLIENT_ID=1234YOURGOOGLEID
GOOGLE_CLIENT_SECRET=1234YOURGOOGLESECRET

NEXTAUTH_SECRET=1234YOURNEXTAUTHPASSWORD
NEXTAUTH_URL=http://localhost:3000/ ou YOUR_URL
```

4. Execute o aplicativo: npm run dev
5. Acesse o aplicativo em http://localhost:3000

Prontinho

