"use client";

import ItemList from "../components/ItemList";
import ProductListHeader from "../components/headers/ProductListHeader";
import ProductRow from "../components/rows/ProductRow";
import { productService } from "../../lib/services";
import ProductDetailView from "./detail-view";
import ProductCreateForm from "../components/form/ProductCreateForm";
import ProductUpdateForm from "../components/form/ProductUpdateForm";

export default function ProductsPage() {
  return (
    <section className="container py-8">
      <h1 className="text-xl font-bold mb-6">محصولات</h1>
      <ItemList
        getAll={productService.getAll.bind(productService)}
        getOne={productService.getOne.bind(productService)}
        HeaderComponent={ProductListHeader}
        RowComponent={ProductRow}
        CreateFormComponent={ProductCreateForm}
        UpdateFormComponent={ProductUpdateForm}
        itemsPerPage={12}
        searchPlaceholder="جستجو محصول با شناسه..."
      />
    </section>
  );
}

