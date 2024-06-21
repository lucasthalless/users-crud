import { Injectable } from '@nestjs/common';
import { users } from '../mocks/users.mock';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  create(createUserInput: CreateUserInput) {
    const newUser = { ...createUserInput, id: users.length + 1 };
    users.push(newUser);
    return newUser;
  }

  findAll() {
    return users;
  }

  findOne(id: number) {
    return users.find((user) => user.id === id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
