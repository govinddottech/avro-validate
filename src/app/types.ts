import { Type } from "avsc"

export enum SchemaType {
  AVSC = "avsc",
  AVDL = "avdl",
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface AvroTypeWithFields extends Type {
  fields: string[]
}

export interface AvroField {
  name: string
}
