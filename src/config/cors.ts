export const allowedOrigins = [
  'http://127.0.0.1:4173',
  'http://localhost:4173',
  'http://127.0.0.1:5174',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'https://my-finance-frontend.vercel.app',
  'https://my-finance-frontend-nathaalves.vercel.app/',
  'https://my-finance-frontend-git-main-nathaalves.vercel.app/',
];

export const options = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credential: true,
};
