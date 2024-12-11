interface MessageInputProps {
  className?: string;
  name: string;
  label: string;
  labelColor: string;
}

export const MessageInput = ({
  className,
  name,
  label,
  labelColor,
}: MessageInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className={`${labelColor} text-sm/6 font-semibold`}>
        {label}
      </label>
      <div className="mt-2.5">
        <textarea
          id={name}
          name={name}
          rows={4}
          className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          defaultValue={''}
        />
      </div>
    </div>
  );
};
