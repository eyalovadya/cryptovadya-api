import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    readonly lastName?: string;
}
