import React from "react"
import { SchemaType } from "../types"

interface SchemaFormatSelectorProps {
  setSchemaFormat: (format: SchemaType) => void
  schemaFormat: string
}

export const SchemaFormatSelector: React.FC<SchemaFormatSelectorProps> = ({
  schemaFormat,
  setSchemaFormat,
}) => {
  return (
    <select
      id="schemaFormat"
      value={schemaFormat}
      onChange={(e) => setSchemaFormat(e.target.value as SchemaType)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value={SchemaType.AVSC}>AVSC</option>
      <option value={SchemaType.AVDL}>AVDL</option>
    </select>
  )
}
