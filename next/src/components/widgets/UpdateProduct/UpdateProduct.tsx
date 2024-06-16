import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Manufacturer, Product } from "@/types/types/index";
import { getProduct, updateProduct } from "@/hooks/useProducts";
import Button from "@/components/ui/Button/Button";
import ImageSpinner from "@/components/ui/ImageSpinner/ImageSpinner";
import { useManufacturesStore } from "@/store/store";

interface UpdateProductProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
  page: number;
  searchQuery: any;
}

const UpdateProduct = ({
  isOpen,
  onRequestClose,
  id,
  page,
  searchQuery,
}: UpdateProductProps) => {
  const [product, setIsProduct] = useState<Product>();
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<Blob | null>(null);
  const [isImage, setIsImage] = useState<boolean>(true);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { manufacturers } = useManufacturesStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      setIsImage(true);
    } else {
      setFileName(null);
      setFile(null);
      setIsImage(false);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setFile(null);
    setIsImage(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const handleGetProduct = async (id: number) => {
      try {
        const product = await getProduct(id);
        setIsProduct(product);
        setFileName(product.photoUrl);
      } catch (error) {
        console.error("Failed to get product:", error);
      }
    };
    handleGetProduct(id);
  }, [id]);

  if (!product) return null;

  const onSubmit: SubmitHandler<Product> = (data) => {
    const queryString = new URLSearchParams({
      _page: String(page),
      q: searchQuery,
    }).toString();
    data.image = file;
    try {
      updateProduct(product.id, data, queryString);
      onRequestClose();
    } catch {
      alert("Не удалось обновить товар");
    }
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
    >
      <div className="w-[338px] px-2 py-4 rounded-lg bg-slate-100 flex flex-col gap-5">
        <h2 className="text-slate-900 text-2xl font-medium text-center">
          Редактирование товара
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">Название</label>
            <input
              defaultValue={product.name}
              {...register("name", { required: true })}
              placeholder="Название"
              className={`${
                errors.name ? "border-red-900" : ""
              } bg-gray-900 bg-opacity-[0.12] placeholder:text-gray-900 placeholder:text-opacity-40 text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">
              Количество
            </label>
            <input
              defaultValue={product.quantity}
              type="number"
              placeholder="Количество"
              {...register("quantity", { required: true })}
              className={`${
                errors.quantity ? "border-red-900" : ""
              } bg-gray-900 bg-opacity-[0.12] placeholder:text-gray-900 placeholder:text-opacity-40 text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">Цена</label>
            <input
              defaultValue={product.price}
              {...register("price", { required: true })}
              placeholder="Цена"
              className={`${
                errors.price ? "border-red-900" : ""
              } bg-gray-900 bg-opacity-[0.12] placeholder:text-gray-900 placeholder:text-opacity-40 text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">
              Производитель
            </label>
            <select
              defaultValue={product.manufacturerId}
              {...register("manufacturerId", {
                validate: (value) => value > 0 || "Выберите производителя",
              })}
              required
              className={`${
                errors.manufacturerId ? "border-red-900" : ""
              } bg-gray-900 bg-opacity-[0.12] placeholder:text-gray-900 placeholder:text-opacity-40 text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none`}
            >
              <option value="0">Компания</option>
              {manufacturers.map((manufacturer) => (
                <option
                  key={manufacturer.id}
                  value={manufacturer.id}
                  
                >
                  {manufacturer.name}
                </option>
              ))}
            </select>
            {errors.manufacturerId && (
              <span className="text-red-900 text-sm">
                {errors.manufacturerId.message}
              </span>
            )}
          </div>
          <div className={`flex flex-col gap-1`}>
            <label className="block text-sm text text-zinc-900">Фото</label>
            <div>
              <button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                className={`${
                  isImage ? "hidden" : ""
                } text-gray-600 text-sm w-full flex flex-col gap-1 items-center`}
              >
                Загрузить фото
                <svg
                  className="hover:scale-125 transition-all"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z"
                    fill="#475569"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z"
                    fill="#475569"
                  />
                </svg>
              </button>
              <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {fileName && (
              <div className="w-full h-14 flex justify-between">
                <div className="w-14 h-14">
                  <ImageSpinner
                    width="14"
                    height="14"
                    alt="photo of product"
                    src={file ? `${URL.createObjectURL(file)}` : fileName}
                  />
                </div>
                <div className="w-64 flex items-center text-xs gap-1">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {fileName}
                  </div>
                  <button type="button" onClick={handleRemoveFile}>
                    &#10006;
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => onRequestClose()} variant="secondary">
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
