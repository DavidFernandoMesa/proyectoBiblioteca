import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  @Inject('PG') private clientPg: Client;
  getHello(): string {
    return 'Hello World!';
  }

  getLibros() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM libro', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
