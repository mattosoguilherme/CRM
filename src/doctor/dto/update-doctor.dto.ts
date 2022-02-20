import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDoctorDto {
    @ApiProperty({default:'Atualizado'})  
    @IsString({message:"Esse campo name precisar ser um texto."})
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsOptional()
    name: string;
  
    @ApiProperty({default:'1234567'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsString({message:"Esse campo crm precisar ser um texto."})
    @IsOptional()
    crm: string;
  
    @ApiProperty({default:'123456'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsString({message:"Esse campo landline precisar ser um texto."})
    @IsOptional()
    landline: string;
  
    @ApiProperty({default:'123456'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsString({message:"Esse campo cell_phone precisar ser um texto."})
    @IsOptional()
    cell_phone: string;
  
    @ApiProperty({default:'123456'})
    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsString({message:"Esse campo cep precisar ser um texto."})
    @IsOptional()
    cep: string;

    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsString({message:"Esse campo logradouro precisar ser um texto."})
    @IsOptional()
    logradouro:string;
    
    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsString({message:"Esse campo bairro precisar ser um texto."})
    @IsOptional()
    bairro:string;

    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsString({message:"Esse campo localidade precisar ser um texto."})
    @IsOptional()
    localidade:string;

    @IsNotEmpty({message:"Você precisa preencher este campo."}) 
    @IsString({message:"Esse campo uf precisar ser um texto."})
    @IsOptional()
    uf:string;

    @ApiProperty({default:'Ap 33 bloco B'})  
    @IsString({message:"Esse campo precisar ser um texto."})
    @IsNotEmpty({message:"Você precisa complement preencher este campo."})
    @IsOptional()
    complement:string;
  
    @ApiProperty({default:'Atualizado 1, Atualizado 2'}) 
    @IsNotEmpty({message:"Você precisa preencher este campo."})
    @IsArray()
    @IsOptional()
    specialty: number[];

}