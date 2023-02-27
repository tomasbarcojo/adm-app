import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '181.4.157.72',
  port: 3306,
  username: 'develop',
  password: 'activadev',
  database: 'activa',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
