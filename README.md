# JGB 3.0
## 說明
JGB 3.0

## 啟動前設置

### env 設置
新增  `.env` 檔案，並參考 `.env.sample` 設置環境參數

### 啟動其他服務
可以使用 Docker 啟動其他使用服務

```bash
docker-compose up
```


## 安裝

```bash
$ npm install
```

## 建立基本資料

```bash
$ npm run seed
```

## 啟動

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 測試

```bash
# unit tests
$ npm run test

```

## 文件
程式啟動後，可以參考 swagger API 文件。（路徑：`/api`）