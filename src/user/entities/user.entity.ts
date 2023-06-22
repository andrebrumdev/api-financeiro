import { UUID } from "crypto";

export class IUser {
    id: UUID;
    name: string;
    url_perfil: string;
    password: string;
}
