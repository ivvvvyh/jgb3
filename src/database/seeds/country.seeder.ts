import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Country } from 'src/entity/jgb3/countries.entity';

export default class CountrySeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await dataSource.query('TRUNCATE country RESTART IDENTITY;');

        const repository = dataSource.getRepository(Country);
        const seedData = [
            {
                id: 1,
                name: '台灣',
                code: 'TW',
            },
            {
                id: 2,
                name: '越南',
                code: 'VN',
            },
            {
                id: 3,
                name: '菲律賓',
                code: 'PH',
            },
            {
                id: 4,
                name: '柬埔寨',
                code: 'KH',
            },
            {
                id: 5,
                name: '泰國',
                code: 'TH',
            },
            {
                id: 6,
                name: '日本',
                code: 'JP',
            },
            {
                id: 7,
                name: '中國',
                code: 'CN',
            },
            {
                id: 8,
                name: '美國',
                code: 'US',
            },
            {
                id: 9,
                name: '香港',
                code: 'HK',
            },
            {
                id: 10,
                name: '馬來西亞',
                code: 'MY',
            },
            {
                id: 11,
                name: '英國',
                code: 'GB',
            },
            {
                id: 12,
                name: '法國',
                code: 'FR',
            },
            {
                id: 13,
                name: '韓國',
                code: 'KR',
            },
            {
                id: 14,
                name: '印尼',
                code: 'ID',
            },
            {
                id: 15,
                name: '德國',
                code: 'DE',
            },
            {
                id: 16,
                name: '新加波',
                code: 'SG',
            },
            {
                id: 17,
                name: '加拿大',
                code: 'CA',
            },
            {
                id: 18,
                name: '澳洲',
                code: 'AU',
            },
            {
                id: 19,
                name: '紐西蘭',
                code: 'NZ',
            },
        ];
        await repository.insert(seedData);

        console.log(`Database seeds data: COUNTRY seed completed. ${seedData.length} rows inserted.`);
    }
}
