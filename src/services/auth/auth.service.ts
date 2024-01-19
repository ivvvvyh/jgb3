import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user/user.service';
import { CreateUserDTO, UserDTO, LoginResponseDTO } from 'src/services/auth/dto/user.dto';
import { ConflictException, NotFoundException, UnauthorizedException } from 'src/common/exceptions/custom.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async register(data: CreateUserDTO): Promise<any> {
        const { email, password } = data;
        const user = await this.userService.findOne({ where: { email } });
        if (user) throw new ConflictException('Username already exists.');
        const hashPassword = await bcrypt.hash(password, parseInt(this.configService.get('HASH_SALT')));

        await this.userService.create({ email, password: hashPassword });
        return;
    }

    async login(data: UserDTO): Promise<LoginResponseDTO> {
        const { email, password } = data;
        const user = await this.userService.findOne({ where: { email } });
        if (!user) throw new NotFoundException();

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new UnauthorizedException();

        const payload = { id: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
