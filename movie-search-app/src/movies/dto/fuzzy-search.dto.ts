import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class FuzzySearchDto {
    @IsString()
    @IsNotEmpty()
    q: string;
  }