import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface InputFeedbackProps {
  value: string;
  maxLength?: number;
  minLength?: number;
  validationFn?: (value: string) => { valid: boolean; message?: string };
  message?: string;
}

export const InputFeedback: React.FC<InputFeedbackProps> = ({
  value,
  maxLength,
  minLength,
  validationFn,
  message,
}) => {
  const len = value.length;
  const isEmpty = len === 0;

  const getValidation = (): { valid: boolean; message?: string } | null => {
    if (isEmpty) return null;

    if (minLength && len < minLength) {
      return { valid: false, message: `Minimum ${minLength} characters required` };
    }
    if (maxLength && len > maxLength) {
      return { valid: false, message: `Maximum ${maxLength} characters exceeded` };
    }
    if (validationFn) {
      return validationFn(value);
    }
    return { valid: true, message };
  };

  const validation = getValidation();
  const showCounter = maxLength !== undefined || minLength !== undefined;
  const nearLimit = maxLength ? len >= maxLength * 0.9 : false;

  return (
    <div className="flex items-center justify-between mt-1.5 min-h-[1.25rem]">
      <div className="flex items-center gap-1.5">
        {validation && (
          <>
            {validation.valid ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
            )}
            {validation.message && (
              <span
                className={`text-xs font-medium ${
                  validation.valid
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {validation.message}
              </span>
            )}
          </>
        )}
      </div>

      {showCounter && (
        <span
          className={`text-xs font-mono tabular-nums ${
            nearLimit
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {len}
          {maxLength ? `/${maxLength}` : ''}
        </span>
      )}
    </div>
  );
};
