import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/transacoes.interface';

@Injectable()
export class TransacoesService {
    private readonly cats: Cat[] = [];
}
