export const allowedOrigins = [
  'http://127.0.0.1:5174',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'https://my-finance-frontend.vercel.app',
];

export const options = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credential: true,
};
