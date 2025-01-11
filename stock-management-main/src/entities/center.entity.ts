import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'dbo.detail_store'})
export class CenterEntitiy{
    @PrimaryColumn({name: 'id'})
    id: number

    @Column({name: 'tag'})
    tag: string

    @Column({name: 'ip'})
    ip: string
}