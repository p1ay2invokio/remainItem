import { DataSource } from "typeorm";
import {join} from 'path'


export const appDataSource = new DataSource({
    type: 'mssql',
    database: 'onepointofsale',
    synchronize: false,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    host: 'localhost',
    logging: true,
    username: 'SA',
    password: 'onepointofsale',
    port: 56029,
    options:{
        trustServerCertificate: true
    }
})

appDataSource.initialize().then(()=>{
    console.log("appDataSource is initialized!")
})