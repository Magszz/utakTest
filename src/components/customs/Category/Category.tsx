import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  className?: string;
}

const Category = ({ name, className }: Props) => {
  const activeCategory = sessionStorage.getItem("category") || "All Items";
  const isActive = activeCategory === name;

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`!font-monstserrat ${className} ${
        isActive ? "text-white" : "text-lightBlack"
      }`}
    >
      {name}
    </Button>
  );
};

export default Category;
