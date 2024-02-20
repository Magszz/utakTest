import { Flex, Paragraph } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, NotebookPen } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import _ from "lodash";
import useDatabase from "@/hooks/useDatabase";
import { formDefaultValues } from "@/lib/static/defaultValues";
import { FormStatus } from "@/lib/typings/Typings";
import { allValuesHaveLength } from "@/lib/helpers/stringHelpers";
import { DB_LOCATION } from "@/lib/loc/loc";
import dayjs from "dayjs";

const Create = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    open: false,
    disabled: true,
  });
  const { saveData } = useDatabase();

  // * GET ALL INPUT VALUES FROM FORM
  const formValues = () => {
    if (!formRef?.current) return;

    const { productName, category, price, cost, stockAmount, options } =
      formRef.current || {};

    return {
      productName: productName.value,
      category: category.value,
      price: price.value,
      cost: cost.value,
      stockAmount: stockAmount.value,
      options: options.value,
    };
  };

  // * SUBMIT FORM
  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef?.current) return;
    const dateNow = dayjs().format("MMM D, YYYY");
    setFormStatus({ ...formStatus, loading: true });

    const data = formValues() || formDefaultValues;

    const response = await saveData(DB_LOCATION.productList, {
      ...data,
      dateCreated: dateNow,
    });

    if (response) {
      formRef?.current.reset();
      setFormStatus({ ...formStatus, open: false, disabled: true });
    }
  };

  // * VALIDATE FORM VALUES | THIS WILL CHECK IF THE USER FILL ALL THE REQUIRED FIELDS
  const formChange = _.debounce(() => {
    const data = formValues() || formDefaultValues;

    setFormStatus({ ...formStatus, disabled: !allValuesHaveLength(data) });
  }, 250);

  return (
    <Dialog
      open={formStatus.open}
      onOpenChange={() =>
        setFormStatus({ ...formStatus, open: !formStatus.open })
      }
    >
      <DialogTrigger asChild>
        <Button size="sm" type="button">
          <PlusCircle className="w-4 mr-1 text-white" />
          <span>Add New Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
            <NotebookPen className="w-6 text-blue-400" />
            <span>New Product</span>
          </DialogTitle>
          <DialogDescription className="font-montserrat">
            Complete required fields to create new product
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form
          ref={formRef}
          onChange={formChange}
          className="h-full"
          onSubmit={formSubmit}
        >
          <ScrollArea className="h-full max-h-[65vh] pr-3">
            <div className="w-full create_form">
              <div className="mb-2">
                <Label required htmlFor="productName">
                  Product Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  id="productName"
                  name="productName"
                />
              </div>
              <div className="mb-2">
                <Label required htmlFor="category">
                  Product Category
                </Label>
                <Input
                  type="text"
                  placeholder="Enter product category"
                  id="category"
                  name="category"
                />
              </div>
              <div className="mb-2">
                <Label required htmlFor="price">
                  Product Price
                </Label>
                <Input
                  type="number"
                  placeholder="Enter product price"
                  id="price"
                  name="price"
                />
              </div>
              <div className="mb-2">
                <Label required htmlFor="cost">
                  Product Cost
                </Label>
                <Input
                  type="number"
                  placeholder="Enter product cost"
                  id="cost"
                  name="cost"
                />
              </div>
              <div className="mb-2">
                <Label required htmlFor="stockAmount">
                  Amount of Stock
                </Label>
                <Input
                  type="number"
                  placeholder="Enter amount of stock"
                  id="stockAmount"
                  name="stockAmount"
                />
              </div>
              <div className="mb-2">
                <Label required htmlFor="options">
                  Product Options
                </Label>
                <Paragraph fontSize="xs" className="mb-2">
                  (seperate options by comma. e.g. Small, Medium, Large;{"  "}
                  <span className="text-red-500 font-semibold">
                    insert N/A if not applicable
                  </span>
                  )
                </Paragraph>
                <Input
                  type="text"
                  placeholder="Enter product options"
                  id="options"
                  name="options"
                />
              </div>
              <div className="mb-2">
                <Label htmlFor="image">Product Image</Label>
                <Input
                  accept="image/jpeg, image/png, image/jpg"
                  type="file"
                  id="image"
                  name="image"
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Flex variant="endCentered" className="gap-2 mt-6">
              <DialogClose>
                <Button type="button" size="sm" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                loading={formStatus.loading}
                disabled={formStatus.disabled || formStatus.loading}
                type="submit"
                size="sm"
                variant="default"
              >
                Create Product
              </Button>
            </Flex>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
