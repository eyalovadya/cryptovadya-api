import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    private readonly jwtSecret: string;

    constructor(@Inject('UsersRepository') private readonly usersRepository: typeof User, private readonly configService: ConfigService) {
        this.jwtSecret = this.configService.get<string>('jwtSecret');
    }

    async findAll() {
        const users = await this.usersRepository.findAll<User>();
        return users.map((user) => new UserDto(user));
    }

    async getUser(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            const message = 'User with given id not found';
            throw new HttpException(message, HttpStatus.NOT_FOUND);
        }
        return new UserDto(user);
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne<User>({
            where: { email },
        });
    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = new User();
            user.email = createUserDto.email.trim().toLowerCase();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;

            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);

            const userData = await user.save();

            const token = await this.signToken(userData);
            return new UserLoginResponseDto(userData, token);
        } catch (err) {
            if (err.original.constraint === 'users_email_key') {
                const message = `User with email '${err.errors[0].value}' already exists`;
                throw new HttpException(message, HttpStatus.CONFLICT);
            }

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email.trim().toLowerCase();
        const password = userLoginRequestDto.password;

        const errorMessage = 'Invalid email or password';

        const user = await this.getUserByEmail(email);

        if (!user) {
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        const token = await this.signToken(user);
        return new UserLoginResponseDto(user, token);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;

        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        await user.destroy();
        return new UserDto(user);
    }

    async signToken(user: User) {
        const payload: JwtPayload = {
            email: user.email,
        };

        return sign(payload, this.jwtSecret, {
            // expiresIn: '72h',
        });
    }
}
