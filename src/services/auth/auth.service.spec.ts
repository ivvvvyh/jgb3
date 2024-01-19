import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user/user.service';
import { CreateUserDTO, UserDTO } from 'src/services/auth/dto/user.dto';
import { ConflictException, NotFoundException, UnauthorizedException } from 'src/common/exceptions/custom.exception';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/users.entity';

jest.mock('bcrypt');
jest.mock('@nestjs/config');
jest.mock('src/services/user/user.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let configService: ConfigService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UserService, ConfigService, JwtService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        configService = module.get<ConfigService>(ConfigService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const createUserDTO: CreateUserDTO = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockHashedPassword = 'hashedPassword';

            jest.spyOn(userService, 'findOne').mockResolvedValue(null);
            jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword);
            jest.spyOn(userService, 'create').mockResolvedValue(undefined);

            await authService.register(createUserDTO);
            expect(userService.findOne).toHaveBeenCalledWith({ where: { email: createUserDTO.email } });
            expect(userService.create).toHaveBeenCalledWith({
                email: createUserDTO.email,
                password: mockHashedPassword,
            });
        });

        it('should throw ConflictException if username already exists', async () => {
            const createUserDto: CreateUserDTO = {
                email: 'existing@example.com',
                password: 'password123',
            };
            const existingUser = new User(createUserDto);
            jest.spyOn(userService, 'findOne').mockResolvedValue(existingUser);

            await expect(authService.register(createUserDto)).rejects.toThrowError(ConflictException);
        });
    });

    describe('login', () => {
        it('should login a user', async () => {
            const userDto: UserDTO = {
                email: 'test@example.com',
                password: 'password123',
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
            } as User;

            jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            jest.spyOn(jwtService, 'signAsync').mockResolvedValue('fakeToken');

            const result = await authService.login(userDto);
            expect(result).toEqual({ token: 'fakeToken' });
        });

        it('should throw NotFoundException if user not found', async () => {
            const userDto: UserDTO = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            jest.spyOn(userService, 'findOne').mockResolvedValue(null);

            await expect(authService.login(userDto)).rejects.toThrowError(NotFoundException);
        });

        it('should throw UnauthorizedException if password is incorrect', async () => {
            const userDto: UserDTO = {
                email: 'test@example.com',
                password: 'incorrectPassword',
            };

            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
            } as User;

            jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

            await expect(authService.login(userDto)).rejects.toThrowError(UnauthorizedException);
        });
    });
});
