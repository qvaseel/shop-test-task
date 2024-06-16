import { ROUTER } from "@/types/enums/router.enum";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Arrow from "../Arrow/Arrow";

const Menu = () => {
  const router = usePathname();
  return (
    <ul className="p-[10px] flex flex-col gap-4">
      <li>
        <Link
          href={ROUTER.PRODUCTS}
          className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group"
        >
          Товары
          <Arrow className={router == ROUTER.PRODUCTS ? "hidden" : ""} />
        </Link>
      </li>
      <li>
        <Link
          href={ROUTER.ALGORITHMS}
          className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group"
        >
          Алгоритмы
          <Arrow className={router == ROUTER.ALGORITHMS ? "hidden" : ""} />
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
