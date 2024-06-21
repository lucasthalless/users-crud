import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { userSettings } from 'src/mocks/user-settings.mock';
import { CreateUserSettingsInput } from './dto/create-user-settings.input';
import { UserSettings } from './entities/user-settings.entity';

@Resolver()
export class UserSettingsResolver {
  @Mutation((returns) => UserSettings)
  createUserSettings(
    @Args('createUserSettingsInput')
    createUserSettingsInput: CreateUserSettingsInput,
  ) {
    userSettings.push(createUserSettingsInput);
    return createUserSettingsInput;
  }
}
