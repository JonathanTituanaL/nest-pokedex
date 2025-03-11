import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) //para que se pueda inyectar el modelo en el servicio
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      console.error(error);
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }
    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id,name or no ${term} no se encontró `,
      );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto?.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto); //:: para que retorne el nuevo objeto
    } catch (error) {
      this.handleException(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id:${id} not found`);
    }
  }

  private handleException(error: any) {
    if (error?.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error?.keyValue)}`,
      );
    } else {
      throw new InternalServerErrorException(
        `Can't create  pokemon - check server logs`,
      );
    }
  }
}
