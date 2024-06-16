"use client";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import useAuth from "@/hooks/useAuth";
import AddProduct from "@/components/widgets/AddProduct/AddProduct";
import SearchBar from "@/components/ordinary/Menu/SearchBar";
import Pagination from "@/components/ordinary/Pagination/Pagination";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import Table from "@/components/ordinary/Table/Table";
import Cards from "@/components/ordinary/Cards/Cards";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import ViewModal from "../ViewModal/ViewModal";

const ProductsList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  //состояние отображения
  const [isActive, setIsActive] = useState<boolean>(true);
  //модальное окно добавление товара
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);
  //модальное окно удаление товара
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number>(1);
  //модальное окно обновление товара
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState<number>(1);
  //модальное окно просмотра товара
  const [viewModalIsOpen, setViewModalIsOpen] = useState<boolean>(false);
  const [productIdToView, setProductIdToView] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { products, totalCount } = useProducts(page, searchQuery);

  const openDeleteModal = (id: number) => {
    setProductIdToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const openUpdateModal = (id: number) => {
    setProductIdToUpdate(id);
    setUpdateModalIsOpen(true);
  };

  const openViewModal = (id: number) => {
    setProductIdToView(id);
    setViewModalIsOpen(true);
  };

  const totalPages = Math.ceil(Number(totalCount) / 8);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openModal={() => setAddModalIsOpen(true)}
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      {user?.roles.length === 2 && (
        <div>
          <AddProduct
            isOpen={addModalIsOpen}
            onRequestClose={() => setAddModalIsOpen(false)}
            page={page}
            searchQuery={searchQuery}
          />
          {deleteModalIsOpen && (
            <DeleteProduct
              isOpen={deleteModalIsOpen}
              onRequestClose={() => setDeleteModalIsOpen(false)}
              id={productIdToDelete}
              page={page}
              searchQuery={searchQuery}
            />
          )}
          {updateModalIsOpen && (
            <UpdateProduct
              isOpen={updateModalIsOpen}
              onRequestClose={() => setUpdateModalIsOpen(false)}
              id={productIdToUpdate}
              page={page}
              searchQuery={searchQuery}
            />
          )}
        </div>
      )}
      {viewModalIsOpen && (
        <ViewModal
          isOpen={viewModalIsOpen}
          onRequestClose={() => setViewModalIsOpen(false)}
          id={productIdToView}
          openDeleteProduct={openDeleteModal}
          user={user}
        />
      )}
      <div className="flex flex-col gap-10">
        {isActive ? (
          <Table
            user={user}
            openViewModal={openViewModal}
            openDeleteModal={openDeleteModal}
            openUpdateModal={openUpdateModal}
            products={products}
          />
        ) : (
          <Cards
            user={user}
            openViewModal={openViewModal}
            products={products}
          />
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsList;
