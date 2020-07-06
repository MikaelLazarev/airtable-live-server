import { Service } from "typedi";
import { TypeORMRepository } from "./typeORMRepository";
import { Bundle } from "../core/bundle";

@Service()
export class BundleRepository extends TypeORMRepository<Bundle> {
  constructor() {
    super(Bundle);
  }
  getFull(id: string): Promise<Bundle | undefined> {
    return this.repository.findOne(id, { relations: ["blocks"] });
  }
}
