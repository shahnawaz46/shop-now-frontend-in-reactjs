import axios from 'axios';
import { toast } from 'react-toastify';

interface IError {
  error: unknown;
  onMatch?: { case: string; perform: () => void };
}

export const handleAxiosError = ({ error, onMatch }: IError) => {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.error ||
        "Oops! Something went wrong. We're working to fix it. Please try again shortly."
    );

    // only when i have some extra if else condition inside catch block
    if (onMatch && onMatch.case === error.response?.data?.error) {
      onMatch.perform();
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    console.error('Unexpected error:', error);
  }
};
