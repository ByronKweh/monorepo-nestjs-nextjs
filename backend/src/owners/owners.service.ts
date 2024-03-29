import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepo: Repository<Owner>) {}
  async create(createOwnerInput: CreateOwnerInput) {
    const new_owner = this.ownersRepo.create(createOwnerInput);

    return await this.ownersRepo.save(new_owner);
  }

  async findAll() {
    return await this.ownersRepo.find();
  }

  async findOne(id: number) {
    return await this.ownersRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
