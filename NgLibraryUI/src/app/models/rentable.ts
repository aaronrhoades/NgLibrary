import { IBaseEntity } from "./base-entity";

export interface IRentable extends IBaseEntity {
    title: string;
    description: string;
    coverImg: string;
    available: number;
    totalCount: number;
}