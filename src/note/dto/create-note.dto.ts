import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsOptional,
    IsString,
    Length
} from "class-validator";
import {noteCategoryEnum} from "../../constants/noteCategoryEnum";
import {noteStatusEnum} from "../../constants/noteStatusEnum";

export class CreateNoteDto {
    @IsString()
    @Length(2, 100)
    public name: string;

    @IsDateString()
    public created: Date;

    @IsString()
    @IsEnum(noteCategoryEnum)
    public category: string;

    @IsString()
    @Length(2, 300)
    public content: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(0)
    @ArrayMaxSize(0)
    public dates: Date[];

    @IsString()
    @IsEnum(noteStatusEnum)
    public noteStatus: string;
}
