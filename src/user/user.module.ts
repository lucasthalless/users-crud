import { Module } from '@nestjs/common';
import { UserSettingsResolver } from './user-settings.resolver';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserSettingsResolver, UserService],
})
export class UserModule {}
