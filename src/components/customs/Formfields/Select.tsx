import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/typings/Typings";
import { useState } from "react";

interface Props {
  placeholder: string;
  className?: string;
  options: Category[];
  defaultValue?: string;
  name: string;
  id: string;
  onOpenChange?: () => void;
}

const Select = ({
  placeholder,
  className,
  options,
  id,
  name,
  defaultValue,
}: Props) => {
  const [value, setValue] = useState<string>(defaultValue || "");

  return (
    <SelectContainer
      defaultValue={defaultValue}
      onValueChange={(e) => setValue(e)}
    >
      <SelectTrigger value={value} name={name} id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option: Category, idx: number) => (
          <SelectItem value={option.value} key={`option-${idx}`}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
};

export default Select;
