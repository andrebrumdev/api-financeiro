import { Controller, Get, Header, Param, Res, StreamableFile } from '@nestjs/common';
import { BankService } from './bank.service';
import { Repository } from 'src/repository';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('bank')
export class BankController {
  constructor(
    private readonly bankService: BankService,
    private readonly repository: Repository
) {}

  @Get(':id/icon')
  @Header('Content-Type','image/*')
  getBankIcon(@Param('id') id: string, @Res({ passthrough: true }) res): StreamableFile {
    const bankId = String(Number(id)).padStart(3, '0');
    const imagePath = `/src/database/img/${bankId}.jpg`;
    const file = createReadStream(join(process.cwd(), imagePath));
    res.set({
        'Content-Disposition': `attachment; filename="${bankId}.jpg"`,
    });
    return new StreamableFile(file);
  }

  @Get(':id')
  async getBankDetails(@Param('id') id: string) {
    const bankId = String(Number(id)).padStart(3, '0');
    const bancosJSON = await this.bankService.local();
    const json = await this.repository.findById(bancosJSON, bankId);
    return {
      status: 200,
      json,
    };
  }
}
