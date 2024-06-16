import useSWR from 'swr';
import { useManufacturesStore } from '@/store/store';
import { useEffect } from 'react';
import { fetcher } from '@/helpers/fetcher';
import { api_url } from '@/helpers/url';

export const useManufacturers = () => {
  const { data, error } = useSWR(`${api_url}/manufacturers`, fetcher );
  const setManufacturers = useManufacturesStore(state => state.setManufacturers);

  useEffect(() => {
    if (data) {
      setManufacturers(data.data);
    }
  }, [data, setManufacturers]);

  return {
    manufacturers: data ? data.data : null,
    isLoading: !error && !data,
    isError: error,
  };
};