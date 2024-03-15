import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class PgUser {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    nm_user: string;

    @Column()
    email_user: string;

    @Column()
    password_user: number;

    @Column()
    created_at: Date;
}