import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { ValidationResult } from "../types"

interface ValidationResultPanelProps {
  validationResult: ValidationResult
}

export const ValidationResultPanel: React.FC<ValidationResultPanelProps> = ({
  validationResult,
}) => {
  return (
    <div className="mt-4 p-4 border rounded shadow-md bg-white w-min whitespace-nowrap mx-auto">
      <h3
        className={`font-bold text-lg justify-center ${
          validationResult.isValid ? "text-green-600" : "text-red-600"
        }`}
      >
        {validationResult.isValid ? (
          <div className="flex items-center gap-2 justify-center">
            <CheckCircleIcon className="h-6 w-6" />
            Validation Successful
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <XCircleIcon className="h-6 w-6" />
            Validation Failed
          </div>
        )}
      </h3>
      {!validationResult.isValid && (
        <ul className="list-disc pl-5 mt-2">
          {validationResult.errors.map((error, index) => (
            <li key={index} className="text-red-600">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
