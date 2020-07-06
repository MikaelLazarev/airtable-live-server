import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import { Block } from "../core/block";

@Service()
export class BlockRepository extends TypeORMRepository<Block> {
  constructor() {
    super(Block);
  }

}
