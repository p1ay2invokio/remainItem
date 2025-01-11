import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'dbo.employee' })
export class UsersEntity {
    @PrimaryColumn({ name: 'uid' })
    uid: number

    @Column({ name: 'username' })
    username: string

    @Column({ name: 'password' })
    password: string
}

