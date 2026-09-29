import 'dotenv/config';
import { app } from './src/app';
import { sequelize } from './src/configuracao/database';

const PORT = Number(process.env.PORT || 3000);

sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Rodando em http://0.0.0.0:${PORT}`));
});
