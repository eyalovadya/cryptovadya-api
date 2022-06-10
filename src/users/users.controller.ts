import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { Controller, Get, Post, Body, HttpCode, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() userLoginRequestDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
        return this.usersService.login(userLoginRequestDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getUser(@Req() request): Promise<UserDto> {
        return this.usersService.getUser(request.user.id);
    }

    @Put('me')
    @UseGuards(JwtAuthGuard)
    update(@Body() updateUserDto: UpdateUserDto, @Req() request): Promise<UserDto> {
        return this.usersService.update(request.user.id, updateUserDto);
    }

    @Delete('me')
    @UseGuards(JwtAuthGuard)
    delete(@Req() request): Promise<UserDto> {
        return this.usersService.delete(request.user.id);
    }
}
