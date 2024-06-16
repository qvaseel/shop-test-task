"use client";
import Sidebar from "@/components/ordinary/SideBar/SideBar";
import Breadcrumbs from "@/components/widgets/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbTrail } from "@/hooks/useBreadcrumbs";
import Button from "@/components/ui/Button/Button";

export default function Main() {
  const { trail, mutate } = useBreadcrumbTrail();
  const handleNewEndpoint = () => {
    mutate();
  };
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-[1024px] flex flex-col gap-7 mx-auto pt-8">
        <div className="w-48">
          <Button onClick={handleNewEndpoint}>
            Получить новую конечную точку
          </Button>
        </div>
        {trail && <Breadcrumbs breadcrumbs={trail} />}
      </main>
    </div>
  );
}