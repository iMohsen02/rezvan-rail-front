"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface ItemListProps<T> {
  // Service functions
  getAll: (params?: { page?: number; limit?: number; [key: string]: any }) => Promise<{ data: T[]; total: number }>;
  getOne: (id: string) => Promise<{ data: T }>;
  
  // Components
  HeaderComponent: React.ComponentType;
  RowComponent: React.ComponentType<{ item: T }>;
  
  // Configuration
  itemsPerPage?: number;
  searchPlaceholder?: string;
}

export default function ItemList<T extends { _id: string }>({
  getAll,
  getOne,
  HeaderComponent,
  RowComponent,
  itemsPerPage = 10,
  searchPlaceholder = "جستجو با شناسه..."
}: ItemListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<T | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Load items list
  const loadItems = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getAll({
        page: page - 1, // Convert to 0-based for backend
        limit: itemsPerPage
      });
      
      setItems(response.data);
      setTotalItems(response.total);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری اطلاعات');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Search by ID
  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchResult(null);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await getOne(searchId.trim());
      setSearchResult(response.data);
    } catch (err: any) {
      setSearchResult(null);
      // Error is handled by service layer
    } finally {
      setSearchLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchId("");
    setSearchResult(null);
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadItems(page);
    }
  };

  // Load initial data
  useEffect(() => {
    loadItems(1);
  }, []);

  // Handle search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="card p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searchLoading || !searchId.trim()}
            className="btn-primary px-6"
          >
            {searchLoading ? "جستجو..." : "جستجو"}
          </button>
          {searchResult && (
            <button
              onClick={clearSearch}
              className="btn-ghost px-4"
            >
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="card">
          <div className="p-4 border-b bg-blue-50">
            <h3 className="font-semibold text-blue-800">نتیجه جستجو</h3>
          </div>
          <div>
            <HeaderComponent />
            <RowComponent item={searchResult} />
          </div>
        </div>
      )}

      {/* Main List */}
      {!searchResult && (
        <div className="card">
          {/* Header */}
          <HeaderComponent />
          
          {/* Content */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              <p>{error}</p>
              <button 
                onClick={() => loadItems(currentPage)}
                className="mt-3 btn-ghost text-sm"
              >
                تلاش مجدد
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>هیچ آیتمی یافت نشد</p>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <RowComponent key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!searchResult && !loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            نمایش {((currentPage - 1) * itemsPerPage) + 1} تا {Math.min(currentPage * itemsPerPage, totalItems)} از {totalItems} آیتم
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-ghost px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              قبلی
            </button>
            
            <div className="flex gap-1">
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="btn-ghost px-3 py-1 text-sm"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="px-2 py-1 text-sm">...</span>}
                </>
              )}
              
              {/* Pages around current */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (page > totalPages) return null;
                
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'btn-ghost'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && <span className="px-2 py-1 text-sm">...</span>}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="btn-ghost px-3 py-1 text-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-ghost px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}