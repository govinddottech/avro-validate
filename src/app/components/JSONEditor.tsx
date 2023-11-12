import { json } from "@codemirror/lang-json"
import CodeMirror, { ReactCodeMirrorRef, keymap } from "@uiw/react-codemirror"
import React, { useState, useRef } from "react"
import { formatCode } from "../lib/format"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

interface JSONEditorProps {
  testJSONValue: string
  setTestJSONValue: (value: string) => void
  isJSONValid: boolean
  setIsJSONValid: (value: boolean) => void
}

export const JSONEditor: React.FC<JSONEditorProps> = ({
  testJSONValue,
  setTestJSONValue,
  isJSONValid,
  setIsJSONValid,
}) => {
  const testJSONEditorRef = useRef<ReactCodeMirrorRef>(null)

  const handleKeyBinding = () => {
    const activeElement = document.activeElement

    if (testJSONEditorRef.current?.editor?.contains(activeElement)) {
      setTestJSONValue(formatCode(testJSONValue ?? "{}") ?? "{}")
      return true
    }
    return true
  }

  const validateJson = (value: string) => {
    try {
      JSON.parse(value)
      setIsJSONValid(true)
    } catch (e) {
      setIsJSONValid(false)
    }
  }

  const handleChange = (value: string) => {
    validateJson(value)
    setTestJSONValue(value)
  }

  const customKeyMap = keymap.of([{ key: "Alt-F", run: handleKeyBinding }])

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-2">Test JSON</h2>
      <CodeMirror
        ref={testJSONEditorRef}
        value={testJSONValue}
        height="500px"
        extensions={[json(), customKeyMap]}
        onChange={handleChange}
        className="shadow-lg"
      />
      {!isJSONValid && (
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
