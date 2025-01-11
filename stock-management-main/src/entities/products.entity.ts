import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'onepointofsale.product' })
export class ProductsEntity {
    @PrimaryColumn({ name: 'Barcode' })
    Barcode: string

    @Column({ name: 'Name' })
    name: string

    @Column({ name: 'Qty' })
    Qty: number
}