import { Body, Request, Controller, Get, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthService } from 'src/services/auth/auth.service';
import { CreateUserDTO, UserDTO, LoginResponseDTO, UserInfoDTO } from 'src/services/auth/dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: '使用者註冊', description: '使用者註冊' })
    @ApiBody({ type: CreateUserDTO })
    @Public()
    @Post('/register')
    async register(@Body() body: CreateUserDTO) {
        return await this.authService.register(body);
    }

    @ApiOperation({ summary: '使用者登入', description: '使用者登入' })
    @ApiResponse({ type: LoginResponseDTO })
    @Public()
    @Post('/login')
    async login(@Body() body: UserDTO): Promise<LoginResponseDTO> {
        return await this.authService.login(body);
    }

    @ApiOperation({ summary: '取得使用者資料', description: '取得使用者資料' })
    @ApiResponse({ type: UserInfoDTO })
    @Get('/me')
    async getUserInfo(@Request() request): Promise<UserInfoDTO> {
        return plainToClass(UserInfoDTO, request.user, {
            excludeExtraneousValues: true,
        });
    }
}
