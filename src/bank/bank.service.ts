import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class BankService {
    private readonly filePath= join(process.cwd(), "/src/database/bankBrasil.json");
    async local(){
        const data = fs.readFileSync(this.filePath,'utf-8');
        const jsonData = JSON.parse(data)

        return jsonData;
    }
}
