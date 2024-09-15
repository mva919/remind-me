import { Check } from "lucide-react";
import Button from "./button";

type ListItemProps = {
  id: string;
  name: string;
  key: string;
  selected: boolean;
  onClick: (id: string) => void;
};

const ListItem = ({ id, name, selected, onClick }: ListItemProps) => {
  return (
    <Button
      className={`flex items-center ${
        selected ? "ring ring-blue-500 dark:ring-blue-700" : ""
      }`}
      onClick={() => onClick(id)}
    >
      <span className="w-full overflow-hidden truncate text-start text-lg font-medium dark:text-slate-100">
        {name}
      </span>
      {selected && <Check className="block h-5 transition-all" />}
    </Button>
  );
};

export default ListItem;
