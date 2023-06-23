import { Injectable } from "@nestjs/common";

@Injectable()
export class Repository<T> {
  constructor() { }

  getById(bancosJSON: T[], bankId: string) {
    const requiredRecord = bancosJSON.find(record => Number(record["id" as keyof T]) === Number(bankId));
    return requiredRecord;
  }

  getAll(bancosJSON: T[], nameToBeMatched: object): T[] {
    if (nameToBeMatched && Object.keys(nameToBeMatched).length) {
      const filters = Object.entries(nameToBeMatched);
      return bancosJSON.filter((banco) =>
        filters.some(([key, value]) =>
          this.compareStrings(String(banco[key as keyof T]), value)
        )
      )
    }
    else {
      return bancosJSON;
    }
  }

  private compareStrings(str1: string, str2: string): boolean {
    const normalizedStr1 = this.normalizeString(str1);
    const normalizedStr2 = this.normalizeString(str2);
    return normalizedStr1.includes(normalizedStr2);
  }

  private normalizeString(str: string): string {
    return this.normalizeBR(str)
      .replace(/[.,\-\/]/g, "")
      .trim();
  }

  private normalizeBR = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

}
