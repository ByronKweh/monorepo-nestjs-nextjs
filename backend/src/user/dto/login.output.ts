import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field()
  access_token: string;
}
