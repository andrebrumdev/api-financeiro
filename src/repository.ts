import { Injectable } from "@nestjs/common";
import * as firebase from 'firebase-admin';
import { IUser } from "./user/entities/user.entity";
import { CreateUserDto } from "./user/dto/create-user.dto";
import { UpdateUserDto } from "./user/dto/update-user.dto";

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

  public async getUser(userId: string): Promise<IUser | null> {
    const userSnapshot = await this._collectionRef.doc(userId).get();
    if (userSnapshot.exists) {
      return userSnapshot.data() as IUser;
    }
    return null;
  }

  public async createUser(user: CreateUserDto): Promise<string> {
    const userRecord = await firebase.auth().createUser({
      email: user.email,
      displayName: user.name,
      password: user.password,
      photoURL: user.url_perfil
    })
    console.log("userRecord:UserRecord ->",userRecord);
    try {
      const userCreated: IUser = {
        id: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        password: userRecord.passwordHash ?? null,
        url_perfil: userRecord.photoURL ?? null,
        phoneNumber: userRecord.phoneNumber ?? null,
        createDate: new Date()
      };
      console.log("userCreated:IUser ->",userCreated);

      await this._collectionRef.doc(userRecord.uid).set(userCreated);

      return userRecord.uid;
    }
    catch (error) {
      await firebase.auth().deleteUser(userRecord.uid);
      throw error;
    }
  }

  public async updateUser(userId: string, updatedUser: UpdateUserDto): Promise<void> {
    await this._collectionRef.doc(userId).set(updatedUser, { merge: true });
  }

  public async deleteUser(userId: string): Promise<void> {
    try{
      await this._collectionRef.doc(userId).delete({
        exists:true
      });
    }
    catch(error){
      throw error;
    }
  }

  public async sessionLogin(idToken: string, expiresIn:number) {
    try {
      const sessionCookie = await firebase.auth().createSessionCookie(idToken,{expiresIn});
      
      // Verificar o cookie de sessão
      return sessionCookie;
    } catch (error) {
      // Lide com o erro de autenticação
      throw error;
    }
  }

}
