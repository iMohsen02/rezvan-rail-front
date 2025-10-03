type CompanyRowProps = {
  item: any;
  edit?: boolean;
};

import { useRouter } from "next/navigation";

export default function CompanyRow({ item }: CompanyRowProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/companies/${item._id}`);
  };

  return (
    <div 
      className="grid grid-cols-2 gap-4 p-4 border-b text-sm hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="font-medium">{item.name}</div>
      <div>
        <img src={item.logo || "/vercel.svg"} alt="logo" className="h-8 w-8 object-contain rounded" />
      </div>
    </div>
  );
}


