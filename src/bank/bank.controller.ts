import { Controller, Get, Header, Param, Query, Res, StreamableFile } from '@nestjs/common';
import { BankService } from './bank.service';
import { createReadStream } from 'fs';
import { join } from 'path';


@Controller('bank')
export class BankController {
    constructor(
        private readonly bankService: BankService
    ) { }

    @Get()
    async getBankAll(@Query() params: any,@Res() response) {
        const json = await this.bankService.getAll(params);
        response.status(200).send(json)
    }

    
    @Get(':id')
    async getBankDetails(@Param('id') id: string,@Res() response) {
        const bankId = String(Number(id)).padStart(3, '0');
        const json = await this.bankService.getById(bankId);
        response.status(200).send(json)
    }

    @Get(':id/icon')
    @Header('Content-Type', 'image/*')
    getBankIcon(@Param('id') id: string, @Res({ passthrough: true }) res): StreamableFile {
        const bankId = String(Number(id)).padStart(3, '0');
        const imagePath = `/src/database/img/${bankId}.jpg`;
        const file = createReadStream(join(process.cwd(), imagePath));
        res.set({
            'Content-Disposition': `attachment; filename="${bankId}.jpg"`,
        });
        return new StreamableFile(file);
    }

}
