import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { CreateUserDTO, UserDTO, LoginResponseDTO, UserInfoDTO } from 'src/services/auth/dto/user.dto';
import { plainToClass } from 'class-transformer';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
        getUserInfo: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('register', () => {
        it('should call authService.register with provided data', async () => {
            const createUserDTO: CreateUserDTO = {
                email: 'test@email.com',
                password: 'testPassword',
            };

            await authController.register(createUserDTO);

            expect(authService.register).toHaveBeenCalledWith(createUserDTO);
        });
    });

    describe('login', () => {
        it('should call authService.login with provided data', async () => {
            const userDTO: UserDTO = {
                email: 'test@email.com',
                password: 'testPassword',
            };

            const mockLoginResponse: LoginResponseDTO = {
                token: 'mockToken',
            };

            jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve(mockLoginResponse));
            const result = await authController.login(userDTO);

            expect(authService.login).toHaveBeenCalledWith(userDTO);
            expect(result).toEqual(mockLoginResponse);
        });
    });

    describe('getUserInfo', () => {
        it('should return the user from the request', async () => {
            const mockUser: UserInfoDTO = {
                id: 1,
                email: 'test@email.com',
            };
            jest.spyOn(authController, 'getUserInfo').mockImplementation(async () => {
                return plainToClass(UserInfoDTO, mockUser, { excludeExtraneousValues: true });
            });

            const result = await authController.getUserInfo({ user: mockUser });
            expect(result).toEqual(plainToClass(UserInfoDTO, mockUser, { excludeExtraneousValues: true }));
        });
    });
});
