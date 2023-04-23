import { Check } from "lucide-react";

type ListItemProps = {
  id: string;
  name: string;
  key: string;
  selected: boolean;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
};

const ListItem = (props: ListItemProps) => {
  return (
    <button
      className={`flex w-full items-center justify-between gap-4 overflow-hidden rounded p-2 transition-all ${
        props.selected
          ? "bg-red-600 bg-opacity-40"
          : "bg-slate-200 dark:bg-slate-800"
      }`}
      onClick={() => props.onPress(props.id)}
    >
      <span className="w-full overflow-hidden truncate text-start text-lg font-semibold dark:text-slate-100">
        {props.name}
      </span>
      {props.selected && <Check className="block h-5 transition-all" />}
    </button>
  );
};

export default ListItem;
