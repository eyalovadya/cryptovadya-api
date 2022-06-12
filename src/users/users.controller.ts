import { ConfigService } from '@nestjs/config';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { Controller, Get, Post, Body, HttpCode, Delete, Req, UseGuards, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly configService: ConfigService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<UserDto> {
        const { token, ...userData } = await this.usersService.create(createUserDto);

        this.attachTokenCookie(res, token);

        return userData;
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() userLoginRequestDto: UserLoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<UserDto> {
        const { token, ...userData } = await this.usersService.login(userLoginRequestDto);

        this.attachTokenCookie(res, token);

        return userData;
    }

    @Post('logout')
    @HttpCode(200)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token', { httpOnly: true });
        return { message: 'success' };
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
    delete(@Req() request, @Res({ passthrough: true }) res: Response): Promise<UserDto> {
        res.clearCookie('token', { httpOnly: true });
        return this.usersService.delete(request.user.id);
    }

    private attachTokenCookie(res: Response, token: string) {
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(2100, 1, 1),
            domain: this.configService.get<string>('cryptovadyaUiUrl'),
            sameSite: 'none',
        });
    }
}
