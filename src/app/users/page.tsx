"use client";

import ItemList from "../components/ItemList";
import UserListHeader from "../components/headers/UserListHeader";
import UserRow from "../components/rows/UserRow";
import { userService } from "../../lib/services";
import UserDetailView from "./detail-view";

export default function UsersPage() {
  return (
    <section className="container py-8">
      <h1 className="text-xl font-bold mb-6">کاربران</h1>
      <ItemList
        getAll={userService.getAll.bind(userService)}
        getOne={userService.getOne.bind(userService)}
        HeaderComponent={UserListHeader}
        RowComponent={UserRow}
        itemsPerPage={20}
        searchPlaceholder="جستجو کاربر با شناسه..."
      />
    </section>
  );
}

