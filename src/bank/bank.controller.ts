import { Controller, Get, Header, Param, ParseIntPipe, Query, Res, StreamableFile } from '@nestjs/common';
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
    async getBankDetails(@Param('id', ParseIntPipe) id: number,@Res() response) {
        const bankId = String(id).padStart(3, '0');
        const json = await this.bankService.getById(bankId);
        response.status(200).send(json)
    }

    @Get(':id/icon')
    @Header('Content-Type', 'image/*')
    getBankIcon(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res): StreamableFile {
        const bankId = String(id).padStart(3, '0');
        const imagePath = `/src/database/img/${bankId}.jpg`;
        const pathToImage = join(process.cwd(), imagePath);
        const file = createReadStream(pathToImage);
        res.set({
            'Content-Disposition': `attachment; filename="${bankId}.jpg"`,
        });
        return new StreamableFile(file);
    }

}
