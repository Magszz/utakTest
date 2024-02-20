import { Flex, Paragraph } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { SquarePen } from "lucide-react";
import { useRef } from "react";

const Edit = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <TooltipWrapper text="Edit" side="top">
      <form ref={formRef}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" type="button">
              <SquarePen className="w-4  " />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
                <SquarePen className="w-6 text-blue-400" />
                <span>Edit Product</span>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[65vh] pr-3">
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
                  <Label htmlFor="options">Product Options</Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    (seperate options by comma. e.g. Small, Medium, Large)
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
                <Button type="submit" size="sm" variant="default">
                  Save Changes
                </Button>
              </Flex>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </TooltipWrapper>
  );
};

export default Edit;
