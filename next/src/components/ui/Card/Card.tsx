import { Manufacturer, Product } from "@/types/types";
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
  openViewModal: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  quantity,
  price,
  photoUrl,
  manufacturerId,
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
  return (
    <div
      className="w-[244px] px-2 py-2 flex flex-col rounded-lg gap-2 cursor-pointer hover:bg-slate-300 transition-all"
      key={id}
      onClick={() => openViewModal(id)}
    >
      <div className="w-56 h-56">
        <ImageSpinner
          src={photoUrl}
          alt="photo of product"
          width="56"
          height="56"
        />
      </div>
      <span className="text-slate-900 text-base text-center">{name}</span>
      <span className="text-slate-900 text-sm text-center">{`${manufacturerMap[
        manufacturerId
      ]
        ?.toString()
        .substring(0, 15)}${
        manufacturerMap[manufacturerId]?.toString().length > 15 ? "..." : ""
      }`}</span>
      <div className="px-2 w-full flex justify-between">
        <span className="text-slate-900 text-sm">{quantity} шт</span>
        <span className="text-slate-900 text-sm">{price} р</span>
      </div>
    </div>
  );
};

export default ProductCard;
