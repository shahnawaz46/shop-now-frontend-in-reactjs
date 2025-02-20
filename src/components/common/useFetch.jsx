import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// components
import axiosInstance from '../../axios/AxiosInstance';
import { API_STATUS } from '../../utils/Constants';

const dataMap = new Map();

const defaultTime = 24 * 60 * 60 * 1000; // by default i am caching the data for one day

const useFetch = (key, URL, refetchIn = defaultTime) => {
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState('');
  const setDateUpdated = useState(0)[1]; //  i am not using state that's why i am only taking stateFunction(for re-render)

  const fetchDate = async () => {
    // console.log(dataMap);
    const currentTime = new Date().getTime();
    // if key is already present and refetchIn time is greater than current time then i am not fetching data again
    if (dataMap.get(key) && dataMap.get(key).refetchIn > currentTime) {
      return;
    }

    try {
      setStatus(API_STATUS.LOADING);
      let res;

      // if user send URL in array and if array have multiple URL then i am using promise.all for fetch all response
      if (Array.isArray(URL) && URL?.length > 1) {
        const tempRes = await Promise.all(
          URL.map((url) => axiosInstance.get(url))
        );
        const updatedResObj = {};
        tempRes.forEach((item) => {
          const [[key, values]] = Object.entries(item.data);
          updatedResObj[key] = values;
          // console.log('key:', key, 'values:', values, 'item:', item);
        });
        res = updatedResObj;
        // console.log('res: ', res);
      } else {
        const tempRes = await axiosInstance.get(URL);
        res = tempRes.data;
      }

      // this line retrieve the current time in milliseconds and add refetchIn time(in milliseconds)
      const refetchTime = new Date().getTime() + refetchIn;

      dataMap.set(key, { refetchIn: refetchTime, data: res });
      setStatus(API_STATUS.SUCCESS);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.message ||
          'Something went wrong please try again'
      );
      setStatus(API_STATUS.FAILED);
      toast.error(
        err?.response?.data?.error ||
          err?.message ||
          'Something went wrong please try again'
      );
    }
  };

  const updateData = async (key, subKey, data) => {
    // console.log('updating Data: ', key, subKey, data, dataMap.get(key));
    let updating = dataMap.get(key);
    updating = { ...updating, data: { ...updating?.data, [subKey]: data } };
    dataMap.set(key, updating);
    setDateUpdated(Math.random()); // here i am updating dateUpdated state only for re-render the component so i can return updated data
  };

  useEffect(() => {
    fetchDate();
  }, []);

  return { status, error, data: dataMap.get(key)?.data || [], updateData };
};

export default useFetch;
