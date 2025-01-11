"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const appDataSource_1 = require("./appDataSource");
const users_entity_1 = require("./entities/users.entity");
const remainItem_entity_1 = require("./entities/remainItem.entity");
const dotenv_1 = __importDefault(require("dotenv"));
const products_entity_1 = require("./entities/products.entity");
const env = dotenv_1.default.config().parsed;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield appDataSource_1.appDataSource.createQueryBuilder().select().from(users_entity_1.UsersEntity, 'users').execute();
    console.log(users);
    res.status(200).send(users);
}));
app.get("/api/remainItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const remainItem = yield appDataSource_1.appDataSource.createQueryBuilder().select().from(remainItem_entity_1.remainItemEntity, 'item').execute();
    // console.log(remainItem)
    res.status(200).send(remainItem);
}));
app.get("/api/remainItem/:product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.params;
    const remainItem = yield appDataSource_1.appDataSource.createQueryBuilder().select().from(remainItem_entity_1.remainItemEntity, 'item').where("item.Message like :product", { product: `%${product}%` }).execute();
    // console.log(remainItem)
    res.status(200).send(remainItem);
}));
app.get("/api/products/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = parseInt(req.params.page);
    let countProduct = yield appDataSource_1.appDataSource.createQueryBuilder().select(["products.Barcode as barcode"]).from(products_entity_1.ProductsEntity, "products").getCount();
    let perPage = 20;
    let totalPage = Math.ceil(countProduct / perPage);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    if (page > totalPage || page < 1) {
        res.status(404).send();
    }
    else {
        console.log(start, end);
        const products = yield appDataSource_1.appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(products_entity_1.ProductsEntity, 'products').limit(perPage).offset(start).execute();
        res.status(200).send({ products: products, qty: products.length, totalPage: totalPage });
    }
}));
app.get("/api/search/:keyword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { keyword } = req.params;
    let convert_keyword = parseInt(keyword);
    console.log(typeof (convert_keyword));
    if (convert_keyword) {
        let searchProducts = yield appDataSource_1.appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(products_entity_1.ProductsEntity, 'products').where("products.Qty like :keyword", { keyword: `%${keyword}%` }).execute();
        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length });
    }
    else {
        let searchProducts = yield appDataSource_1.appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(products_entity_1.ProductsEntity, 'products').where("products.Name like :keyword", { keyword: `%${keyword}%` }).execute();
        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length });
    }
}));
// About IP
// app.get("/api/ip", async (req: express.Request, res: express.Response) => {
//     const ip = await centerDataSource.createQueryBuilder().select().from(CenterEntitiy, 'center').execute()
//     console.log(ip)
//     res.status(200).send(ip)
// })
// app.get("/api/ip/:represent", async (req: express.Request, res: express.Response) => {
//     // 0 => doilor
//     // 1 => Maekhan
//     // 2 => Sanpatong
//     const { represent } = req.params
//     const ip = await centerDataSource.createQueryBuilder().select().from(CenterEntitiy, 'center').where("center.id = :rep", { rep: Number(represent) + 1 }).execute()
//     res.status(200).send(ip)
// })
// app.patch("/api/updateConfig", async (req: express.Request, res: express.Response) => {
//     const { listIp } = req.body
//     listIp.map(async (item: { ip: string, tag: string }) => {
//         const updatedConfig = await centerDataSource.createQueryBuilder().update(CenterEntitiy).set({ ip: item.ip }).where({ tag: item.tag }).execute()
//     })
//     res.status(200).send()
// })
// app.patch("/api/changeName/:barcode", async (req: express.Request, res: express.Response) => {
//     // const {barcode} = 
// })
// app.patch("/api/changeNameServer", async (req: express.Request, res: express.Response) => {
// })
app.listen(env === null || env === void 0 ? void 0 : env.PORT, () => {
    console.log(`Server is running on port ${env === null || env === void 0 ? void 0 : env.PORT}`);
});
