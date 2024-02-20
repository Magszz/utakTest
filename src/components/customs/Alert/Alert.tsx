import {
  AlertDescription,
  AlertTitle,
  Alert as AlertContainer,
} from "@/components/ui/alert";
import { Check, XCircle } from "lucide-react";

interface Props {
  type: "success" | "error";
  title?: string;
  description?: string;
}

const Alert = ({ type = "success", title = "", description = "" }: Props) => {
  const setIcon = (): React.ReactNode => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "success":
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  return (
    <AlertContainer variant={type}>
      {setIcon()}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </AlertContainer>
  );
};

export default Alert;
