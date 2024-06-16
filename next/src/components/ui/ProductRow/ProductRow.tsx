import { Manufacturer } from "@/types/types";
import ImageSpinner from "../ImageSpinner/ImageSpinner";
import { useManufacturesStore } from "@/store/store";
import { User } from "@/types/types";

interface ProductRowProps {
  id: number;
  name: string;
  quantity: number;
  price: string;
  photoUrl: string;
  manufacturerId: number;
  user: User | null;
  openUpdateModal: (id: number) => void;
  openDeleteModal: (id: number) => void;
  openViewModal: (id: number) => void;
}

const ProductRow = ({
  id,
  name,
  quantity,
  price,
  photoUrl,
  manufacturerId,
  user,
  openDeleteModal,
  openUpdateModal,
  openViewModal,
}: ProductRowProps) => {
  const { manufacturers } = useManufacturesStore();

  const manufacturerMap: { [key: number]: string } = manufacturers.reduce(
    (map, manufacturer: Manufacturer) => {
      map[manufacturer.id] = manufacturer.name;
      return map;
    },
    {} as { [key: number]: string }
  );

  const handleOpenDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDeleteModal(id);
  };

  const handleOpenUpdateModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openUpdateModal(id);
  };

  return (
    <div
      className="flex w-full justify-between items-center odd:bg-slate-900 odd:bg-opacity-5 cursor-pointer hover:bg-slate-300 transition-all"
      key={id}
      onClick={() => openViewModal(id)}
    >
      <div className="w-20 p-2">
        <div className="w-16 h-16">
          <ImageSpinner
            src={photoUrl}
            alt="photo of product"
            width="16"
            height="16"
          />
        </div>
      </div>
      <span className="w-32 p-2">{name}</span>
      <span className="w-20 p-2 text-center">{quantity}</span>
      <span className="w-44 p-2">{`${manufacturerMap[manufacturerId]
        ?.toString()
        .substring(0, 15)}${
        manufacturerMap[manufacturerId]?.toString().length > 15 ? "..." : ""
      }`}</span>
      <span className="w-24 p-2">{price} р</span>
      <div className="w-32 p-2">
        {user?.roles.length === 2 && (
          <div className="flex gap-2 items-center">
            <button onClick={handleOpenUpdateModal}>
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2309 1.64384C19.2058 0.618718 17.5437 0.618718 16.5186 1.64384L15.3615 2.80099L19.0738 6.5133L20.2309 5.35616C21.256 4.33103 21.256 2.66897 20.2309 1.64384Z"
                  fill="#0F172A"
                />
                <path
                  d="M18.0131 7.57396L14.3008 3.86165L5.89995 12.2625C5.28316 12.8793 4.82977 13.64 4.58075 14.476L3.78097 17.1609C3.70235 17.4248 3.7747 17.7106 3.96943 17.9053C4.16416 18.1 4.44994 18.1724 4.71387 18.0938L7.39876 17.294C8.23473 17.045 8.99548 16.5916 9.61227 15.9748L18.0131 7.57396Z"
                  fill="#0F172A"
                />
                <path
                  d="M3.74976 4.62499C2.0929 4.62499 0.749756 5.96814 0.749756 7.62499V18.125C0.749756 19.7818 2.0929 21.125 3.74976 21.125H14.2498C15.9066 21.125 17.2498 19.7818 17.2498 18.125V12.875C17.2498 12.4608 16.914 12.125 16.4998 12.125C16.0855 12.125 15.7498 12.4608 15.7498 12.875V18.125C15.7498 18.9534 15.0782 19.625 14.2498 19.625H3.74976C2.92133 19.625 2.24976 18.9534 2.24976 18.125V7.62499C2.24976 6.79656 2.92133 6.12499 3.74976 6.12499H8.99976C9.41397 6.12499 9.74976 5.78921 9.74976 5.37499C9.74976 4.96078 9.41397 4.62499 8.99976 4.62499H3.74976Z"
                  fill="#0F172A"
                />
              </svg>
            </button>
            <button onClick={handleOpenDeleteModal}>
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4999 3.47819V3.70498C14.4546 3.79237 15.4014 3.90731 16.3395 4.04898C16.6869 4.10143 17.033 4.15755 17.3779 4.2173C17.786 4.28799 18.0596 4.67617 17.9889 5.0843C17.9182 5.49244 17.53 5.76598 17.1219 5.69529C17.0523 5.68323 16.9826 5.67132 16.9129 5.65957L15.9075 18.7301C15.7872 20.2931 14.4839 21.5 12.9163 21.5H5.08345C3.51584 21.5 2.21252 20.2931 2.09229 18.7301L1.08686 5.65957C1.01715 5.67132 0.947494 5.68323 0.87789 5.69529C0.469754 5.76598 0.0815824 5.49244 0.0108839 5.0843C-0.0598146 4.67617 0.213732 4.28799 0.621868 4.2173C0.966766 4.15755 1.3129 4.10143 1.66024 4.04898C2.59834 3.90731 3.54515 3.79237 4.49988 3.70498V3.47819C4.49988 1.91371 5.71241 0.578183 7.31531 0.526907C7.87467 0.509014 8.43623 0.5 8.99988 0.5C9.56352 0.5 10.1251 0.509014 10.6844 0.526907C12.2873 0.578183 13.4999 1.91371 13.4999 3.47819ZM7.36327 2.02614C7.90665 2.00876 8.45223 2 8.99988 2C9.54753 2 10.0931 2.00876 10.6365 2.02614C11.3911 2.05028 11.9999 2.68393 11.9999 3.47819V3.59082C11.0075 3.53056 10.0072 3.5 8.99988 3.5C7.99254 3.5 6.99224 3.53056 5.99988 3.59082V3.47819C5.99988 2.68393 6.60866 2.05028 7.36327 2.02614ZM7.00848 7.97118C6.99256 7.55727 6.64412 7.23463 6.23021 7.25055C5.8163 7.26647 5.49367 7.61492 5.50959 8.02882L5.85574 17.0288C5.87166 17.4427 6.2201 17.7654 6.63401 17.7494C7.04792 17.7335 7.37055 17.3851 7.35463 16.9712L7.00848 7.97118ZM12.4892 8.02882C12.5052 7.61492 12.1825 7.26647 11.7686 7.25055C11.3547 7.23463 11.0063 7.55727 10.9904 7.97118L10.6442 16.9712C10.6283 17.3851 10.9509 17.7335 11.3648 17.7494C11.7787 17.7654 12.1272 17.4427 12.1431 17.0288L12.4892 8.02882Z"
                  fill="#1E293B"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRow;
