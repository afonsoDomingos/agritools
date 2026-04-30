# AgriTools🌱 - E-Commerce de Consultoria e Equipamentos Agrícolas

Aplicação completa de e-commerce para a AgriTools, especializada em serviços de consultoria agrícola & avícola e venda de equipamentos.

## 🚀 Tecnologias
- **Frontend**: React.js (Vite), Framer Motion, Lucide-React
- **Backend**: Node.js (Express), MongoDB, JWT
- **Imagens**: Cloudinary
- **Design**: Vanilla CSS com foco em estética premium e responsividade

## 📦 Estrutura do Projecto
- `/frontend`: Aplicação cliente React
- `/backend`: Servidor API Express
- `vercel.json`: Configuração de deploy para Vercel

## ⚙️ Configuração Local
1. Clone o repositório
2. Configure os ficheiros `.env` no `backend` com as credenciais fornecidas
3. Instale as dependências:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
4. Inicie os servidores:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

## 🚀 Deploy na Vercel
Este projecto está configurado para deploy monorepo na Vercel.
1. Conecte o repositório à Vercel.
2. Defina as variáveis de ambiente no dashboard da Vercel (copie do seu `.env`).
3. A Vercel usará o `vercel.json` para rotear as chamadas da API e servir o frontend.

## 👤 Admin Dashboard
Para aceder ao dashboard administrativo, crie um utilizador e altere manualmente o seu `role` para `admin` na base de dados (MongoDB).

---
Desenvolvido por AgriTools Team.
