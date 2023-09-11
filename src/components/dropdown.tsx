import React, { useRef, useState } from "react";
import Button from "./button";
import { ChevronsUpDown } from "lucide-react";
import ListItem from "./listitem";
import useOutsideClickDetecter from "~/hooks/useOutsideClickDetecter";

interface IDropdownProps {
  options: string[];
  text: string;
}

const Dropdown = ({ options, text }: IDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  useOutsideClickDetecter(ref, () => setIsExpanded(false));
  const handleListItemClick = (option: string) => {
    console.log(selectedOptions);

    if (option === "all") {
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
      } else {
        const optionsWithIdx = options.map((opt, idx) => `${opt}-${idx}`);
        setSelectedOptions(optionsWithIdx);
      }
      return;
    }

    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col space-y-2" ref={ref}>
      <Button
        className="flex h-12 items-center justify-between rounded border border-slate-300 p-2 dark:border-slate-600"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {selectedOptions.length ? (
          <div>
            <p>{`${selectedOptions.length} ${
              selectedOptions.length === 1 ? "option" : "options"
            } selected`}</p>
          </div>
        ) : (
          <p>{text}</p>
        )}
        <ChevronsUpDown size={18} />
      </Button>
      {isExpanded && (
        <div className="flex h-fit max-h-48 flex-col space-y-2 overflow-y-scroll rounded border border-slate-300 p-2 ring-slate-50 dark:border-slate-600">
          <ListItem
            id="all"
            key="all"
            name="-- Select All --"
            selected={selectedOptions.includes("all")}
            onClick={handleListItemClick}
          />
          {options.length ? (
            options.map((option, idx) => {
              return (
                <ListItem
                  id={`${option}-${idx}`}
                  key={`${option}-${idx}`}
                  name={option}
                  selected={selectedOptions.includes(`${option}-${idx}`)}
                  onClick={handleListItemClick}
                />
              );
            })
          ) : (
            <p className="text-center text-slate-50">No options available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
