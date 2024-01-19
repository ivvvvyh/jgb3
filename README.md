# JGB 3.0
## 說明
JGB 3.0

## 啟動前設置
### 啟動 PostgreSQL 資料庫
可以使用 Docker 啟動 PostgreSQL 資料庫

可以參考：
```bash
docker run --name <CONTAINER_NAME> \
           -e POSTGRES_USER=<DB_USERNAME> \
           -e POSTGRES_PASSWORD=<DB_PASSWORD> \
           -p 5432:5432 \
           -d postgres
```

### env 設置
新增  `.env` 檔案，並參考 `.env.sample` 設置環境參數


## 安裝

```bash
$ npm install
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