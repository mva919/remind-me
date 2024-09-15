import { Check } from "lucide-react";
import { Toggle } from "~/components/ui/toggle";

type ListItemProps = {
  id: string;
  name: string;
  key: string;
  selected: boolean;
  onClick: (id: string) => void;
};

const ListItem = ({ id, name, selected, onClick }: ListItemProps) => {
  return (
    <Toggle
      className="min-h-[37px] py-1"
      variant="outline"
      onClick={() => onClick(id)}
    >
      <span className="w-full overflow-hidden truncate text-start">{name}</span>
      {selected && <Check className="block h-5 transition-all" />}
    </Toggle>
  );
};

export default ListItem;
