import axios from "axios";
import { toast } from "react-toastify";

interface IError {
  error: unknown;
  onMatch?: { case: string; perform: () => void };
}

export const handleAxiosError = ({ error, onMatch }: IError) => {
  let message = "Oops! Something went wrong. Please try again.";

  // case 1: axios error
  if (axios.isAxiosError(error)) {
    message = error.response?.data?.error || message;
  }

  // case 2: general JS/Axios error
  else if (error instanceof Error) {
    message = error?.message;
  }

  // case 3: string error
  else if (typeof error === "string") {
    message = error;
  }

  toast.error(message);

  // handle custom match
  if (onMatch && onMatch.case === message) {
    onMatch.perform();
  }
};
