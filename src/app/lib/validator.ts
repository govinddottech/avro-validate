import avsc from "avsc"
import { AvroTypeWithFields, ValidationResult } from "../types"

export const validate = (
  schema: avsc.Type,
  jsonObject: object
): ValidationResult => {
  const errors: string[] = []

  const isValid = schema.isValid(jsonObject, {
    errorHook(path, val, type) {
      let msg = `Error in field: ${path.join(".")};\t`
      if (type.typeName === "record") {
        if (val !== null && typeof val == "object") {
          const declared = new Set(
            (type as AvroTypeWithFields).fields.map((f: any) => f.name)
          )
          const extra = Object.keys(val).filter((n) => !declared.has(n))
          msg = `Extraneous fields: ${extra.join(", ")}`
        } else {
          msg += `not an object: ${val}`
        }
      } else {
        msg += `${JSON.stringify(val)} is not a valid ${type}`
      }
      errors.push(msg)
    },
    noUndeclaredFields: true,
  })

  return { isValid, errors }
}
