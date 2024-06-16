import useSWR, { mutate } from "swr";
import axios from "axios";
import { Product } from "@/types/types";
import { api_url } from "@/helpers/url";
import { fetcher } from "@/helpers/fetcher";

export const useProducts = (page: number, searchQuery: string) => {
  const queryString = new URLSearchParams({ _page: String(page), q: searchQuery }).toString();
  const url = `${api_url}/products?${queryString}`;

  const { data, error } = useSWR(url, fetcher);

  return {
    products: data?.data,
    totalCount: data?.totalCount,
    isError: error,
  };
};

export const createProduct = async (data: Product, queryString: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("No token available");
  await axios.post(`${api_url}/products`, data, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
  mutate(`${api_url}/products?${queryString}`);
};

export const getProduct = async (id: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${api_url}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const product = await response.json();
    return product;
  }
};

export const updateProduct = async (id: number, data: Product, queryString: string) => {
  const token = localStorage.getItem('token');
  await axios.patch(`${api_url}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
  mutate(`${api_url}/products?${queryString}`);
};

export const deleteProduct = async (id: number, queryString: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${api_url}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  mutate(`${api_url}/products?${queryString}`);
};
