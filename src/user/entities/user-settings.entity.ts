import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSettings {
  @PrimaryColumn()
  @Field(() => Int)
  userId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;
}
