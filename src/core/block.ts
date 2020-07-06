import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Bundle} from "./bundle";

@Entity()
export class Block {
  @PrimaryColumn()
  id: string;

  @Column({ default: 1 })
  index: number;

  @Column({ default: "" })
  content: string;

  @ManyToOne((type) => Bundle, bundle => bundle.blocks)
  bundle: Bundle;
}
