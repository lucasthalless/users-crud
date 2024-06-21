import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { User } from './entities/user.entity';
import { UserSettingsResolver } from './user-settings.resolver';
import { UserSettingsService } from './user-settings.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UserResolver,
    UserSettingsResolver,
    UserService,
    UserSettingsService,
  ],
  exports: [UserService],
})
export class UserModule {}
