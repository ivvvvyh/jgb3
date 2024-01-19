import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';

export class BaseEntity {
    readonly id: number;
}

@Injectable()
export class BaseService<T extends BaseEntity> {
    constructor(private readonly repository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findOne(options: FindOneOptions<T>): Promise<T> {
        return this.repository.findOne(options);
    }

    async findById(id: number): Promise<T> {
        return await this.repository.findOne({ where: { id } } as FindOneOptions<T>);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return await this.repository.save(data);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
