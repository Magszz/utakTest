import Box from "@/assets/icons/Box";
import { Delete, Update, Flex, Paragraph } from "@/components";
import { TableRow, TableCell } from "@/components/ui/table";
import { TProduct } from "@/lib/typings/Typings";

const Product = ({
  category,
  id,
  options,
  price,
  productName,
  stockAmount,
  image,
  cost,
  dateCreated,
  lastModified,
}: TProduct) => {
  const optionList = options?.split(",");
  const product: TProduct = {
    category,
    lastModified,
    id,
    options,
    price,
    productName,
    stockAmount,
    image,
    cost,
    dateCreated,
  };

  return (
    <TableRow>
      <TableCell title={productName}>
        <Flex className="gap-6 w-full" variant="startCentered">
          {image ? (
            <img
              src={image}
              alt="Product Image"
              className="w-12 h-12 object-cover rounded-full"
            />
          ) : (
            <div className="rounded-full">
              <Box className="w-12 h-12 fill-primary" />
            </div>
          )}
          <Paragraph fontSize="md" className="w-full truncate">
            {productName}
          </Paragraph>
        </Flex>
      </TableCell>
      <TableCell className="uppercase font-semibold">{category}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{cost}</TableCell>
      <TableCell>{stockAmount}</TableCell>
      <TableCell>{dateCreated}</TableCell>
      <TableCell>{lastModified}</TableCell>
      <TableCell>
        <Flex variant="startCentered" className="gap-1 flex-wrap">
          {optionList?.map((option: string, idx: number) => (
            <span
              key={`option-${idx}`}
              className="p-1 px-2 rounded-2xl border !text-xs font-montserrat uppercase"
            >
              {option}
            </span>
          ))}
        </Flex>
      </TableCell>
      <TableCell>
        <Flex variant="startCentered" className="w-full gap-2">
          <Update product={product} />
          <Delete id={id} productName={productName} />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default Product;
