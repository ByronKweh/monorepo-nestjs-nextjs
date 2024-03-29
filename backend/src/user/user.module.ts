import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Use an environment variable or config service
      secretOrPrivateKey: 'ANOTHER_SECRET_KEY',
      signOptions: { expiresIn: '60s' }, // Set the token expiration
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
