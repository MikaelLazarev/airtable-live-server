import { IsNotEmpty } from "class-validator";

export class BlockUpdateDTO {
    @IsNotEmpty()
    index: number

    @IsNotEmpty()
    block: string;

}
