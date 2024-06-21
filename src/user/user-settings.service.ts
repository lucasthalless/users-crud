import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserSettingsInput } from './dto/create-user-settings.input';
import { UpdateUserSettingsInput } from './dto/update-user-settings.input';
import { UserSettings } from './entities/user-settings.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserSettingsInput: CreateUserSettingsInput) {
    const user = await this.userRepository.findOneBy({
      id: createUserSettingsInput.userId,
    });

    if (!user) throw new Error('User not found.');

    const newUserSettings = this.userSettingsRepository.create(
      createUserSettingsInput,
    );
    const userSettings =
      await this.userSettingsRepository.save(newUserSettings);
    user.settings = userSettings;
    await this.userRepository.save(user);
    return userSettings;
  }

  findOne(userId: number) {
    return this.userSettingsRepository.findOneBy({ userId });
  }

  update(userId: number, updateUserSettingsInput: UpdateUserSettingsInput) {
    this.userSettingsRepository.update(
      { userId },
      { ...updateUserSettingsInput },
    );
  }
}
