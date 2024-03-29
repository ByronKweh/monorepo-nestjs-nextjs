import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // DO NOT USE IN PRODUCTION, USE MIGRATIONS INSTEAD
    }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Use an environment variable or config service
      signOptions: { expiresIn: '60s' }, // Set the token expiration
    }),
    PetsModule,
    OwnersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, JwtService],
})
export class AppModule {}
