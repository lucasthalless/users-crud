import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSettings {
  @Field(() => Int)
  userId: number;

  @Field()
  receiveEmails: boolean;

  @Field()
  receiveNotifications: boolean;
}
