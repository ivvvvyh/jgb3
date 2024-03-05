import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('estates')
export class Estate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 200 })
    full_address: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    title: string;

    @Column({ type: 'float', nullable: true })
    rent: number;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: false, default: 0 })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: false, default: 0 })
    longitude: number;

    @Column({ nullable: true, length: 20 })
    use_for: string;

    @Column({ nullable: true, length: 20 })
    building: string;

    @Column({ type: 'varchar', length: 20, nullable: true, comment: '空間類型' })
    space_type: string;

    @Column({ nullable: true, length: 20 })
    floor: string;

    @Column({ nullable: true, length: 20 })
    floor_all: string;

    @Column({ type: 'float', name: 'size', nullable: true })
    size: number;

    @Column({ type: 'json', nullable: true })
    size_data: Record<string, any>;

    @Column({ type: 'tinyint', nullable: true })
    room_count: number;

    @Column({ type: 'int', nullable: true })
    property_purpose_key: number;

    @Column({ type: 'text', nullable: true })
    social_housing_pattern_count: string;

    @Column({ type: 'text', nullable: true })
    facilities: string;

    @Column({ nullable: true, type: 'text' })
    gallery: string;

    @Column({ type: 'tinyint', unsigned: true, default: 0, comment: '啟用狀態 0:尚未啟用 1:已啟用' })
    active: number;

    @Column({ default: 1 })
    is_open: number;

    @Column({ default: 1 })
    is_publish: number;

    @Column({ nullable: true })
    country_id: number;

    @Column({ nullable: true })
    city_id: number;

    @Column({ nullable: true })
    district_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
