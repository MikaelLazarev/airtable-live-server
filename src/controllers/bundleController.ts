import {
  Body,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  UploadedFiles,
} from "routing-controllers";
import { configure, getLogger, Logger } from "log4js";
import { Container, Inject } from "typedi";
import { fileUploadOptions } from "../config/multer";
import { BundlesService } from "../services/bundleService";
import { BlockUpdateDTO } from "../payload/bundle";
import { BundleNotFoundError } from "../errors/bundle";

@JsonController("/api/bundles")
export class BundlesController {
  @Inject()
  private _service: BundlesService;

  private _logger: Logger;

  public constructor() {
    this._logger = getLogger();
    this._logger.level = "debug";
    this._service = Container.get(BundlesService);
  }

  @Get("/:id")
  @OnUndefined(BundleNotFoundError)
  async retrieve(@Param("id") id: string) {
    return await this._service.retrieve(id);
  }

  // @Post("/")
  // create(@Body() dto: BundleCreateDTO) {
  //   return this._service.create(dto);
  // }

  @Post("/upload/:id")
  async upload(
    @Param("id") id: string,
    @UploadedFiles("file", fileUploadOptions)
    files: Array<Express.Multer.File>
  ) {
    this._logger.debug(files);
    const result =  await this._service.uploadImage(
        id,
        files[0].path,
        files[0].filename
        );

    console.log(result)
    return {url: result};
  }

  @Put("/block/:id")
  update(@Param("id") id: string, @Body() dto: BlockUpdateDTO) {
    console.log(dto)
    return this._service.update(id, dto);
  }
}
