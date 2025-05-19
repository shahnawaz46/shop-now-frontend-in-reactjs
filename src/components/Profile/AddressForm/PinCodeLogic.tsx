import { useEffect } from "react";
import axios from "axios";
import { handleAxiosError } from "../../../utils/HandleAxiosError";
import { numberRegex } from "../../../utils/Regex";

interface IPinCodeLogicProps {
  pinCode: number | null;
  onResult: (
    state: string,
    cityDistrictTown: string,
    locality: string[],
    error: string
  ) => void;
}

const PinCodeLogic = ({ pinCode, onResult }: IPinCodeLogicProps) => {
  const updateFieldsBasedOnPincode = async () => {
    try {
      const res = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      if (res.data[0].Status === "Error" || res.data[0].Status === "404") {
        onResult("", "", [], "No records found");
      } else {
        const data = res.data[0].PostOffice;

        onResult(
          data[0].State,
          data[0].District,
          data.map((value: { Name: string }) => value.Name),
          ""
        );
      }
    } catch (error) {
      handleAxiosError({ error });
    }
  };

  useEffect(() => {
    if (
      pinCode?.toString().length === 6 &&
      numberRegex.test(pinCode.toString())
    ) {
      updateFieldsBasedOnPincode();
    }
  }, [pinCode]);

  return null;
};

export default PinCodeLogic;
