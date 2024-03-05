export enum USAGE {
    UNDEFINED,
    RESIDENTIAL,
    BUSINESS,
    PARKING_SPACE,
}

// 建築類型
export enum BUILDING_TYPE {
    UNDEFINED, // 未定義
    CONDO, // 大樓
    APARTMENT, // 公寓
    TOWNHOUSE, // 透天厝
    VILLA, // 別墅
    CONDOMINIUM, // 華夏
    FARMHOUSE, // 農舍
    LAND, //土地
}

export enum PURPOSE_KEY {
    GENERAL_HOUSING = 1, // 一般住宅
    SOCIAL_HOUSING = 2, // 社會住宅
    SHARE_HOUSING = 3, // 社區共用空間
}

export enum SpaceType {
    UNDEFINED,
    FLAT, // 整戶
    STUDIO, // 套房
    ROOM, // 雅房
    PRIVATE_OFFICE, // 獨立辦公室
    DEDICATED_DESK, // 固定辦公桌
    HOT_DESK, // 共享辦公桌
    VIRTUAL_OFFICE, // 虛擬辦公室
    MEMBERSHIP, // 會員
    RETAIL_SHOP, // 店面
    OFFICE_FLAT, // 整層空間
    RAMP_PLANE, // 坡道平面
    RAMP_MACHINERY, // 坡道機械
    MACHANICAL_PLANE, // 機械平面
    MACHANICAL_MACHINERY, // 機械機械
}
