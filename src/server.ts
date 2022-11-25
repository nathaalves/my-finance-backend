import { initDB } from '../src/config/database';

const PORT = process.env.PORT || 5000;
initDB().then((app) => {
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
});
