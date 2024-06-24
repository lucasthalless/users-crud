import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatorArgs, SortArgs } from 'nestjs-graphql-tools';
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

  findAll(paginator: PaginatorArgs, sorting: SortArgs<User>) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.settings', 'settings')
      .orderBy(sorting);
    if (paginator) {
      queryBuilder
        .offset(paginator.page * paginator.per_page)
        .limit(paginator.per_page);
    }

    return queryBuilder.getMany();
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
