import {Column,  Entity, PrimaryColumn, } from "typeorm";


@Entity()
export class Bundle {
    @PrimaryColumn()
    id: string;

    @Column()
    bundle: string;

}
