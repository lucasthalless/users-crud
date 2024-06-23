import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';

const MYSQL_DATABASE =
  process.env.NODE_ENV === 'test' ? 'MYSQL_TEST_DATABASE' : 'MYSQL_DATABASE';
const MYSQL_HOST =
  process.env.NODE_ENV === 'test' ? 'MYSQL_TEST_HOST' : 'MYSQL_HOST';
const MYSQL_PORT =
  process.env.NODE_ENV === 'test' ? 'MYSQL_TEST_PORT' : 'MYSQL_PORT';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow(MYSQL_HOST),
        port: configService.getOrThrow(MYSQL_PORT),
        database: configService.getOrThrow(MYSQL_DATABASE),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    GraphqlModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
