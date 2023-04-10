import { Check } from "lucide-react";

type ListItemProps = {
  id: string;
  name: string;
  key: string;
  selected: boolean;
  onPress: (id: string) => void;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <button
      className={`flex items-center justify-between gap-4 rounded p-2 transition-all ${
        props.selected
          ? "bg-red-600 bg-opacity-40"
          : "bg-slate-200 dark:bg-slate-800"
      }`}
      onClick={() => props.onPress(props.id)}
    >
      <span className="text-lg font-semibold dark:text-slate-100">
        {props.name}
      </span>
      {props.selected && <Check className="transition-all" />}
    </button>
  );
};
