import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { AuthResolver } from './auth/auth.resolver';
import { AppResolver } from './app.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,

      playground: true,
    }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Use an environment variable or config service
      signOptions: { expiresIn: '60s' }, // Set the token expiration
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthResolver, AppResolver, JwtService],
})
export class AppModule {}
