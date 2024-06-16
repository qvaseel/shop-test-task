import React from "react";
import { deleteProduct } from "@/hooks/useProducts";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/store/store";

interface DeleteProductProps {
  isOpen: boolean;
  onRequestClose: () => void;
  page: number;
  searchQuery: any;
  id: number;
}

const DeleteProduct = ({
  isOpen,
  onRequestClose,
  page,
  searchQuery,
  id,
}: DeleteProductProps) => {
  const decrementCounter = useAuthStore((state) => state.decrementCounter);
  const handleDeleteProduct = async (id: number) => {
    const queryString = new URLSearchParams({
      _page: String(page),
      q: searchQuery,
    }).toString();
    try {
      await deleteProduct(id, queryString);
      decrementCounter();
      onRequestClose();
    } catch {
      alert("Не удалось удалить товар")
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-[338px] px-4 py-4 rounded-lg bg-slate-100 flex flex-col gap-5">
        <h2 className="text-slate-900 text-2xl font-medium">
          Вы действительно хотите удалить товар?
        </h2>
        <div className="flex gap-3 justify-end">
          <Button onClick={() => onRequestClose()} variant="secondary">
            Отмена
          </Button>
          <Button onClick={() => handleDeleteProduct(id)}>Удалить</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
