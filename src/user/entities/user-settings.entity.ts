import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSettings {
  @PrimaryColumn()
  @OneToOne(() => User)
  @Field(() => Int)
  userId: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;
}
