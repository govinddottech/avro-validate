interface Field {
  name: string
  type: string | string[] | RecordType | RecordType[] | ComplexType
  default?: any
}

interface RecordType {
  name: string
  type: "record"
  fields: Field[]
}

interface ComplexType {
  type: "array" | "enum" | "map"
  items?: string | RecordType | RecordType[]
  symbols?: string[]
  values?: string | RecordType | RecordType[]
}

type SchemaElement = RecordType | ComplexType | string | string[]

export function findTopLevelRecord(schema: SchemaElement[]): string | null {
  const recordNames = new Set<string>()
  const nestedRecordNames = new Set<string>()

  function extractRecordNamesFromType(type: any) {
    if (typeof type === "string") {
      nestedRecordNames.add(type)
    } else if (Array.isArray(type)) {
      type.forEach((t) => extractRecordNamesFromType(t))
    } else if (typeof type === "object" && type !== null) {
      if (type.type === "record") {
        nestedRecordNames.add(type.name)
        type.fields.forEach((field: Field) =>
          extractRecordNamesFromType(field.type)
        )
      } else if (type.type === "array" && typeof type.items === "string") {
        nestedRecordNames.add(type.items)
      } else if (type.type === "array" && typeof type.items === "object") {
        extractRecordNamesFromType(type.items)
      }
    }
  }

  schema.forEach((element) => {
    if (
      typeof element === "object" &&
      "type" in element &&
      element.type === "record"
    ) {
      recordNames.add(element.name)
      element.fields.forEach((field) => extractRecordNamesFromType(field.type))
    }
  })

  for (let name of Array.from(recordNames)) {
    if (!nestedRecordNames.has(name)) {
      return name
    }
  }

  return null
}
