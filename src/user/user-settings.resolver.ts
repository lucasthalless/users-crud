import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSettingsInput } from './dto/create-user-settings.input';
import { UpdateUserSettingsInput } from './dto/update-user-settings.input';
import { UserSettings } from './entities/user-settings.entity';
import { UserSettingsService } from './user-settings.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Mutation(() => UserSettings)
  async createUserSettings(
    @Args('createUserSettingsInput')
    createUserSettingsInput: CreateUserSettingsInput,
  ) {
    const userSettings = await this.userSettingsService.create(
      createUserSettingsInput,
    );
    return userSettings;
  }

  @Mutation(() => UserSettings)
  async updateUserSettings(
    @Args('userId') userId: number,
    @Args('updateUserSettingsInput')
    updateUserSettingsInput: UpdateUserSettingsInput,
  ) {
    await this.userSettingsService.update(userId, updateUserSettingsInput);
    const newUserSettings = { userId, updateUserSettingsInput };
    return newUserSettings;
  }
}
