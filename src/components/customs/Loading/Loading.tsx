import { TableRow, TableCell } from "@/components/ui/table";
import Flex from "../Layouts/Flex";
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <TableRow>
      <TableCell className="h-72 py-24" colSpan={8}>
        <Flex className="w-full">
          <div>
            <BeatLoader
              color="#f9690e"
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default Loading;
