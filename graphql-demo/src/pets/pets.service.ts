import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {

    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>){}

    async findAll():Promise<Pet[]>{
        return this.petRepository.find();
    }

    createPet(createPetInput: CreatePetInput): Promise<Pet>{
        const newPet = this.petRepository.create(createPetInput);
        return this.petRepository.save(newPet);
    }

    findOne(id: number):Promise<Pet>{
        return this.petRepository.findOneById(id);
    }
}
