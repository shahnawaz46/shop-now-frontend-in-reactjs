import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// components
import axiosInstance from "../axios/AxiosInstance";
import { ERequestStatus } from "../types/enums";

interface IDataMap<T> {
  refetchIn: number;
  data: T;
}
// structure of dataMap-> [key, { refetchIn: time in mili-seconds, data: data }]
const dataMap = new Map<string, IDataMap<unknown>>();

const defaultTime: number = 24 * 60 * 60 * 1000; // by default i am caching the data for one day

function useFetch<T>(
  key: string,
  URL: string | string[],
  refetchIn: number = defaultTime
) {
  const [status, setStatus] = useState<ERequestStatus>(ERequestStatus.Idle);
  const [error, setError] = useState<string>("");
  const setDateUpdated = useState<number>(0)[1]; //  i am not using state that's why i am only taking stateFunction(for re-render)

  const cacheData = dataMap.get(key) as IDataMap<T> | undefined;

  const fetchDate = async () => {
    // console.log(dataMap);
    const currentTime = new Date().getTime();

    // don't fetch again if cache is still valid
    if (cacheData && cacheData.refetchIn > currentTime) {
      return;
    }

    try {
      setStatus(ERequestStatus.Pending);
      let res: T;

      // if user send URL in array and if array have multiple URL then i am using promise.all for fetch all response
      if (Array.isArray(URL) && URL?.length > 1) {
        const tempRes = await Promise.all(
          URL.map((url) => axiosInstance.get(url))
        );

        const mergedResponse: { [key: string]: unknown } = {};
        tempRes.forEach((item) => {
          const [[key, values]] = Object.entries(item.data);
          mergedResponse[key] = values;
        });

        res = mergedResponse as T;
        // console.log('res: ', res);
      } else {
        const _URL: string = typeof URL === "string" ? URL : URL[0];
        const tempRes = await axiosInstance.get(_URL);
        res = tempRes.data;
      }

      // this line retrieve the current time in milliseconds and add refetchIn time(in milliseconds)
      const refetchTime = new Date().getTime() + refetchIn;

      dataMap.set(key, { refetchIn: refetchTime, data: res });
      setStatus(ERequestStatus.Succeeded);
    } catch (err) {
      setStatus(ERequestStatus.Failed);
      if (axios.isAxiosError(err)) {
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Something went wrong please try again"
        );
        toast.error(
          err?.response?.data?.error ||
            err?.message ||
            "Something went wrong please try again"
        );
      } else if (err instanceof Error) {
        setError(err?.message || "Something went wrong please try again");
        toast.error(err?.message || "Something went wrong please try again");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  async function updateData<K>(
    key: string,
    subKey: string,
    data: K
  ): Promise<void> {
    // console.log('updating Data: ', key, subKey, data, dataMap.get(key));
    let current = dataMap.get(key) as IDataMap<T> | undefined;
    if (!current) return;

    current = { ...current, data: { ...current?.data, [subKey]: data } };
    dataMap.set(key, current);
    setDateUpdated(Math.random()); // here i am updating dateUpdated state only for re-render the component so i can return updated data
  }

  useEffect(() => {
    fetchDate();
  }, []);

  // console.log('cacheData:', cacheData);

  return {
    isLoading: dataMap.get(key) ? false : true,
    status,
    error,
    data: cacheData?.data ?? ({} as T), // nullish coalescing operator(If the left side is null or undefined, then use the right side instead)
    updateData,
  };
}

export default useFetch;
