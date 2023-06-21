import { Injectable } from "@nestjs/common";
import { IBank } from "./bank/interfaces/bank.interface";

@Injectable()
export class Repository {
  constructor() {}

  findById(bancosJSON: any[],bankId: string) {
    const requiredRecord = bancosJSON.find(record => Number(record.id) === Number(bankId));
    return requiredRecord;
  }

  findUsersByName(bancosJSON: any[],nameToBeMatched: string): IBank[] {
    return nameToBeMatched
      ? bancosJSON.filter((banco) =>
          banco.name.toLowerCase().includes(nameToBeMatched),
        )
      : bancosJSON;
  }

}
