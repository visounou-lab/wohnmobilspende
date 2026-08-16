import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus:border-green focus:outline-none focus:ring-2 focus:ring-green/25";

export function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-green">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(inputBase, className)} {...props} />;
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(inputBase, "min-h-[140px] resize-y", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(inputBase, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
});

/** Radio-Gruppe für Ja/Nein bzw. Ja/Nein/Info-Antworten. */
export function RadioGroup({
  options,
  register,
  error,
}: {
  options: { value: string; label: string }[];
  register: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-beige-deep bg-white px-4 py-2.5 text-sm text-ink transition-colors has-[:checked]:border-green has-[:checked]:bg-green/10 has-[:checked]:font-medium has-[:checked]:text-green-deep"
          >
            <input
              type="radio"
              value={opt.value}
              className="h-4 w-4 accent-green"
              {...register}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
