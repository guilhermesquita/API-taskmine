import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { PgUser } from "./user.entity";

@Entity('tbl_list')
export class PgList {
    @PrimaryGeneratedColumn()
    id_list: number;

    @Column()
    nm_list: string;

    @ManyToOne(() => PgUser, user => user.listRl)
    @JoinColumn({name: 'fr_user'})
    fr_user: PgUser | number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}