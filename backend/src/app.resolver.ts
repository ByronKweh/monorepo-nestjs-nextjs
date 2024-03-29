import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Query((returns) => String)
  //   @UseGuards(GqlAuthGuard)
  async someMutation() {
    // Your mutation logic
    return 'OK';
  }
}
