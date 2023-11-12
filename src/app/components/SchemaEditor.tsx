import React, { useState, useRef } from "react"
import CodeMirror, { ReactCodeMirrorRef, keymap } from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { SchemaType } from "../types"
import { formatCode } from "../lib/format"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

interface SchemaEditorProps {
  schemaValue: string
  setSchemaValue: (value: string) => void
  schemaFormat: SchemaType
  isSchemaValid: boolean
  setIsSchemaValid: (value: boolean) => void
}

export const SchemaEditor: React.FC<SchemaEditorProps> = ({
  schemaValue,
  setSchemaValue,
  schemaFormat,
  isSchemaValid,
  setIsSchemaValid,
}) => {
  const schemaEditorRef = useRef<ReactCodeMirrorRef>(null)

  const handleKeyBinding = () => {
    if (schemaFormat === SchemaType.AVDL) {
      return true
    }

    const activeElement = document.activeElement

    if (schemaEditorRef.current?.editor?.contains(activeElement)) {
      setSchemaValue(formatCode(schemaValue ?? "{}") ?? "{}")
      return true
    }
    return true
  }

  const validateJson = (value: string) => {
    if (schemaFormat === SchemaType.AVDL) {
      return true
    }

    try {
      JSON.parse(value)
      setIsSchemaValid(true)
    } catch (e) {
      setIsSchemaValid(false)
    }
  }

  const handleChange = (value: string) => {
    validateJson(value)
    setSchemaValue(value)
  }

  const customKeyMap = keymap.of([{ key: "Alt-F", run: handleKeyBinding }])

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-2">Schema</h2>
      <CodeMirror
        ref={schemaEditorRef}
        value={schemaValue}
        height="500px"
        extensions={
          schemaFormat === SchemaType.AVSC
            ? [json(), customKeyMap]
            : [customKeyMap]
        }
        onChange={handleChange}
        className="shadow-lg"
      />
      {!isSchemaValid && (
        <div className="absolute right-0 bottom-0 flex items-center justify-center p-1">
          <span className="text-red-500 flex items-center gap-1">
            <ExclamationCircleIcon className="h-5 w-5" />
            Syntax Error
          </span>
        </div>
      )}
    </div>
  )
}
