import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'notificationitem' })
export class remainItemEntity {
    @PrimaryColumn({ name: 'Id' })
    Id: number

    @Column({ name: 'Message' })
    Message: string
}