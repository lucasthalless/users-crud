import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserSettingsInput {
  @Field({ nullable: true, defaultValue: false })
  receiveEmails: boolean;

  @Field({ nullable: true, defaultValue: false })
  receiveNotifications: boolean;
}
