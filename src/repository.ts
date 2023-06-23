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

  private fireBaseToUser(userRecord:any): IUser{
    return {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      password: userRecord.passwordHash ?? null,
      url_perfil: userRecord.photoURL ?? null,
      phoneNumber: userRecord.phoneNumber ?? null
    };
  }

  public async getUser(user: any): Promise<IUser | null> {
    if(user.email){
      const userSnapshot = firebase.auth().getUsers(user);
      console.log(userSnapshot);
      return this.fireBaseToUser(userSnapshot);
    }
    const userSnapshot = await this._collectionRef.doc(user).get();
    if (userSnapshot.exists) {
      return userSnapshot.data() as IUser;
    }
    return null;
  }

  public async createUser(user: CreateUserDto): Promise<string> {
    try {
      const userRecord = await firebase.auth().createUser({
        email: user.email,
        displayName: user.name,
        password: user.password,
        photoURL: user.url_perfil
      })
      try {
        const userCreated: IUser = {
          ...this.fireBaseToUser(userRecord),
          createDate: new Date()
        };

        await this._collectionRef.doc(userRecord.uid).set(userCreated);
        console.log("userRecord =>",userRecord);
        
        return userRecord.uid;
      }
      catch (error) {
        await firebase.auth().deleteUser(userRecord.uid);
        throw error.message;
      }
    }
    catch (error) {
      throw error.message;
    }

  }

  public async updateUser(userId: string, updatedUser: UpdateUserDto): Promise<void> {
    try {
      await Promise.all([
        firebase.auth().updateUser(userId, updatedUser),
        this._collectionRef.doc(userId).set(updatedUser, { merge: true })
      ]).catch(e=>{
        throw e;
      })
    }
    catch (error) {
      console.log(error.message);
    }
  }

  public async deleteUser(userId: string): Promise<void> {
    try {
      console.log(`--------deleteUser:${userId}--------`);
      const pro = await Promise.all([
        firebase.auth().deleteUser(userId),
        this._collectionRef.doc(userId).delete({ exists: true })
      ]).catch(e=>{
        throw e;
      });
      console.log(pro);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  public async sessionLogin(idToken: string, expiresIn: number) {
    try {
      const sessionCookie = await firebase.auth().createSessionCookie(idToken, { expiresIn });

      // Verificar o cookie de sessão
      return sessionCookie;
    } catch (error) {
      // Lide com o erro de autenticação
      throw error.message;
    }
  }

}
