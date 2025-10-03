"use client";

import ItemList from "../components/ItemList";
import CompanyListHeader from "../components/headers/CompanyListHeader";
import CompanyRow from "../components/rows/CompanyRow";
import { companyService } from "../../lib/services";
import CompanyDetailView from "./detail-view";
import CompanyCreateForm from "../components/form/CompanyCreateForm";
import CompanyUpdateForm from "../components/form/CompanyUpdateForm";

export default function CompaniesPage() {
  return (
    <section className="container py-8">
      <h1 className="text-xl font-bold mb-6">شرکت‌ها</h1>
      <ItemList
        getAll={companyService.getAll.bind(companyService)}
        getOne={companyService.getOne.bind(companyService)}
        HeaderComponent={CompanyListHeader}
        RowComponent={CompanyRow}
        CreateFormComponent={CompanyCreateForm}
        UpdateFormComponent={CompanyUpdateForm}
        itemsPerPage={20}
        searchPlaceholder="جستجو شرکت با شناسه..."
      />
    </section>
  );
}

