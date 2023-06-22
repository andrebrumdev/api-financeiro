import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'src/repository';
import { IBank } from './entities/bank.interface';

@Injectable()
export class BankService {
    constructor(
        private repository : Repository<IBank>
    ) { }
    private readonly filePath= join(process.cwd(), "/src/database/bankBrasil.json");
    private banks : IBank[]=[];
    
    private async local(){
        const data = fs.readFileSync(this.filePath,'utf-8');
        const jsonData = JSON.parse(data)
        this.banks = jsonData;
    }

    async getAll(params : object): Promise<IBank[]>{
        await this.local();
        return this.repository.getAll(this.banks,params)
    }

    async getById(id : string): Promise<IBank>{
        await this.local();
        return this.repository.getById(this.banks,id)
    }

}
