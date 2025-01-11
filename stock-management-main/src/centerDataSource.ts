// import { DataSource } from "typeorm";
// import {join} from 'path'


// export const centerDataSource = new DataSource({
//     type: 'mssql',
//     database: 'playtwodb',
//     synchronize: false,
//     entities: [join(__dirname, '**', '*.entity.{ts,js}')],
//     host: 'localhost',
//     logging: true,
//     username: 'sa',
//     password: '123456',
//     options: {
//         trustServerCertificate: true
//     }
// })

// centerDataSource.initialize().then(() => {
//     console.log("CenterData is initialized!")
// })