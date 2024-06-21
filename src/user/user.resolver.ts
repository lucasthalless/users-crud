import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  findAll() {
    return this.userService.findAll();
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
    const updatedUser = { id, updateUserInput };
    console.log(updatedUser);
    return updatedUser;
  }

  @Mutation(() => User, { nullable: true })
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    await this.userService.remove(id);
  }
}
