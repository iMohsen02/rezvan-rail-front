"use client";

import { useMemo, useState } from "react";
import ItemList from "../components/ItemList";
import WagonListHeader from "../components/headers/WagonListHeader";
import WagonRow from "../components/rows/WagonRow";
import { wagonService } from "../../lib/services";
import WagonDetailView from "./detail-view";
import WagonCreateForm from "../components/form/WagonCreateForm";
import WagonUpdateForm from "../components/form/WagonUpdateForm";


type Wagon = {
  _id: string;
  wagonId: number;
  status: "in-service" | "repair" | "out-service";
  owner: { name: string };
  forwarder: { name: string };
  firstEntryAt: string;
  line: number;
  capacity: number;
  size: number;
  location: string;
};

const mockWagons: Wagon[] = Array.from({ length: 8 }).map((_, i) => ({
  _id: String(i + 1),
  wagonId: 7000 + i,
  status: i % 3 === 0 ? "repair" : "in-service",
  owner: { name: "شرکت الف" },
  forwarder: { name: "پیمانکار ب" },
  firstEntryAt: new Date().toISOString(),
  line: (i % 6) + 1,
  capacity: 50,
  size: Math.round(Math.random() * 50),
  location: i % 2 ? "خواف" : "روزنک",
}));

export default function WagonsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "rail">("list");

  const lines = useMemo(() => {
    const map: Record<number, Wagon[]> = {};
    mockWagons.forEach((w) => {
      map[w.line] = map[w.line] || [];
      map[w.line].push(w);
    });
    return map;
  }, []);


  return (
    <>

    <section className="container py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">واگن‌ها</h1>
      </div>

      {view === "list" && (
        <ItemList
          getAll={wagonService.getAll.bind(wagonService)}
          getOne={wagonService.getOne.bind(wagonService)}
          HeaderComponent={WagonListHeader}
          RowComponent={WagonRow}
          CreateFormComponent={WagonCreateForm}
          UpdateFormComponent={WagonUpdateForm}
          itemsPerPage={20}
          searchPlaceholder="جستجو واگن با شناسه..."
        />
      )}

     

      {detailId && (
        <div className="modal-backdrop" onClick={() => setDetailId(null)}>
          <div className="modal card" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold mb-2">جزئیات واگن</h3>
            <p className="text-sm mb-4">نمایش همه فیلدهای واگن با امکان ویرایش.</p>
            <div className="flex items-center gap-2">
              <button className="btn-primary" onClick={() => alert("فرم ویرایش باز شود")}>ویرایش</button>
              <button className="btn-ghost" onClick={() => setDetailId(null)}>بستن</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal card" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold mb-2">افزودن واگن</h3>
            <p className="text-sm mb-4">فرم افزودن واگن جدید (شناسه، وضعیت، مالک، ...)</p>
            <div className="flex items-center gap-2">
              <button className="btn-primary" onClick={() => setShowAdd(false)}>ثبت</button>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>انصراف</button>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
}

// Basic modal styles reusing global tokens

