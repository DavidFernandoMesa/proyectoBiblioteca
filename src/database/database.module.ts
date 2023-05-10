import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Client } from 'pg';
import config from './../config';

// client.query('SELECT * FROM libro', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });
@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, host, port, dbName } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
