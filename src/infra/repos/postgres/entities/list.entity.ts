import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { PgUser } from "./user.entity";

@Entity('tbl_list')
export class PgList {
    @PrimaryColumn()
    id_list: string;

    @Column()
    nm_list: string;

    @ManyToOne(() => PgUser, user => user.listRl)
    @JoinColumn({name: 'fr_user'})
    fr_user: PgUser | number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date
}