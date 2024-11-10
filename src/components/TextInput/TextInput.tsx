interface TextInputProps {
  className?: string;
  name: string;
  autoComplete?: string;
  label: string;
  labelColor: string;
}

export const TextInput = ({
  className,
  name,
  autoComplete,
  label,
  labelColor,
}: TextInputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`${labelColor} block text-sm/6 font-semibold`}
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          id={name}
          name={name}
          type="text"
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};
