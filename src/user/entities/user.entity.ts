import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './user-settings.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  settings?: UserSettings;
}
