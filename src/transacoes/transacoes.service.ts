import { Injectable } from '@nestjs/common';
import { Cat } from './entities/transacoes.interface';

@Injectable()
export class TransacoesService {
    private readonly cats: Cat[] = [];
}
