import { IsString, IsNotEmpty, Allow } from "class-validator";

/**
 * @description 分页查询techcrunch数据
 */
export class GetByPageDTO {
    @IsString()
    @IsNotEmpty()
    page: string;

    @IsString()
    @Allow()
    limit?: string;
}