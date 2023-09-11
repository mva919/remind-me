import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface ISelectProps {
  options: string[];
  defaultValue: string;
}

const Select = ({ options, defaultValue }: ISelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  return (
    <div className="w-full">
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded border border-slate-300 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white dark:border-slate-600 dark:bg-slate-900">
            <span className="block truncate">{selectedOption}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown size={18} />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded border border-slate-300 bg-slate-50 py-1 focus:outline-none dark:border-slate-600 dark:bg-slate-900">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative mx-2 cursor-default select-none rounded py-2 pl-10 pr-4 ${
                    active
                      ? "bg-slate-200 dark:bg-slate-800 dark:text-white"
                      : "dark:text-slate-50"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                        <Check size={18} aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
