import { IsNumber, IsNotEmpty } from 'class-validator';

export class CrateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    value: number;
}
