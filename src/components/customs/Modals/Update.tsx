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
import { CATEGORIES } from "@/lib/constant";
import { FormStatus, TProduct } from "@/lib/typings/Typings";
import { SquarePen } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import _ from "lodash";
import useGetFormValues from "@/hooks/useGetFormValues";
import { formDefaultValues } from "@/lib/static/defaultValues";
import { allValuesHaveLength } from "@/lib/helpers/stringHelpers";
import dayjs from "dayjs";
import useStorage from "@/hooks/useStorage";
import useDatabase from "@/hooks/useDatabase";
import { DB_LOCATION } from "@/lib/loc/loc";
import { formLang } from "@/lib/lang/formLang";
import { modalLang } from "@/lib/lang/modalLang";
import useImageUpload from "@/hooks/useImageUpload";

interface Props {
  product: TProduct;
}

const Update = ({ product }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    open: false,
    disabled: false,
    allHasValues: false,
  });

  const { updateData } = useDatabase();
  const { productForm } = useGetFormValues();
  const { uploadImage } = useStorage();
  const { imgInfo, setImgInfo, uploadImg } = useImageUpload();

  // * SUBMIT FORM
  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef?.current) return;
    setFormStatus({ ...formStatus, loading: true });
    let imgURL;
    const dateNow = dayjs().valueOf();
    const data = productForm(formRef) || formDefaultValues;

    if (imgInfo?.file) {
      imgURL = await uploadImage(imgInfo.file, imgInfo.fileName || "");
    }

    // * THIS WILL CHECK IF THERE'S AN ERROR ON UPLOADING AN IMG TO STORAGE
    // * RETURN IF HAS
    if (!imgURL && imgInfo?.file) return;

    const response = await updateData(`${DB_LOCATION.products}/${product.id}`, {
      ...data,
      lastModified: dateNow,
      image: imgURL || product.image,
      productName: data?.productName?.toLowerCase(),
    });

    if (response) {
      return setFormStatus({ ...formStatus, open: false, disabled: false });
    }

    setImgInfo({ fileName: "", file: null });
    setFormStatus({ ...formStatus, loading: false });
  };

  // * VALIDATE FORM VALUES | THIS WILL CHECK IF THE USER FILL ALL THE REQUIRED FIELDS & ANY VALUES ARE CHANGED
  const formChange = _.debounce(() => {
    if (!formRef?.current) return;
    const data = productForm(formRef) || formDefaultValues;
    const imageField = formRef.current.image.value;

    const productWithoutNotRequiredFields = _.omit(product, [
      "image",
      "id",
      "dateCreated",
      "lastModified",
    ]);
    const isFormChanged = _.isEqual(data, productWithoutNotRequiredFields);

    setFormStatus({
      ...formStatus,
      disabled: !isFormChanged || !!imageField.length,
      allHasValues: !allValuesHaveLength(data),
    });
  }, 250);

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
              <span>{modalLang.update.title}</span>
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <form
            ref={formRef}
            onSubmit={formSubmit}
            onChange={formChange}
            className="h-full"
          >
            <ScrollArea className="h-[90%] max-h-[65vh] pr-3">
              <div className="w-full create_form">
                <div className="mb-2">
                  <Label required htmlFor="productName">
                    {formLang.name.label}
                  </Label>
                  <Input
                    type="text"
                    placeholder={formLang.name.placeholder}
                    id="productName"
                    name="productName"
                    defaultValue={product.productName}
                  />
                </div>

                <div className="mb-2">
                  <Label required htmlFor="category">
                    {formLang.category.label}
                  </Label>
                  <Select
                    name="category"
                    id="category"
                    placeholder={formLang.category.placeholder}
                    options={CATEGORIES}
                    defaultValue={product.category}
                  />
                </div>

                <div className="mb-2">
                  <Label required htmlFor="price">
                    {formLang.price.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={formLang.price.placeholder}
                    id="price"
                    name="price"
                    defaultValue={product.price}
                    maxLength={255}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="cost">
                    {formLang.cost.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={formLang.cost.placeholder}
                    id="cost"
                    name="cost"
                    defaultValue={product.cost}
                    maxLength={255}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="stockAmount">
                    {formLang.stock.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={formLang.stock.placeholder}
                    id="stockAmount"
                    name="stockAmount"
                    defaultValue={product.stockAmount}
                    maxLength={255}
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <Label required htmlFor="options">
                    {formLang.options.label}
                  </Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    {formLang.options.note}
                    {"  "}
                    <span className="text-red-500 font-semibold">
                      {formLang.options.note2}
                    </span>
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
                  <Label htmlFor="image">{formLang.image.label}</Label>
                  <Paragraph fontSize="xs" className="mb-2">
                    {formLang.image.note}{" "}
                    <span className="font-semibold">
                      {formLang.image.note2}
                    </span>
                  </Paragraph>
                  <Input
                    accept="image/jpeg, image/png, image/jpg"
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => uploadImg(e, formRef)}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Flex variant="endCentered" className="gap-2 mt-6">
                <DialogClose>
                  <Button type="button" size="sm" variant="outline">
                    {formLang.buttons.close}
                  </Button>
                </DialogClose>
                <Button
                  loading={formStatus.loading}
                  disabled={
                    formStatus.loading ||
                    !formStatus.disabled ||
                    formStatus.allHasValues
                  }
                  type="submit"
                  size="sm"
                  variant="default"
                >
                  {formLang.buttons.save}
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
