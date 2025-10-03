type WagonRowProps = {
  item: any;
  edit?: boolean;
};

type WagonStatus = "in-service" | "out-service" | "in-repair";
const statusTranslate: Record<WagonStatus, string> = {
  "in-service": "درخدمت",
  "out-service": "خارج از خدمت",
  "in-repair": "در تعمیر",
};

import { useRouter } from "next/navigation";

export default function WagonRow({ item }: WagonRowProps) {
  const router = useRouter();
  const statusKey = (item?.status as WagonStatus) || "in-service";

  const handleClick = () => {
    router.push(`/wagons/${item._id}`);
  };
  
  return (
    <div 
      className="grid grid-cols-6 gap-4 p-4 border-b text-sm hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="font-medium">#{item.wagonId ?? item._id}</div>
      <div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          statusKey === 'in-service' ? 'bg-green-100 text-green-800' :
          statusKey === 'in-repair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {statusTranslate[statusKey]}
        </span>
      </div>
      <div>{item.owner?.name || '-'}</div>
      <div>{item.line > -1 ? `خط ${item.line}` : '-'}</div>
      <div>{item.location || '-'}</div>
      <div>{item.capacity ? `${item.capacity} تن` : '-'}</div>
    </div>
  );
}


