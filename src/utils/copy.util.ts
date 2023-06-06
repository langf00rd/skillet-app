import { toast } from "react-hot-toast";
/**
 * Copies a string to clipboard
 * @param text
 */
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
