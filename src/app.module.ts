import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    GraphqlModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
