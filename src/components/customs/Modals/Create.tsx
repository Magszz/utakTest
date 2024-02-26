import { Flex, Paragraph, Select } from "@/components";
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
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import _ from "lodash";
import useDatabase from "@/hooks/useDatabase";
import { formDefaultValues } from "@/lib/static/defaultValues";
import { FormStatus, ImgInfo } from "@/lib/typings/Typings";
import { allValuesHaveLength } from "@/lib/helpers/stringHelpers";
import { DB_LOCATION } from "@/lib/loc/loc";
import dayjs from "dayjs";
import { CATEGORIES, VALID_IMG_TYPES } from "@/lib/constant";
import { useToast } from "@/components/ui/use-toast";
import { notifLang } from "@/lib/lang/notifLang";
import useStorage from "@/hooks/useStorage";
import useGetFormValues from "@/hooks/useGetFormValues";
import { formLang } from "@/lib/lang/formLang";
import { modalLang } from "@/lib/lang/modalLang";

const Create = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    open: false,
    disabled: true,
  });

  const [imgInfo, setImgInfo] = useState<ImgInfo>();
  const { saveData } = useDatabase();
  const { uploadImage } = useStorage();
  const { productForm } = useGetFormValues();

  // * SUBMIT FORM
  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef?.current) return;

    setFormStatus({ ...formStatus, loading: true });
    let imgURL: string | boolean = "";
    const dateNow = dayjs().valueOf();
    const data = productForm(formRef) || formDefaultValues;

    if (imgInfo?.file) {
      imgURL = await uploadImage(imgInfo.file, imgInfo.fileName);
    }

    if (!imgURL && imgInfo?.file) return;

    const response = await saveData(DB_LOCATION.products, {
      ...data,
      productName: data?.productName?.toLowerCase(),
      dateCreated: dateNow,
      lastModified: dateNow,
      image: imgURL,
    });

    if (response) {
      formRef?.current.reset();
      setFormStatus({ ...formStatus, open: false, disabled: true });
    }
  };

  // * VALIDATE FORM VALUES | THIS WILL CHECK IF THE USER FILL ALL THE REQUIRED FIELDS
  const formChange = _.debounce(() => {
    const data = productForm(formRef) || formDefaultValues;

    setFormStatus({ ...formStatus, disabled: !allValuesHaveLength(data) });
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
    <Dialog
      open={formStatus.open}
      onOpenChange={() =>
        setFormStatus({ ...formStatus, open: !formStatus.open })
      }
    >
      <DialogTrigger asChild>
        <Button size="sm" type="button">
          <PlusCircle className="w-4 mr-1 text-white" />
          <span>{modalLang.create.button}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="font-archivo flex items-center gap-2 text-madison">
            <NotebookPen className="w-6 text-blue-400" />
            <span>{modalLang.create.title}</span>
          </DialogTitle>
          <DialogDescription className="font-montserrat">
            {modalLang.create.description}
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
                  {formLang.name.label}
                </Label>
                <Input
                  type="text"
                  placeholder={formLang.name.placeholder}
                  id="productName"
                  name="productName"
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
                  max={9999}
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
                  max={9999}
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
                  max={9999}
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
                />
              </div>
              <div className="mb-2">
                <Label htmlFor="image">{formLang.image.label}</Label>
                <Paragraph fontSize="xs" className="mb-2">
                  {formLang.image.note}{" "}
                  <span className="font-semibold">{formLang.image.note2}</span>
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
                  {formLang.buttons.close}
                </Button>
              </DialogClose>
              <Button
                loading={formStatus.loading}
                disabled={formStatus.disabled || formStatus.loading}
                type="submit"
                size="sm"
                variant="default"
              >
                {formLang.buttons.create}
              </Button>
            </Flex>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
