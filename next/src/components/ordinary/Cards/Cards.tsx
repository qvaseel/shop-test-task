import { Product, User } from "@/types/types";
import ProductCard from "@/components/ui/Card/Card";

interface CardsProps {
  user: User | null;
  openViewModal: (id: number) => void;
  products: Product[];
}

const Cards = ({ user, openViewModal, products }: CardsProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,244px)] w-full justify-center items-center gap-x-[10px] gap-y-5">
      {products?.map((product: Product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          photoUrl={product.photoUrl}
          manufacturerId={product.manufacturerId}
          user={user}
          openViewModal={openViewModal}
        />
      ))}
    </div>
  );
};

export default Cards;
