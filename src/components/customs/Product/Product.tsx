// interface Props <T> {
//     name: string;
//     description: string;
//     price: number;
//     cost: number;
//     category: string;
//     stockAmount: number;
//     variants: T[];
//     image: string;
//     }

import { Paragraph, Subheading, Delete, ViewEdit } from "@/components";
import Flex from "../Layouts/Flex";
import Heading from "../Typography/Heading";

const Product = () => {
  return (
    <div className="w-full relative bg-white border rounded-xl shadow h-56 p-4">
      <Flex variant="betweenCentered">
        {/*  */}
        <div className="w-full max-w-[70%]">
          <Heading
            type="h4"
            className="w-full  truncate text-madison font-archivo font-bold"
          >
            Hawaiin Pizza
          </Heading>
          <Subheading fontSize="sm" className="font-semibold text-gray-500">
            Pizza
          </Subheading>
        </div>

        {/* OPTIONS */}
        <Flex variant="endCentered" className="gap-2">
          <ViewEdit />
          <Delete />
        </Flex>
      </Flex>

      {/*  */}
      <Flex variant="betweenEnd" className="h-[calc(100%-52px)]">
        <Paragraph
          className="mb-2 font-archivo text-[#f15a22] !text-2xl"
          fontSize="xl"
        >
          ₱200.00
        </Paragraph>
        <img
          src="https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2020-03/hawaiian-pizza.jpg?itok=a1-_QjRA"
          alt="Product Image"
          className="w-40 rounded-md"
        />
      </Flex>
    </div>
  );
};

export default Product;
