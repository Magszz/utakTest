import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { TooltipWrapper } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

const Delete = () => {
  return (
    <TooltipWrapper text="Delete Product" side="top">
      <Dialog>
        <DialogTrigger asChild>
          <Trash2 className="product_icon hover:text-destructive" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-archivo text-madison">
              Delete Hawaiin Pizza
            </DialogTitle>
            <DialogDescription className="font-montserrat">
              Are you sure to delete Hawaiin Pizza?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-2">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipWrapper>
  );
};

export default Delete;
