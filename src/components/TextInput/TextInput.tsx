interface TextInputProps {
  name: string;
  autoComplete?: string;
  label: string;
}

export const TextInput = ({ name, autoComplete, label }: TextInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-semibold text-slate-200"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          id={name}
          name={name}
          type="text"
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};
