import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/graphql/schema.gql', // Gerar o schema GraphQL
      context: ({ req }) => ({ req }),
    }),
  ],
})
export class GraphqlModule {}
