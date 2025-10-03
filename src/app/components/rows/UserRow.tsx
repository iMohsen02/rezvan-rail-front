type UserRowProps = {
  item: any;
  edit?: boolean;
};

import { useRouter } from "next/navigation";

export default function UserRow({ item }: UserRowProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/${item._id}`);
  };

  return (
    <div 
      className="grid grid-cols-4 gap-4 p-4 border-b text-sm hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="font-medium">{item.name}</div>
      <div>{item.phone}</div>
      <div>{item.mail || '-'}</div>
      <div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.role === 'admin' ? 'bg-red-100 text-red-800' :
          item.role === 'trader' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.role}
        </span>
      </div>
    </div>
  );
}


