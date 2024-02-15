import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { City } from 'src/entity/cities.entity';

export default class CitySeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        await dataSource.query('TRUNCATE city RESTART IDENTITY;');

        const repository = dataSource.getRepository(City);
        const seedData = [
            {
                id: 1,
                name: '基隆市',
                country_id: 1,
            },
            {
                id: 2,
                name: '台北市',
                country_id: 1,
            },
            {
                id: 3,
                name: '新北市',
                country_id: 1,
            },
            {
                id: 4,
                name: '宜蘭縣',
                country_id: 1,
            },
            {
                id: 5,
                name: '新竹市',
                country_id: 1,
            },
            {
                id: 6,
                name: '新竹縣',
                country_id: 1,
            },
            {
                id: 7,
                name: '桃園市',
                country_id: 1,
            },
            {
                id: 8,
                name: '苗栗縣',
                country_id: 1,
            },
            {
                id: 9,
                name: '台中市',
                country_id: 1,
            },
            {
                id: 10,
                name: '彰化縣',
                country_id: 1,
            },
            {
                id: 11,
                name: '南投縣',
                country_id: 1,
            },
            {
                id: 12,
                name: '嘉義市',
                country_id: 1,
            },
            {
                id: 13,
                name: '嘉義縣',
                country_id: 1,
            },
            {
                id: 14,
                name: '雲林縣',
                country_id: 1,
            },
            {
                id: 15,
                name: '台南市',
                country_id: 1,
            },
            {
                id: 16,
                name: '高雄市',
                country_id: 1,
            },
            {
                id: 17,
                name: '屏東縣',
                country_id: 1,
            },
            {
                id: 18,
                name: '台東縣',
                country_id: 1,
            },
            {
                id: 19,
                name: '花蓮縣',
                country_id: 1,
            },
            {
                id: 20,
                name: '金門縣',
                country_id: 1,
            },
            {
                id: 21,
                name: '連江縣',
                country_id: 1,
            },
            {
                id: 22,
                name: '澎湖縣',
                country_id: 1,
            },
            {
                id: 23,
                name: 'Tp Hồ Chí Minh',
                country_id: 2,
            },
            {
                id: 24,
                name: 'Hà Nội',
                country_id: 2,
            },
            {
                id: 25,
                name: 'Đà Nẵng',
                country_id: 2,
            },
            {
                id: 26,
                name: 'Cần Thơ',
                country_id: 2,
            },
            {
                id: 27,
                name: 'Bình Dương',
                country_id: 2,
            },
            {
                id: 28,
                name: 'An Giang',
                country_id: 2,
            },
            {
                id: 29,
                name: 'Bà Rịa-Vũng Tàu',
                country_id: 2,
            },
            {
                id: 30,
                name: 'Bắc Giang',
                country_id: 2,
            },
            {
                id: 31,
                name: 'Bắc Kạn',
                country_id: 2,
            },
            {
                id: 32,
                name: 'Bạc Liêu',
                country_id: 2,
            },
            {
                id: 33,
                name: 'Bắc Ninh',
                country_id: 2,
            },
            {
                id: 34,
                name: 'Bến Tre',
                country_id: 2,
            },
            {
                id: 35,
                name: 'Bình Định',
                country_id: 2,
            },
            {
                id: 36,
                name: 'Bình Phước',
                country_id: 2,
            },
            {
                id: 37,
                name: 'Bình Thuận',
                country_id: 2,
            },
            {
                id: 38,
                name: 'Cà Mau',
                country_id: 2,
            },
            {
                id: 39,
                name: 'Cao Bằng',
                country_id: 2,
            },
            {
                id: 40,
                name: 'Đắk Lắk',
                country_id: 2,
            },
            {
                id: 41,
                name: 'Đắk Nông',
                country_id: 2,
            },
            {
                id: 42,
                name: 'Điện Biên',
                country_id: 2,
            },
            {
                id: 43,
                name: 'Đồng Nai',
                country_id: 2,
            },
            {
                id: 44,
                name: 'Đồng Tháp',
                country_id: 2,
            },
            {
                id: 45,
                name: 'Gia Lai',
                country_id: 2,
            },
            {
                id: 46,
                name: 'Hà Giang',
                country_id: 2,
            },
            {
                id: 47,
                name: 'Hà Nam',
                country_id: 2,
            },
            {
                id: 48,
                name: 'Hà Tĩnh',
                country_id: 2,
            },
            {
                id: 49,
                name: 'Hải Dương',
                country_id: 2,
            },
            {
                id: 50,
                name: 'Hải Phòng',
                country_id: 2,
            },
            {
                id: 51,
                name: 'Hậu Giang',
                country_id: 2,
            },
            {
                id: 52,
                name: 'Hòa Bình',
                country_id: 2,
            },
            {
                id: 53,
                name: 'Hưng Yên',
                country_id: 2,
            },
            {
                id: 54,
                name: 'Khánh Hòa',
                country_id: 2,
            },
            {
                id: 55,
                name: 'Kiên Giang',
                country_id: 2,
            },
            {
                id: 56,
                name: 'Kon Tum',
                country_id: 2,
            },
            {
                id: 57,
                name: 'Lai Châu',
                country_id: 2,
            },
            {
                id: 58,
                name: 'Lâm Đồng',
                country_id: 2,
            },
            {
                id: 59,
                name: 'Lạng Sơn',
                country_id: 2,
            },
            {
                id: 60,
                name: 'Lào Cai',
                country_id: 2,
            },
            {
                id: 61,
                name: 'Long An',
                country_id: 2,
            },
            {
                id: 62,
                name: 'Nam Định',
                country_id: 2,
            },
            {
                id: 63,
                name: 'Nghệ An',
                country_id: 2,
            },
            {
                id: 64,
                name: 'Ninh Bình',
                country_id: 2,
            },
            {
                id: 65,
                name: 'Ninh Thuận',
                country_id: 2,
            },
            {
                id: 66,
                name: 'Phú Thọ',
                country_id: 2,
            },
            {
                id: 67,
                name: 'Phú Yên',
                country_id: 2,
            },
            {
                id: 68,
                name: 'Quảng Bình',
                country_id: 2,
            },
            {
                id: 69,
                name: 'Quảng Nam',
                country_id: 2,
            },
            {
                id: 70,
                name: 'Quảng Ngãi',
                country_id: 2,
            },
            {
                id: 71,
                name: 'Quảng Ninh',
                country_id: 2,
            },
            {
                id: 72,
                name: 'Quảng Trị',
                country_id: 2,
            },
            {
                id: 73,
                name: 'Sóc Trăng',
                country_id: 2,
            },
            {
                id: 74,
                name: 'Sơn La',
                country_id: 2,
            },
            {
                id: 75,
                name: 'Tây Ninh',
                country_id: 2,
            },
            {
                id: 76,
                name: 'Thái Bình',
                country_id: 2,
            },
            {
                id: 77,
                name: 'Thái Nguyên',
                country_id: 2,
            },
            {
                id: 78,
                name: 'Thanh Hóa',
                country_id: 2,
            },
            {
                id: 79,
                name: 'Thừa Thiên Huế',
                country_id: 2,
            },
            {
                id: 80,
                name: 'Tiền Giang',
                country_id: 2,
            },
            {
                id: 81,
                name: 'Trà Vinh',
                country_id: 2,
            },
            {
                id: 82,
                name: 'Tuyên Quang',
                country_id: 2,
            },
            {
                id: 83,
                name: 'Vĩnh Long',
                country_id: 2,
            },
            {
                id: 84,
                name: 'Vĩnh Phúc',
                country_id: 2,
            },
            {
                id: 85,
                name: 'Yên Bái',
                country_id: 2,
            },
            {
                id: 86,
                name: 'Abra',
                country_id: 3,
            },
            {
                id: 87,
                name: 'Agusan Del Norte',
                country_id: 3,
            },
            {
                id: 88,
                name: 'Agusan Del Sur',
                country_id: 3,
            },
            {
                id: 89,
                name: 'Aklan',
                country_id: 3,
            },
            {
                id: 90,
                name: 'Albay',
                country_id: 3,
            },
            {
                id: 91,
                name: 'Antique',
                country_id: 3,
            },
            {
                id: 92,
                name: 'Aurora',
                country_id: 3,
            },
            {
                id: 93,
                name: 'Bataan',
                country_id: 3,
            },
            {
                id: 94,
                name: 'Batangas',
                country_id: 3,
            },
            {
                id: 95,
                name: 'Benguet',
                country_id: 3,
            },
            {
                id: 96,
                name: 'Biliran',
                country_id: 3,
            },
            {
                id: 97,
                name: 'Bohol',
                country_id: 3,
            },
            {
                id: 98,
                name: 'Bukidnon',
                country_id: 3,
            },
            {
                id: 99,
                name: 'Bulacan',
                country_id: 3,
            },
            {
                id: 100,
                name: 'Cagayan',
                country_id: 3,
            },
            {
                id: 101,
                name: 'Camarines Norte',
                country_id: 3,
            },
            {
                id: 102,
                name: 'Camarines Sur',
                country_id: 3,
            },
            {
                id: 103,
                name: 'Camiguin',
                country_id: 3,
            },
            {
                id: 104,
                name: 'Capiz',
                country_id: 3,
            },
            {
                id: 105,
                name: 'Catanduanes',
                country_id: 3,
            },
            {
                id: 106,
                name: 'Cavite',
                country_id: 3,
            },
            {
                id: 107,
                name: 'Cebu',
                country_id: 3,
            },
            {
                id: 108,
                name: 'Cotabato',
                country_id: 3,
            },
            {
                id: 109,
                name: 'Davao Del Norte',
                country_id: 3,
            },
            {
                id: 110,
                name: 'Davao Del Sur',
                country_id: 3,
            },
            {
                id: 111,
                name: 'Davao de Oro',
                country_id: 3,
            },
            {
                id: 112,
                name: 'Davao Oriental',
                country_id: 3,
            },
            {
                id: 113,
                name: 'Eastern Samar',
                country_id: 3,
            },
            {
                id: 114,
                name: 'Guimaras',
                country_id: 3,
            },
            {
                id: 115,
                name: 'Ifugao',
                country_id: 3,
            },
            {
                id: 116,
                name: 'Ilocos Norte',
                country_id: 3,
            },
            {
                id: 117,
                name: 'Ilocos Sur',
                country_id: 3,
            },
            {
                id: 118,
                name: 'Iloilo',
                country_id: 3,
            },
            {
                id: 119,
                name: 'Isabela',
                country_id: 3,
            },
            {
                id: 120,
                name: 'Kalinga',
                country_id: 3,
            },
            {
                id: 121,
                name: 'Laguna',
                country_id: 3,
            },
            {
                id: 122,
                name: 'Lanao Del Norte',
                country_id: 3,
            },
            {
                id: 123,
                name: 'Lanao Del Sur',
                country_id: 3,
            },
            {
                id: 124,
                name: 'La Union',
                country_id: 3,
            },
            {
                id: 125,
                name: 'Lazada Office',
                country_id: 3,
            },
            {
                id: 126,
                name: 'Leyte',
                country_id: 3,
            },
            {
                id: 127,
                name: 'Marinduque',
                country_id: 3,
            },
            {
                id: 128,
                name: 'Metro Manila~Caloocan',
                country_id: 3,
            },
            {
                id: 129,
                name: 'Metro Manila~Las Pinas',
                country_id: 3,
            },
            {
                id: 130,
                name: 'Metro Manila~Makati',
                country_id: 3,
            },
            {
                id: 131,
                name: 'Metro Manila~Malabon',
                country_id: 3,
            },
            {
                id: 132,
                name: 'Metro Manila~Mandaluyong',
                country_id: 3,
            },
            {
                id: 133,
                name: 'Metro Manila~Manila',
                country_id: 3,
            },
            {
                id: 134,
                name: 'Metro Manila~Marikina',
                country_id: 3,
            },
            {
                id: 135,
                name: 'Metro Manila~Muntinlupa',
                country_id: 3,
            },
            {
                id: 136,
                name: 'Metro Manila~Navotas',
                country_id: 3,
            },
            {
                id: 137,
                name: 'Metro Manila~Paranaque',
                country_id: 3,
            },
            {
                id: 138,
                name: 'Metro Manila~Pasay',
                country_id: 3,
            },
            {
                id: 139,
                name: 'Metro Manila~Pasig',
                country_id: 3,
            },
            {
                id: 140,
                name: 'Metro Manila~Pateros',
                country_id: 3,
            },
            {
                id: 141,
                name: 'Metro Manila~Quezon City',
                country_id: 3,
            },
            {
                id: 142,
                name: 'Metro Manila~San Juan',
                country_id: 3,
            },
            {
                id: 143,
                name: 'Metro Manila~Taguig',
                country_id: 3,
            },
            {
                id: 144,
                name: 'Metro Manila~Valenzuela',
                country_id: 3,
            },
            {
                id: 145,
                name: 'Misamis Occidental',
                country_id: 3,
            },
            {
                id: 146,
                name: 'Misamis Oriental',
                country_id: 3,
            },
            {
                id: 147,
                name: 'Mountain Province',
                country_id: 3,
            },
            {
                id: 148,
                name: 'Negros Occidental',
                country_id: 3,
            },
            {
                id: 149,
                name: 'Negros Oriental',
                country_id: 3,
            },
            {
                id: 150,
                name: 'North Cotabato',
                country_id: 3,
            },
            {
                id: 151,
                name: 'Northern Samar',
                country_id: 3,
            },
            {
                id: 152,
                name: 'Nueva Ecija',
                country_id: 3,
            },
            {
                id: 153,
                name: 'Nueva Vizcaya',
                country_id: 3,
            },
            {
                id: 154,
                name: 'Occidental Mindoro',
                country_id: 3,
            },
            {
                id: 155,
                name: 'Oriental Mindoro',
                country_id: 3,
            },
            {
                id: 156,
                name: 'Palawan',
                country_id: 3,
            },
            {
                id: 157,
                name: 'Pampanga',
                country_id: 3,
            },
            {
                id: 158,
                name: 'Pangasinan',
                country_id: 3,
            },
            {
                id: 159,
                name: 'Quezon',
                country_id: 3,
            },
            {
                id: 160,
                name: 'Quirino',
                country_id: 3,
            },
            {
                id: 161,
                name: 'Rizal',
                country_id: 3,
            },
            {
                id: 162,
                name: 'Romblon',
                country_id: 3,
            },
            {
                id: 163,
                name: 'Sarangani',
                country_id: 3,
            },
            {
                id: 164,
                name: 'Siquijor',
                country_id: 3,
            },
            {
                id: 165,
                name: 'Sorsogon',
                country_id: 3,
            },
            {
                id: 166,
                name: 'South Cotabato',
                country_id: 3,
            },
            {
                id: 167,
                name: 'Southern Leyte',
                country_id: 3,
            },
            {
                id: 168,
                name: 'Sultan Kudarat',
                country_id: 3,
            },
            {
                id: 169,
                name: 'Surigao Del Norte',
                country_id: 3,
            },
            {
                id: 170,
                name: 'Surigao Del Sur',
                country_id: 3,
            },
            {
                id: 171,
                name: 'Tarlac',
                country_id: 3,
            },
            {
                id: 172,
                name: 'Western Samar',
                country_id: 3,
            },
            {
                id: 173,
                name: 'Zambales',
                country_id: 3,
            },
            {
                id: 174,
                name: 'Zamboanga Del Norte',
                country_id: 3,
            },
            {
                id: 175,
                name: 'Zamboanga Del Sur',
                country_id: 3,
            },
            {
                id: 176,
                name: 'Zamboanga Sibugay',
                country_id: 3,
            },
            {
                id: 177,
                name: 'Banteay Meanchey Province',
                country_id: 4,
            },
            {
                id: 178,
                name: 'Battambang Province',
                country_id: 4,
            },
            {
                id: 179,
                name: 'Kampong Cham Province',
                country_id: 4,
            },
            {
                id: 180,
                name: 'Kampong Chhnang Province',
                country_id: 4,
            },
            {
                id: 181,
                name: 'Kampong Speu Province',
                country_id: 4,
            },
            {
                id: 182,
                name: 'Kampong Thom Province',
                country_id: 4,
            },
            {
                id: 183,
                name: 'Kampot Province',
                country_id: 4,
            },
            {
                id: 184,
                name: 'Kandal Province',
                country_id: 4,
            },
            {
                id: 185,
                name: 'Kep Province',
                country_id: 4,
            },
            {
                id: 186,
                name: 'Koh Kong Province',
                country_id: 4,
            },
            {
                id: 187,
                name: 'Kratié Province',
                country_id: 4,
            },
            {
                id: 188,
                name: 'Oddar Meanchey Province',
                country_id: 4,
            },
            {
                id: 189,
                name: 'Pailin Province',
                country_id: 4,
            },
            {
                id: 190,
                name: 'Phnom Penh',
                country_id: 4,
            },
            {
                id: 191,
                name: 'Sihanoukville Province',
                country_id: 4,
            },
            {
                id: 192,
                name: 'Preah Vihear Province',
                country_id: 4,
            },
            {
                id: 193,
                name: 'Pursat Province',
                country_id: 4,
            },
            {
                id: 194,
                name: 'Prey Veng Province',
                country_id: 4,
            },
            {
                id: 195,
                name: 'Ratanakiri Province',
                country_id: 4,
            },
            {
                id: 196,
                name: 'Siem Reap Province',
                country_id: 4,
            },
            {
                id: 197,
                name: 'Svay Rieng Province',
                country_id: 4,
            },
            {
                id: 198,
                name: 'Takéo Province',
                country_id: 4,
            },
            {
                id: 199,
                name: 'Tbong Khmum Province',
                country_id: 4,
            },
            {
                id: 200,
                name: 'Amnat Charoen',
                country_id: 5,
            },
            {
                id: 201,
                name: 'Ang Thong',
                country_id: 5,
            },
            {
                id: 202,
                name: 'Bangkok',
                country_id: 5,
            },
            {
                id: 203,
                name: 'Bueng Kan',
                country_id: 5,
            },
            {
                id: 204,
                name: 'Buriram',
                country_id: 5,
            },
            {
                id: 205,
                name: 'Chachoengsao',
                country_id: 5,
            },
            {
                id: 206,
                name: 'Chai Nat',
                country_id: 5,
            },
            {
                id: 207,
                name: 'Chaiyaphum',
                country_id: 5,
            },
            {
                id: 208,
                name: 'Chanthaburi',
                country_id: 5,
            },
            {
                id: 209,
                name: 'Chiang Mai',
                country_id: 5,
            },
            {
                id: 210,
                name: 'Chiang Rai',
                country_id: 5,
            },
            {
                id: 211,
                name: 'Chonburi',
                country_id: 5,
            },
            {
                id: 212,
                name: 'Chumphon',
                country_id: 5,
            },
            {
                id: 213,
                name: 'Kalasin',
                country_id: 5,
            },
            {
                id: 214,
                name: 'Kamphaeng Phet',
                country_id: 5,
            },
            {
                id: 215,
                name: 'Kanchanaburi',
                country_id: 5,
            },
            {
                id: 216,
                name: 'Khon Kaen',
                country_id: 5,
            },
            {
                id: 217,
                name: 'Krabi',
                country_id: 5,
            },
            {
                id: 218,
                name: 'Lampang',
                country_id: 5,
            },
            {
                id: 219,
                name: 'Lamphun',
                country_id: 5,
            },
            {
                id: 220,
                name: 'Loei',
                country_id: 5,
            },
            {
                id: 221,
                name: 'Lopburi',
                country_id: 5,
            },
            {
                id: 222,
                name: 'Mae Hong Son',
                country_id: 5,
            },
            {
                id: 223,
                name: 'Maha Sarakham',
                country_id: 5,
            },
            {
                id: 224,
                name: 'Mukdahan',
                country_id: 5,
            },
            {
                id: 225,
                name: 'Nakhon Nayok',
                country_id: 5,
            },
            {
                id: 226,
                name: 'Nakhon Pathom',
                country_id: 5,
            },
            {
                id: 227,
                name: 'Nakhon Phanom',
                country_id: 5,
            },
            {
                id: 228,
                name: 'Nakhon Ratchasima',
                country_id: 5,
            },
            {
                id: 229,
                name: 'Nakhon Sawan',
                country_id: 5,
            },
            {
                id: 230,
                name: 'Nakhon Si Thammarat',
                country_id: 5,
            },
            {
                id: 231,
                name: 'Nan',
                country_id: 5,
            },
            {
                id: 232,
                name: 'Narathiwat',
                country_id: 5,
            },
            {
                id: 233,
                name: 'Nong Bua Lamphu',
                country_id: 5,
            },
            {
                id: 234,
                name: 'Nong Khai',
                country_id: 5,
            },
            {
                id: 235,
                name: 'Nonthaburi',
                country_id: 5,
            },
            {
                id: 236,
                name: 'Pathum Thani',
                country_id: 5,
            },
            {
                id: 237,
                name: 'Pattani',
                country_id: 5,
            },
            {
                id: 238,
                name: 'Phang Nga',
                country_id: 5,
            },
            {
                id: 239,
                name: 'Phatthalung',
                country_id: 5,
            },
            {
                id: 240,
                name: 'Phayao',
                country_id: 5,
            },
            {
                id: 241,
                name: 'Phetchabun',
                country_id: 5,
            },
            {
                id: 242,
                name: 'Phetchaburi',
                country_id: 5,
            },
            {
                id: 243,
                name: 'Phichit',
                country_id: 5,
            },
            {
                id: 244,
                name: 'Phitsanulok',
                country_id: 5,
            },
            {
                id: 245,
                name: 'Phra Nakhon Si Ayutthaya',
                country_id: 5,
            },
            {
                id: 246,
                name: 'Phrae',
                country_id: 5,
            },
            {
                id: 247,
                name: 'Phuket',
                country_id: 5,
            },
            {
                id: 248,
                name: 'Prachinburi',
                country_id: 5,
            },
            {
                id: 249,
                name: 'Prachuap Khiri Khan',
                country_id: 5,
            },
            {
                id: 250,
                name: 'Ranong',
                country_id: 5,
            },
            {
                id: 251,
                name: 'Ratchaburi',
                country_id: 5,
            },
            {
                id: 252,
                name: 'Rayong',
                country_id: 5,
            },
            {
                id: 253,
                name: 'Roi Et',
                country_id: 5,
            },
            {
                id: 254,
                name: 'Sa Kaeo',
                country_id: 5,
            },
            {
                id: 255,
                name: 'Sakon Nakhon',
                country_id: 5,
            },
            {
                id: 256,
                name: 'Samut Prakan',
                country_id: 5,
            },
            {
                id: 257,
                name: 'Samut Sakhon',
                country_id: 5,
            },
            {
                id: 258,
                name: 'Samut Songkhram',
                country_id: 5,
            },
            {
                id: 259,
                name: 'Saraburi',
                country_id: 5,
            },
            {
                id: 260,
                name: 'Satun',
                country_id: 5,
            },
            {
                id: 261,
                name: 'Sing Buri',
                country_id: 5,
            },
            {
                id: 262,
                name: 'Sisaket',
                country_id: 5,
            },
            {
                id: 263,
                name: 'Songkhla',
                country_id: 5,
            },
            {
                id: 264,
                name: 'Sukhothai',
                country_id: 5,
            },
            {
                id: 265,
                name: 'Suphan Buri',
                country_id: 5,
            },
            {
                id: 266,
                name: 'Surat Thani',
                country_id: 5,
            },
            {
                id: 267,
                name: 'Surin',
                country_id: 5,
            },
            {
                id: 268,
                name: 'Tak',
                country_id: 5,
            },
            {
                id: 269,
                name: 'Trang',
                country_id: 5,
            },
            {
                id: 270,
                name: 'Trat',
                country_id: 5,
            },
            {
                id: 271,
                name: 'Ubon Ratchathani',
                country_id: 5,
            },
            {
                id: 272,
                name: 'Udon Thani',
                country_id: 5,
            },
            {
                id: 273,
                name: 'Uthai Thani',
                country_id: 5,
            },
            {
                id: 274,
                name: 'Uttaradit',
                country_id: 5,
            },
            {
                id: 275,
                name: 'Yala',
                country_id: 5,
            },
            {
                id: 276,
                name: 'Yasothon',
                country_id: 5,
            },
            {
                id: 277,
                name: 'Aberdeen',
                country_id: 11,
            },
            {
                id: 278,
                name: 'Aberdeenshire',
                country_id: 11,
            },
            {
                id: 279,
                name: 'Angus',
                country_id: 11,
            },
            {
                id: 280,
                name: 'Argyll and Bute',
                country_id: 11,
            },
            {
                id: 281,
                name: 'Ayrshire and Arran',
                country_id: 11,
            },
            {
                id: 282,
                name: 'Banffshire',
                country_id: 11,
            },
            {
                id: 283,
                name: 'Berwickshire',
                country_id: 11,
            },
            {
                id: 284,
                name: 'Caithness',
                country_id: 11,
            },
            {
                id: 285,
                name: 'Clackmannan',
                country_id: 11,
            },
            {
                id: 286,
                name: 'Dumfries',
                country_id: 11,
            },
            {
                id: 287,
                name: 'Dunbartonshire',
                country_id: 11,
            },
            {
                id: 288,
                name: 'Dundee',
                country_id: 11,
            },
            {
                id: 289,
                name: 'East Lothian',
                country_id: 11,
            },
            {
                id: 290,
                name: 'Edinburgh',
                country_id: 11,
            },
            {
                id: 291,
                name: 'Fife',
                country_id: 11,
            },
            {
                id: 292,
                name: 'Glasgow',
                country_id: 11,
            },
            {
                id: 293,
                name: 'Inverness',
                country_id: 11,
            },
            {
                id: 294,
                name: 'Kincardineshire',
                country_id: 11,
            },
            {
                id: 295,
                name: 'Lanarkshire',
                country_id: 11,
            },
            {
                id: 296,
                name: 'Midlothian',
                country_id: 11,
            },
            {
                id: 297,
                name: 'Moray',
                country_id: 11,
            },
            {
                id: 298,
                name: 'Nairn',
                country_id: 11,
            },
            {
                id: 299,
                name: 'Perth and Kinross',
                country_id: 11,
            },
            {
                id: 300,
                name: 'Renfrewshire',
                country_id: 11,
            },
            {
                id: 301,
                name: 'Ross and Cromarty',
                country_id: 11,
            },
            {
                id: 302,
                name: 'Roxburgh, Ettrick and Lauderdale',
                country_id: 11,
            },
            {
                id: 303,
                name: 'Stirling and Falkirk',
                country_id: 11,
            },
            {
                id: 304,
                name: 'Sutherland',
                country_id: 11,
            },
            {
                id: 305,
                name: 'Stewartry of Kirkcudbright',
                country_id: 11,
            },
            {
                id: 306,
                name: 'Tweeddale',
                country_id: 11,
            },
            {
                id: 307,
                name: 'West Lothian',
                country_id: 11,
            },
            {
                id: 308,
                name: 'Western Isles',
                country_id: 11,
            },
            {
                id: 309,
                name: 'Wigtown',
                country_id: 11,
            },
            {
                id: 310,
                name: 'Orkney',
                country_id: 11,
            },
            {
                id: 311,
                name: 'Shetland',
                country_id: 11,
            },
            {
                id: 312,
                name: 'Clwyd',
                country_id: 11,
            },
            {
                id: 313,
                name: 'Dyfed',
                country_id: 11,
            },
            {
                id: 314,
                name: 'Gwent',
                country_id: 11,
            },
            {
                id: 315,
                name: 'Gwynedd',
                country_id: 11,
            },
            {
                id: 316,
                name: 'Mid Glamorgan',
                country_id: 11,
            },
            {
                id: 317,
                name: 'Powys',
                country_id: 11,
            },
            {
                id: 318,
                name: 'South Glamorgan',
                country_id: 11,
            },
            {
                id: 319,
                name: 'West Glamorgan',
                country_id: 11,
            },
            {
                id: 320,
                name: 'Bedfordshire',
                country_id: 11,
            },
            {
                id: 321,
                name: 'Berkshire',
                country_id: 11,
            },
            {
                id: 322,
                name: 'Bristol',
                country_id: 11,
            },
            {
                id: 323,
                name: 'Buckinghamshire',
                country_id: 11,
            },
            {
                id: 324,
                name: 'Cambridgeshire',
                country_id: 11,
            },
            {
                id: 325,
                name: 'Cheshire',
                country_id: 11,
            },
            {
                id: 326,
                name: 'City of London',
                country_id: 11,
            },
            {
                id: 327,
                name: 'Cornwall',
                country_id: 11,
            },
            {
                id: 328,
                name: 'Cumbria',
                country_id: 11,
            },
            {
                id: 329,
                name: 'Derbyshire',
                country_id: 11,
            },
            {
                id: 330,
                name: 'Devon',
                country_id: 11,
            },
            {
                id: 331,
                name: 'Dorset',
                country_id: 11,
            },
            {
                id: 332,
                name: 'Durham',
                country_id: 11,
            },
            {
                id: 333,
                name: 'East Riding of Yorkshire',
                country_id: 11,
            },
            {
                id: 334,
                name: 'East Sussex',
                country_id: 11,
            },
            {
                id: 335,
                name: 'Essex',
                country_id: 11,
            },
            {
                id: 336,
                name: 'Gloucestershire',
                country_id: 11,
            },
            {
                id: 337,
                name: 'Greater London',
                country_id: 11,
            },
            {
                id: 338,
                name: 'Greater Manchester',
                country_id: 11,
            },
            {
                id: 339,
                name: 'Hampshire',
                country_id: 11,
            },
            {
                id: 340,
                name: 'Herefordshire',
                country_id: 11,
            },
            {
                id: 341,
                name: 'Hertfordshire',
                country_id: 11,
            },
            {
                id: 342,
                name: 'Isle of Wight',
                country_id: 11,
            },
            {
                id: 343,
                name: 'Kent',
                country_id: 11,
            },
            {
                id: 344,
                name: 'Lancashire',
                country_id: 11,
            },
            {
                id: 345,
                name: 'Leicestershire',
                country_id: 11,
            },
            {
                id: 346,
                name: 'Lincolnshire',
                country_id: 11,
            },
            {
                id: 347,
                name: 'Merseyside',
                country_id: 11,
            },
            {
                id: 348,
                name: 'Norfolk',
                country_id: 11,
            },
            {
                id: 349,
                name: 'North Yorkshire',
                country_id: 11,
            },
            {
                id: 350,
                name: 'Northamptonshire',
                country_id: 11,
            },
            {
                id: 351,
                name: 'Northumberland',
                country_id: 11,
            },
            {
                id: 352,
                name: 'Nottinghamshire',
                country_id: 11,
            },
            {
                id: 353,
                name: 'Oxfordshire',
                country_id: 11,
            },
            {
                id: 354,
                name: 'Rutland',
                country_id: 11,
            },
            {
                id: 355,
                name: 'Shropshire',
                country_id: 11,
            },
            {
                id: 356,
                name: 'Somerset',
                country_id: 11,
            },
            {
                id: 357,
                name: 'South Yorkshire',
                country_id: 11,
            },
            {
                id: 358,
                name: 'Staffordshire',
                country_id: 11,
            },
            {
                id: 359,
                name: 'Suffolk',
                country_id: 11,
            },
            {
                id: 360,
                name: 'Surrey',
                country_id: 11,
            },
            {
                id: 361,
                name: 'Tyne and Wear',
                country_id: 11,
            },
            {
                id: 362,
                name: 'Warwickshire',
                country_id: 11,
            },
            {
                id: 363,
                name: 'West Midlands',
                country_id: 11,
            },
            {
                id: 364,
                name: 'West Sussex',
                country_id: 11,
            },
            {
                id: 365,
                name: 'West Yorkshire',
                country_id: 11,
            },
            {
                id: 366,
                name: 'Wiltshire',
                country_id: 11,
            },
            {
                id: 367,
                name: 'Worcestershire',
                country_id: 11,
            },
            {
                id: 368,
                name: 'Antrim',
                country_id: 11,
            },
            {
                id: 369,
                name: 'Armagh',
                country_id: 11,
            },
            {
                id: 370,
                name: 'Down',
                country_id: 11,
            },
            {
                id: 371,
                name: 'Fermanagh',
                country_id: 11,
            },
            {
                id: 372,
                name: 'Londonderry',
                country_id: 11,
            },
            {
                id: 373,
                name: 'Tyrone',
                country_id: 11,
            },
        ];
        await repository.insert(seedData);

        console.log(`Database seeds data: CITY seed completed. ${seedData.length} rows inserted.`);
    }
}
