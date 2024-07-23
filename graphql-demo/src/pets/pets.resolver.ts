import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { Query } from '@nestjs/graphql';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(of => Pet)
export class PetsResolver {

    constructor(private petService : PetsService){

    }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]>{
        return this.petService.findAll();
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet>{
        return this.petService.createPet(createPetInput);
    }

    @Query(returns => Pet)
    getPet(@Args('id', {type : () => Int})id : number): Promise<Pet>{
        return this.petService.findOne(id);
    }
}
