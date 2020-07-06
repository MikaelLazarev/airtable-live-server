import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Block} from "./block";

@Entity()
export class Bundle {
  @PrimaryColumn()
  id: string;

  @OneToMany((type) => Block, block => block.bundle)
  blocks: Block[];
}
