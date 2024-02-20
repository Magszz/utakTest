import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter as FilterIcon } from "lucide-react";

import { Category } from "@/lib/typings/Typings";
import { CATEGORIES } from "@/lib/constant";

import { useState } from "react";

const Filter = () => {
  const filteredBy = sessionStorage.getItem("filteredBy") || "all";
  const [filterVal, setFilterVal] = useState<string>(filteredBy);

  const setFilter = (value: string) => {
    setFilterVal(value);
    sessionStorage.setItem("filteredBy", value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FilterIcon className="w-5 h-5 mr-2" />
          Filter by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-[400px]">
        <DropdownMenuLabel>Product Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filterVal} onValueChange={setFilter}>
          {CATEGORIES?.map((category: Category) => (
            <DropdownMenuRadioItem key={category.value} value={category.value}>
              {category.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
