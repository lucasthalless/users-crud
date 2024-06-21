import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserSettingsService } from './user-settings.service';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Query(() => [User], { name: 'getUsers', nullable: true })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUser', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // @ResolveField(() => UserSettings, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingsService.findOne(user.id);
  // }

  @Mutation((returns) => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
