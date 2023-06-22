import { Injectable } from "@nestjs/common";
import * as firebase from 'firebase-admin';
import { IUser } from "./user/entities/user.entity";

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

@Injectable()
export class UserRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase.firestore().collection('users');

  public async getUser(userId: string): Promise<any> {
    const userSnapshot = await this._collectionRef.doc(userId).get();
    if (userSnapshot.exists) {
      return userSnapshot.data();
    }
    return null;
  }

  public async createUser(user: IUser): Promise<any> {
    const newUserRef = await this._collectionRef.add(user);
    return newUserRef.id;
  }

  public async updateUser(userId: string, updatedUser: IUser): Promise<void> {
    await this._collectionRef.doc(userId).set(updatedUser, { merge: true });
  }

  public async deleteUser(userId: string): Promise<void> {
    await this._collectionRef.doc(userId).delete();
  }
}
