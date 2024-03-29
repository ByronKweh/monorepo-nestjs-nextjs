import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginOutput } from './dto/login.output';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const new_user = await this.userRepo.create(createUserInput);

    return await this.userRepo.save(new_user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(username: string, password: string): Promise<LoginOutput> {
    // const user = await thi;
    const user = await this.userRepo.findOneOrFail({
      where: {
        username: username,
      },
    });

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        id: user.id,
      }),
    };
  }
}
