import { Breadcrumb } from "@/types/types";

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <div className="text-slate-900 text-xl">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.id}>
          {breadcrumb.name_ru}
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
