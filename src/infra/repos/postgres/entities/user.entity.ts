import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { PgList } from "./list.entity";

@Entity('tbl_user')
export class PgUser {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    nm_user: string;

    @Column()
    email_user: string;

    @Column()
    password_user: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @OneToMany(() => PgList, list => list.fr_user)
    listRl: PgList[]
}