"use client"

import avro, { Service, Type } from "avsc"
import { useEffect, useState } from "react"
import {
  ValidationResultPanel,
  SchemaFormatSelector,
  SchemaEditor,
  JSONEditor,
} from "@/app/components"
import { validate } from "@/app/lib/validator"
import { SchemaType, ValidationResult } from "@/app/types"
import {
  DEFAULT_AVDL_SCHEMA,
  DEFAULT_AVSC_SCHEMA,
  DEFAULT_JSON,
} from "@/app/lib/constants"

export default function Home() {
  const [schemaValue, setSchemaValue] = useState<string>(DEFAULT_AVSC_SCHEMA)
  const [testJSONValue, setTestJSONValue] = useState<string>(DEFAULT_JSON)

  const [validationResult, setValidationResult] = useState<ValidationResult>()
  const [schemaFormat, setSchemaFormat] = useState(SchemaType.AVSC)
  const [isSchemaValid, setIsSchemaValid] = useState<boolean>(true)
  const [isJSONValid, setIsJSONValid] = useState<boolean>(true)

  const handleValidation = () => {
    let schemaType
    if (schemaFormat === SchemaType.AVSC) {
      schemaType = avro.Type.forSchema(JSON.parse(schemaValue))
    } else if (schemaFormat === SchemaType.AVDL) {
      const service = avro.parse(schemaValue) as Service
      const topLevelName = service.protocol.types.find(
        (type: Type & { event?: string }) => !!type.event
      )

      const type = service.types.find((type) => type.name === topLevelName.name)
      schemaType = type
    }

    if (!schemaType) {
      return
    }

    const result = validate(schemaType, JSON.parse(testJSONValue))
    setValidationResult(result)
  }

  useEffect(() => {
    if (schemaFormat === SchemaType.AVSC) {
      setSchemaValue(DEFAULT_AVSC_SCHEMA)
      setIsSchemaValid(true)
    } else {
      setSchemaValue(DEFAULT_AVDL_SCHEMA)
      setIsSchemaValid(true)
    }
  }, [schemaFormat])

  useEffect(() => {
    setValidationResult(undefined)
  }, [schemaValue, testJSONValue])

  return (
    <main>
      <div className="font-light text-center mb-6 flex flex-col items-center gap-4">
        <div className="text-2xl">Avro Schema JSON Validator</div>
        <div className="max-w-md text-sm">{`Validate JSON against an Avro schema (AVSC or Avro IDL format)`}</div>
        <div className="max-w-md text-sm">
          You can use{" "}
          <kbd className="border border-1 shadow-sm p-0.5 rounded-md">
            Shift
          </kbd>
          +<kbd className="border border-1 shadow-sm p-0.5 rounded-md">Alt</kbd>
          +<kbd className="border border-1 shadow-sm p-0.5 rounded-md">F</kbd>/
          <kbd className="border border-1 shadow-sm p-0.5 rounded-md">
            Shift
          </kbd>
          +
          <kbd className="border border-1 shadow-sm p-0.5 rounded-md">
            Option
          </kbd>
          +<kbd className="border border-1 shadow-sm p-0.5 rounded-md">F</kbd>{" "}
          to format your JSON.
        </div>
        <div className="w-fit flex items-center">
          <SchemaFormatSelector
            schemaFormat={schemaFormat}
            setSchemaFormat={setSchemaFormat}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SchemaEditor
          schemaFormat={schemaFormat}
          schemaValue={schemaValue}
          setSchemaValue={setSchemaValue}
          isSchemaValid={isSchemaValid}
          setIsSchemaValid={setIsSchemaValid}
        />
        <JSONEditor
          testJSONValue={testJSONValue}
          setTestJSONValue={setTestJSONValue}
          isJSONValid={isJSONValid}
          setIsJSONValid={setIsJSONValid}
        />
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleValidation}
          disabled={!isJSONValid || !isSchemaValid}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-neutral-400"
        >
          Validate
        </button>
      </div>

      {validationResult && (
        <ValidationResultPanel validationResult={validationResult} />
      )}
    </main>
  )
}
