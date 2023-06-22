import { Injectable } from '@nestjs/common';
import { Cat } from '../dto/transacoes.interface';

@Injectable()
export class TransacoesService {
    private readonly cats: Cat[] = [];
}
