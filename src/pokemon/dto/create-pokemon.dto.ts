import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt({ message: 'El número debe ser un entero' })
  @IsPositive()
  @Min(1, { message: 'El número debe ser mínimo 1' })
  no: number;

  @IsString()
  @MinLength(1, {
    message: 'El nombre debe tener mínimo 1 caracter',
  })
  name: string;
}
