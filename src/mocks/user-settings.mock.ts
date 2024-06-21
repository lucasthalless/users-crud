import { UserSettings } from 'src/user/entities/user-settings.entity';

export const userSettings: UserSettings[] = [
  {
    userId: 1,
    receiveEmails: false,
    receiveNotifications: true,
  },
  {
    userId: 5,
    receiveEmails: true,
    receiveNotifications: false,
  },
];
