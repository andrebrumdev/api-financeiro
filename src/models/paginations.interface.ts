import { IsOptional } from "class-validator";

export default class Paginations{
    @IsOptional()
    perPage?:number
    
}