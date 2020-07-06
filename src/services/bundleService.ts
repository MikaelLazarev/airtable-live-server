import { Inject, Service } from "typedi";
import { Bundle } from "../core/bundle";
import { BundleNotFoundError } from "../errors/bundle";
import { BundleRepository } from "../repository/bundleRepository";
import config from "../config";
import { GoogleStorage } from "../repository/googleStorage";
import { getLogger, Logger } from "log4js";
import {BundleCreateDTO} from "../payload/bundle";

@Service()
export class BundlesService {
  @Inject()
  private _repository: BundleRepository;

  private _logger: Logger;

  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
  }

  async retrieve(id: string): Promise<Bundle | undefined> {
    return this._repository.findOne(id);
  }

  async update(id: string, dto: BundleCreateDTO): Promise<Bundle> {
    const bundle = new Bundle();
    bundle.id = id;
    bundle.bundle = dto.bundle;
    return this._repository.save(bundle);
  }

  async uploadImage(
    id: string,
    path: string,
    filename: string
  ): Promise<string> {
    const bundle = await this._repository.findOne(id);
    if (bundle === undefined) throw BundleNotFoundError;

    const url = await GoogleStorage.uploadImage(
      config.staticImagesBucket,
      id,
      path,
      filename
    );

    return url;
  }
}
