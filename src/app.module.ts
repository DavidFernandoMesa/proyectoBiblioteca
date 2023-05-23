import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configSchema from './configSchema';
import { join } from 'path';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { AutorModule } from './autor/autor.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    BibliotecaModule,
    AutorModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
