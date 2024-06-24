import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Filter,
  FilterArgs,
  Paginator,
  PaginatorArgs,
  SortArgs,
  Sorting,
} from 'nestjs-graphql-tools';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserSettingsService } from './user-settings.service';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Query(() => [User], { name: 'getUsers', nullable: true })
  findAll(
    @Paginator() paginator: PaginatorArgs,
    @Filter(() => User) filter: FilterArgs,
    @Sorting(() => User) sorting: SortArgs<User>,
  ) {
    return this.userService.findAll(paginator, sorting, filter);
  }

  @Query(() => User, { name: 'getUser', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // resolve settings field (not needed with typeorm relations handler)
  // @ResolveField(() => UserSettings, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingsService.findOne(user.id);
  // }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    await this.userService.update(id, updateUserInput);
    const updatedUser = {
      id,
      ...updateUserInput,
      settings: this.userSettingsService.findOne(id),
    };
    return updatedUser;
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    this.userService.remove(id);
    return true;
  }
}
