import 'dotenv/config';
import { app } from './src/app';
import { sequelize } from './src/configuracao/database';

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
});
