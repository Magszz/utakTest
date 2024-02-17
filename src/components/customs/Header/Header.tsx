import { Flex, Heading, Subheading } from "@/components";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

const Header = () => {
  return (
    <Flex variant="betweenCentered">
      <div>
        <Heading className="!text-lightBlack/85 mb-1 font-semibold" type="h3">
          Point of Sale
        </Heading>
        <Subheading className="text-gray-600" fontSize="sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Subheading>
      </div>
      <Button className="create_product" size="sm">
        <SquarePen className="text-white md:hidden" />
        <span className="hidden md:block">Create Product</span>
      </Button>
    </Flex>
  );
};

export default Header;
