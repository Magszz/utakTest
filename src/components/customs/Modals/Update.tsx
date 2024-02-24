import { Flex, Paragraph, Select } from "@/components";
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
import { CATEGORIES, VALID_IMG_TYPES } from "@/lib/constant";
import { FormStatus, ImgInfo, TProduct } from "@/lib/typings/Typings";
import { SquarePen } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import _ from "lodash";
import useGetFormValues from "@/hooks/useGetFormValues";
import { formDefaultValues } from "@/lib/static/defaultValues";
import { allValuesHaveLength } from "@/lib/helpers/stringHelpers";
import dayjs from "dayjs";
import useStorage from "@/hooks/useStorage";
import useDatabase from "@/hooks/useDatabase";
import { DB_LOCATION } from "@/lib/loc/loc";
import { toast } from "@/components/ui/use-toast";
import { notifLang } from "@/lib/lang/notifLang";

interface Props {
  product: TProduct;
}

const Update = ({ product }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    open: false,
    disabled: true,
  });
  const [imgInfo, setImgInfo] = useState<ImgInfo>();

  const { updateData } = useDatabase();
  const { productForm } = useGetFormValues();
  const { uploadImage } = useStorage();

  // * SUBMIT FORM
  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef?.current) return;
    setFormStatus({ ...formStatus, loading: true });
    let imgURL;
    const dateNow = dayjs().format("MMM D, YYYY");
    const data = productForm(formRef) || formDefaultValues;

    if (imgInfo?.file) {
      imgURL = await uploadImage(imgInfo.file, imgInfo.fileName);
    }
    if (!imgURL && imgInfo?.file) return;

    const response = await updateData(`${DB_LOCATION.products}/${product.id}`, {
      ...data,
      lastModified: dateNow,
      image: imgURL || product.image,
    });

    if (response) {
      setFormStatus({ ...formStatus, open: false, disabled: true });
    }
  };

  // * VALIDATE FORM VALUES | THIS WILL CHECK IF THE USER FILL ALL THE REQUIRED FIELDS & ANY VALUES ARE CHANGED
  const formChange = _.debounce(() => {
    const data = productForm(formRef) || formDefaultValues;

    const productWithoutNotRequiredFields = _.omit(product, [
      "image",
      "id",
      "dateCreated",
      "lastModified",
    ]);
    const isFormChanged = _.isEqual(data, productWithoutNotRequiredFields);

    console.log(!imgInfo?.file);

    setFormStatus({
      ...formStatus,
      disabled:
        (!allValuesHaveLength(data) || isFormChanged) && !!imgInfo?.fileName,
    });
  }, 250);

  // * VALIDATE IMAGE TYPE & SETTING OF IMG INFO TO BE UPLOAD TO STORAGE
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e?.target?.files?.[0];

    if (!VALID_IMG_TYPES.includes(target?.type || "") || !target) {
      toast({
        variant: "destructive",
        ...notifLang.uploadImg.error,
      });
      return;
    }
    setImgInfo({
      fileName: target.name,
      file: target,
    });
  };

  return (
    <TooltipWrapper text="Update" side="top">
      <Dialog
        open={formStatus.open}
        onOpenChange={() =>
          setFormStatus({ ...formStatus, open: !formStatus.open })
        }
      >
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" type="button">
            <SquarePen className="w-4  " />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
              <SquarePen className="w-6 text-blue-400" />
              <span>Update Product</span>
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <form
            ref={formRef}
            onSubmit={formSubmit}
            onChange={formChange}
            className="h-full"
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
                    defaultValue={product.productName}
                  />
                </div>

                <div className="mb-2">
                  <Label required htmlFor="category">
                    Product Category
                  </Label>
                  <Select
                    name="category"
                    id="category"
                    placeholder="Select product category"
                    options={CATEGORIES}
                    defaultValue={product.category}
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
                    defaultValue={product.price}
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
                    defaultValue={product.cost}
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
                    defaultValue={product.stockAmount}
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
                    defaultValue={product.options}
                  />
                </div>

                <div className="mb-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    (Supported types:{" "}
                    <span className="font-semibold">PNG, JPG, JPEG</span>)
                  </Paragraph>
                  <Input
                    accept="image/jpeg, image/png, image/jpg"
                    type="file"
                    id="image"
                    name="image"
                    onChange={uploadImg}
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
                  disabled={formStatus.loading || formStatus.disabled}
                  type="submit"
                  size="sm"
                  variant="default"
                >
                  Save Changes
                </Button>
              </Flex>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipWrapper>
  );
};

export default Update;
