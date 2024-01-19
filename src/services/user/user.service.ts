import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { User } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
}
