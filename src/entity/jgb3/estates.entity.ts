import { Entity, Index, Column, Point, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, PrimaryColumn } from 'typeorm';
import { PurposeKey } from 'common-modules/config/enum';

@Entity('estate')
export class Estate {
    @BeforeInsert()
    @BeforeUpdate()
    SaveEstate?() {
        if (!this.updated_at) this.updated_at = new Date();
    }

    @PrimaryColumn({ comment: 'ID' })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '物件名稱',
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '地址',
        nullable: false,
        default: '',
    })
    address: string;

    @Column({
        type: 'geography',
        comment: '座標',
        spatialFeatureType: 'Point',
        srid: 4326, // SRID for WGS 84 (standard for GPS coordinates),
        nullable: false,
        default: 'SRID=4326;POINT(0 0)', // 设置默认值为 [0, 0]
    })
    @Index('idx_coordinates', { spatial: true })
    coordinates: Point;

    @Column({
        type: 'int2',
        comment: '用途(0: 未定義、1:住宅、2:商用、3:車位)', // 'residential','business','parking_space'
        nullable: false,
        default: 0,
    })
    usage: number;

    @Column({
        type: 'int2',
        comment: '地產類型(1:一般房屋、2:社會住宅、3:公共空間)',
        nullable: false,
    })
    type: PurposeKey;

    @Column({
        type: 'int2',
        comment: '建築類型(0: 未定義、1:大樓、2:公寓、3:透天厝、4:別墅、5:華夏、6:農舍、7:土地)',
        nullable: false,
        default: 0,
    })
    building_type: number;

    @Column({
        type: 'int2',
        comment: '空間類型',
        nullable: false,
        default: 0,
    })
    space_type: number;

    @Column({
        type: 'varchar',
        comment: '樓層',
        nullable: true,
    })
    floor: string;

    @Column({
        type: 'varchar',
        comment: '總樓層',
        nullable: true,
    })
    total_floor: string;

    @Column({
        type: 'float',
        comment: '坪數(m2)',
        nullable: true,
    })
    size: number;

    @Column({
        type: 'int',
        comment: '租金',
        nullable: false,
        default: 0,
    })
    rent: number;

    @Column({
        type: 'json',
        comment: '圖片',
        nullable: true,
    })
    gallery: Record<string, any>[];

    @Column({
        type: 'int',
        comment: '房間數量',
        default: 0,
    })
    room_count: number;

    @Column({
        type: 'json',
        comment: '格局',
        default: () => '\'{"room": 0, "living_room": 0, "office":0, "bathroom": 0, "kitchen": 0, "balcony": 0}\'',
    })
    layout: Record<string, any>[];

    @Column({
        type: 'int',
        comment: '國家 ID',
        nullable: true,
    })
    country_id: number;

    @Column({
        type: 'int',
        comment: '城市 ID',
        nullable: true,
    })
    city_id: number;

    @Column({
        type: 'int',
        comment: '鄉鎮 ID',
        nullable: true,
    })
    district_id: number;

    @Column({ type: 'boolean', comment: '是否刊登廣告', nullable: false, default: false })
    is_advertised: boolean;

    @Column({ type: 'boolean', comment: '是否刊登房源媒合平台', nullable: false, default: false })
    is_published: boolean;

    @Column({ type: 'boolean', comment: '是否刪除', nullable: false, default: false })
    is_deleted: boolean;

    @UpdateDateColumn({ comment: '更新時間', onUpdate: 'NOW()' })
    updated_at: Date;

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}
