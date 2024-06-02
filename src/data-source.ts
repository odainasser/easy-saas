import { DataSource } from 'typeorm';
import { configService } from './config/config.service';

const AppDataSource = new DataSource(configService.getTypeOrmConfig());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;
