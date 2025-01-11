import express from 'express'
import cors from 'cors'
import { appDataSource } from './appDataSource'
import { remainItemEntity } from './entities/remainItem.entity'
import axios from 'axios'
import dotenv from 'dotenv'
import { ProductsEntity } from './entities/products.entity'
import fs from 'fs'
import https from 'https'
// import { onlineStoreDataSource } from './onlineStoreDataSource'
// import { UsersEntity } from './entities/users.entity'
import jwt from 'jsonwebtoken'

const env = dotenv.config().parsed

const app = express()

app.use(cors())
app.use(express.json())

const options = {
    key: fs.readFileSync('./privkey.pem'),
    cert: fs.readFileSync('./cert.pem')
}


app.get("/api/test", async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World API")
})

app.get("/api/remainItem", async (req: express.Request, res: express.Response) => {

    const remainItem = await appDataSource.createQueryBuilder().select().from(remainItemEntity, 'item').orderBy("item.Id", 'DESC').limit(20).execute()


    // console.log(remainItem)
    res.status(200).send(remainItem)
})

app.post("/api/moreItem", async (req: express.Request, res: express.Response) => {

    let { count } = req.body


    const remainItem = await appDataSource.createQueryBuilder().select().from(remainItemEntity, 'item').orderBy("item.Id", 'DESC').limit(20 + count).execute()
    console.log(remainItem)


    // console.log(remainItem)
    res.status(200).send(remainItem)
})

app.get("/api/remainItem/:product", async (req: express.Request, res: express.Response) => {

    const { product } = req.params

    const remainItem = await appDataSource.createQueryBuilder().select().from(remainItemEntity, 'item').where("item.Message like :product", { product: `%${product}%` }).execute()

    // console.log(remainItem)
    res.status(200).send(remainItem)
})

// app.get("/api/products/:page", async (req: express.Request, res: express.Response) => {

//     let page = parseInt(req.params.page)

//     let countProduct = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode"]).from(ProductsEntity, "products").getCount()

//     let perPage = 20

//     let totalPage = Math.ceil(countProduct / perPage)

//     const start = (page - 1) * perPage
//     const end = start + perPage

//     if (page > totalPage || page < 1) {
//         res.status(404).send()
//     } else {
//         console.log(start, end)
//         const products = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').limit(perPage).offset(start).execute()

//         res.status(200).send({ products: products, qty: products.length, totalPage: totalPage })
//     }
// })

app.get("/api/search/:keyword", async (req: express.Request, res: express.Response) => {
    let { keyword } = req.params

    let convert_keyword = parseInt(keyword)


    console.log(typeof (convert_keyword))

    if (convert_keyword) {
        let searchProducts = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').where("products.Qty like :keyword", { keyword: `%${keyword}%` }).execute()

        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length })
    } else {
        let searchProducts = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').where("products.Name like :keyword", { keyword: `%${keyword}%` }).execute()

        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length })
    }
})

app.get("/api/products/:page", async (req: express.Request, res: express.Response) => {
    let { page } = req.params

    const products = await appDataSource.createQueryBuilder().select(['products.Barcode as barcode', 'products.Name as name', 'products.RetailPrice as price', 'products.Qty as qty', 'products.Image as image']).from(ProductsEntity, "products").offset(Number(page) * 20).limit(20).execute()

    res.status(200).send({ products: products, qty: products.length })
})

// app.post('/api/login', async(req: express.Request, res: express.Response)=>{
//     let {username, password} = req.body

//     const user = await onlineStoreDataSource.createQueryBuilder().select().from(UsersEntity, 'users').where("users.username = :username AND users.password = :password", {username: username, password: password}).execute()

//     console.log(user)

//     if(user.length > 0){

//         const token = await jwt.sign({uid: user[0].uid}, 'cat')

//         res.status(200).send({message: 'Login Successful!', token: token})
//     }else{
//         res.status(401).send({message: 'Invalid Username or Password'})
//     }
// })

// https.createServer(options, app).listen(443, () => {
//     console.log("server is running on port 443")
// })



app.listen(3001, () => {
    console.log("server is running on port 3001")
})