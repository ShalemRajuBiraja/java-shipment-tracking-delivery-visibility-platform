import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      id,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    const inputClasses = [
      "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900",
      "placeholder:text-slate-400",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error || helperText ? `${inputId}-message` : undefined
          }
          {...props}
        />

        {(error || helperText) && (
          <p
            id={`${inputId}-message`}
            className={`mt-1.5 text-xs ${
              error ? "text-red-600" : "text-slate-500"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;