import { toast } from "react-hot-toast";

export default function copy(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Address copied to clipboard");
    })
    .catch((error) => {
      toast.error(error.message);
    });
}
