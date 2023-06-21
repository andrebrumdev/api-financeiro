import { Injectable } from "@nestjs/common";

@Injectable()
export class Repository {
  constructor() {}

  findById(bancosJSON: any[],bankId: string) {
    const requiredRecord = bancosJSON.find(record => Number(record.id) === Number(bankId));
    return requiredRecord;
  }
}
