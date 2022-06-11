import { IsString, IsEmail, IsEnum, IsISO8601, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsString()
    @MinLength(2)
    readonly firstName: string;

    @IsString()
    @MinLength(2)
    readonly lastName: string;
}
