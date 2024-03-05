import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/jgb3/users.entity';
import { UserService } from 'src/services/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User], 'jgb3')],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
