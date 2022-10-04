import {
    ArrayMaxSize, ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsOptional,
    IsString,
    Length
} from "class-validator";
import {noteCategoryEnum} from "../../constants/noteCategoryEnum";
import {noteStatusEnum} from "../../constants/noteStatusEnum";

export class UpdateNoteDto {
    @IsOptional()
    @IsString()
    @Length(2, 100)
    public name: string;

    @IsOptional()
    @IsDateString()
    public created: Date;

    @IsOptional()
    @IsString()
    @IsEnum(noteCategoryEnum)
    public category: string;

    @IsOptional()
    @IsString()
    @Length(2, 300)
    public content: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    public dates: Date[];

    @IsOptional()
    @IsString()
    @IsEnum(noteStatusEnum)
    public noteStatus: string;
}
