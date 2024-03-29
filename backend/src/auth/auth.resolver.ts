import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // Validate the user with your auth service
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('User not found or password incorrect');
    }
    return this.authService.login(user);
  }
}
