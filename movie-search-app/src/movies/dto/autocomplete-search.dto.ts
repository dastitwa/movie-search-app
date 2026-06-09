import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class AutocompleteSearchDto {
    @IsString()
    @IsNotEmpty()
    q: string;
  }