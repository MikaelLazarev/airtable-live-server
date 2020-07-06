import { Inject, Service } from "typedi";
import { Bundle } from "../core/bundle";
import { v4 as uuidv4 } from "uuid";
import { BundleRepository } from "../repository/bundleRepository";
import config from "../config";
import { GoogleStorage } from "../repository/googleStorage";
import { getLogger, Logger } from "log4js";
import { BlockUpdateDTO } from "../payload/bundle";
import { BlockRepository } from "../repository/blockRepository";
import { Block } from "../core/block";
import {UnknownInternalError} from "../errors/unknown";

@Service()
export class BundlesService {
  @Inject()
  private _repository: BundleRepository;

  @Inject()
  private _blockRepository: BlockRepository;

  private _logger: Logger;

  constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
  }

  async retrieve(id: string): Promise<Bundle | undefined> {
    return this._repository.getFull(id);
  }

  async update(id: string, dto: BlockUpdateDTO): Promise<Bundle> {
    let bundle = await this._repository.findOne(id);
    if (bundle === undefined) {
      bundle = new Bundle();
      bundle.id = id;
      bundle.blocks = [];
      await this._repository.save(bundle);
    }
    bundle = await this._repository.findOne(id);
    if (bundle === undefined) throw UnknownInternalError;

    // bundle.blocks = bundle.blocks.filter((b) => b.index !== dto.index);
    //
    // bundle.blocks = [];

    const newBlock = new Block();
    newBlock.id = `${id}/block:${dto.index}`
    newBlock.bundle = bundle;
    newBlock.index = dto.index;
    newBlock.content = dto.block;

    await this._blockRepository.save(newBlock);
    // bundle.blocks.push(newBlock);

    return this._repository.save(bundle);
  }

  async uploadImage(
    id: string,
    path: string,
    filename: string
  ): Promise<string> {
    // const bundle = await this._repository.findOne(id);
    // if (bundle === undefined) throw BundleNotFoundError;

    const url = await GoogleStorage.uploadImage(
      config.staticImagesBucket,
      id,
      path,
      filename
    );

    return url;
  }
}
