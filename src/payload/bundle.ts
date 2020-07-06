import { IsNotEmpty } from "class-validator";

export class BundleCreateDTO {
    @IsNotEmpty()
    bundle: string;

}
