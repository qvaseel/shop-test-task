"use client"
import Sidebar from "@/components/ordinary/SideBar/SideBar";
import ProductsList from "@/components/widgets/ProductsList/ProductsList";

export default function Main() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[1024px] block mx-auto pb-6">
        <ProductsList/>
      </div>
    </div>
  );
}
