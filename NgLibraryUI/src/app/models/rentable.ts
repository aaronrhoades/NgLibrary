import { IBaseEntity } from "./base-entity";

export interface IRentable extends IBaseEntity {
    Title: string;
    Description: string;
    CoverImg: string;
    Available: number;
    TotalCount: number;
}