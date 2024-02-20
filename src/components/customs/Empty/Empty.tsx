import { TableRow, TableCell } from "@/components/ui/table";
import Data from "@/assets/icons/Data";
import { Flex, Heading } from "@/components";

const Empty = () => {
  return (
    <TableRow>
      <TableCell className="h-96 py-24" colSpan={8}>
        <Flex className="w-full">
          <div>
            <Data className="h-56" />
            <Heading type="h3" className="text-madison text-center my-5">
              NO DATA
            </Heading>
          </div>
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default Empty;
