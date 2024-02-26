import { Create, Flex, Heading, Subheading } from "@/components";
import { Button } from "@/components/ui/button";
import { Excel } from "@/assets/icons";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { containerLang } from "@/lib/lang/containerLang";

const Header = () => {
  return (
    <div className="p-4">
      <Flex variant="betweenCentered" className="flex-col sm:flex-row">
        {/* Header text */}
        <div className="w-full sm:w-1/2">
          <Heading className="!text-lightBlack/85 mb-1 font-semibold" type="h3">
            {containerLang.header.heading}
          </Heading>
          <Subheading className="text-gray-600" fontSize="sm">
            {containerLang.header.subheading}
          </Subheading>
        </div>

        {/* Header Buttons */}
        <Flex
          variant="endCentered"
          className="gap-2 mt-2 sm:mt-0 w-full sm:w-1/2"
        >
          <TooltipWrapper side="left" text="Export to Excel">
            <Button variant="outline" size="sm">
              <Excel className="w-4" />
            </Button>
          </TooltipWrapper>
          <Create />
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
