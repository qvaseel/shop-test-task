import React, { useEffect, useState } from "react";
import { Manufacturer, Product } from "@/types/types/index";
import { getProduct } from "@/hooks/useProducts";
import Button from "@/components/ui/Button/Button";
import ImageSpinner from "@/components/ui/ImageSpinner/ImageSpinner";
import { useManufacturesStore } from "@/store/store";
import { User } from "@/types/types/index";

interface ViewProductProps {
  isOpen: boolean;
  onRequestClose: () => void;
  openDeleteProduct: (id: number) => void;
  id: number;
  user: User | null;
}

const ViewModal = ({
  isOpen,
  onRequestClose,
  openDeleteProduct,
  id,
  user,
}: ViewProductProps) => {
  const [product, setIsProduct] = useState<Product>();

  if (!isOpen) {
    return null;
  }

  const { manufacturers } = useManufacturesStore();

  const manufacturerMap: { [key: number]: string } = manufacturers.reduce(
    (map, manufacturer: Manufacturer) => {
      map[manufacturer.id] = manufacturer.name;
      return map;
    },
    {} as { [key: number]: string }
  );

  useEffect(() => {
    const handleGetProduct = async (id: number) => {
      try {
        const product = await getProduct(id);
        setIsProduct(product);
      } catch (error) {
        console.error("Failed to get product:", error);
      }
    };
    handleGetProduct(id);
  }, []);

  const handleOpenDeleteModal = () => {
    onRequestClose();
    openDeleteProduct(id);
  };

  if (!product) return null;

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
    >
      <div
        className="w-[338px] bg-slate-100 px-5 py-7 flex flex-col gap-5 rounded-lg"
        key={id}
      >
        <div className="w-56 h-56 block mx-auto">
          <ImageSpinner
            src={product.photoUrl}
            alt="photo of product"
            width="56"
            height="56"
          />
        </div>
        <span className="text-slate-900 text-2xl font-medium text-center">
          {product.name}
        </span>
        <span className="text-slate-900 text-sm">
          Количество: {product.quantity}
        </span>
        <span className="text-slate-900 text-sm">Цена: {product.price} р</span>
        <span className="text-slate-900 text-sm">{`Производитель: ${manufacturerMap[
          product.manufacturerId
        ]
          ?.toString()
          .substring(0, 15)}${
          manufacturerMap[product.manufacturerId]?.toString().length > 15
            ? "..."
            : ""
        }`}</span>
        <div className="flex gap-3 justify-end">
          {user?.roles.length === 2 && (
            <Button onClick={() => handleOpenDeleteModal()} variant="secondary">
              Удалить
            </Button>
          )}
          <Button onClick={() => onRequestClose()}>Назад</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
