type ProductRowProps = {
  item: any;
  edit?: boolean;
};

import { useRouter } from "next/navigation";

export default function ProductRow({ item }: ProductRowProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${item._id}`);
  };

  return (
    <div 
      className="grid grid-cols-4 gap-4 p-4 border-b text-sm hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="font-medium">{item.title}</div>
      <div>{item.trader?.name || '-'}</div>
      <div>{item.weight} تن</div>
      <div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'انبار' ? 'bg-blue-100 text-blue-800' :
          item.status === 'بارگیری' ? 'bg-orange-100 text-orange-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      </div>
    </div>
  );
}


