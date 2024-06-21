import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({ relations: ['settings'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['settings'],
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    this.userRepository.update({ id }, { ...updateUserInput });
  }

  remove(id: number) {
    this.userRepository.delete({ id });
  }
}
