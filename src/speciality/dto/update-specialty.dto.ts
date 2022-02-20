import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class UpdateSpecialtyDto  {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    specialty:string;
}
