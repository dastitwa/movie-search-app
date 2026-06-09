import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class KeywordSearchDto {
    @IsString()
    @IsNotEmpty()
    field: string;
  
    @IsString()
    @IsNotEmpty()
    value: string;
  }