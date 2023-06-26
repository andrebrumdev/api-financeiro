import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500})
    name: string;

    @Column({type:'text'})
    description: string;

    @Column({type:'number',})
    amount: number;
}
