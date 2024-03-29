import { Injectable } from '@nestjs/common';
import { Pet } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepo: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}
  async findAll(): Promise<Pet[]> {
    return await this.petsRepo.find();
  }

  async createPet(createPetData: CreatePetInput): Promise<Pet> {
    const new_pet = this.petsRepo.create(createPetData);
    return await this.petsRepo.save(new_pet);
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return await this.ownersService.findOne(ownerId);
  }
}
