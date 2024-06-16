import { memo } from "react";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import TableButton from "@/components/ui/TableButton/TableButton";
import CardsButton from "@/components/ui/CardsButton/CardsButton";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (e: string) => void;
  openModal: () => void;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  openModal,
  isActive,
  onClick,
}: SearchBarProps) => {
  const { user } = useAuth();
  return (
    <div className="flex px-2 py-4 justify-between items-center">
      <div className="w-60">
        <Input
          type="text"
          value={searchQuery}
          id="searchQuery"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск"
          label=""
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-[100px] flex justify-between">
          <TableButton isActive={isActive} onClick={onClick} />
          <CardsButton isActive={!isActive} onClick={onClick} />
        </div>
        {user?.roles.length === 2 && (
          <Button onClick={openModal}>Добавить</Button>
        )}
      </div>
    </div>
  );
};

export default memo(SearchBar);
