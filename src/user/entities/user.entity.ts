import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserSettings } from './user-settings.entity';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  // TODO: fix usersettings cascade delete.
  @OneToOne(() => UserSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'settings' })
  @Field({ nullable: true })
  settings?: UserSettings;
}
