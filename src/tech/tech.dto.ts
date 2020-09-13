import { IsString, IsNotEmpty } from "class-validator";

/**
 * @description 分页查询techcrunch数据
 */
export class GetByPageDTO {
    @IsNotEmpty()
    @IsString()
    page: string;

    @IsNotEmpty()
    @IsString()
    limit: string;
}