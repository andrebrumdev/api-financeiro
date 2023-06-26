import { Column } from "typeorm";

export class CreateTransactionDto {
    @Column({ length: 500})
    name: string;

    @Column({type:'text'})
    description: string;

    @Column({type:'number',})
    amount: number;
}
