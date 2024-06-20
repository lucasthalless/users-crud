import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [GraphqlModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
