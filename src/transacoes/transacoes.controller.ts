import { Controller, Get, Post } from '@nestjs/common';

@Controller('transacoes')
export class TransacoesController {
    @Post()
    create(): string {
        return 'This action adds a new cat';
    }
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}