import { useEffect, useState } from "react";
import { searchAdvertisements } from "../../Api/Client/Advertisement/AdvertisementApi";
import { Advertisement } from "../../Types/Advertisement";
import { getFilters } from "../../Api/Client/Advertisement/AdvertisementFilters";

type Filters = {
  cities: string[];
  dispositions: string[];
};

const PAGE_SIZE = 10;

const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [filters, setFilters] = useState<Filters>({
    cities: [],
    dispositions: [],
  });

  const [city, setCity] = useState("");
  const [disposition, setDisposition] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFilteredAdvertisements = async () => {
    try {
      const response = await searchAdvertisements({
        city: city || undefined,
        disposition: disposition || undefined,
        maxPrice: maxPrice || undefined,
        pageNumber,
        pageSize: PAGE_SIZE,
      });
      setAdvertisements(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Chyba při načítání:", error);
    }
  };

  const fetchAllFilters = async () => {
    try {
      const response = await getFilters();
      setFilters(response.data);
    } catch (error) {
      console.error("Chyba při načítání filtrů:", error);
    }
  };

  useEffect(() => {
    fetchAllFilters();
  }, []);

  useEffect(() => {
    fetchFilteredAdvertisements();
  }, [city, disposition, maxPrice, pageNumber]);

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inzeráty</h1>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Město
          </label>
          <select
            className="mt-1 block w-40 rounded-md border border-gray-300 p-2"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setPageNumber(1);
            }}>
            <option value="">Vše</option>
            {filters.cities?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dispozice
          </label>
          <select
            className="mt-1 block w-40 rounded-md border border-gray-300 p-2"
            value={disposition}
            onChange={(e) => {
              setDisposition(e.target.value);
              setPageNumber(1);
            }}>
            <option value="">Vše</option>
            {filters.dispositions?.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max. cena
          </label>
          <input
            type="number"
            className="mt-1 block w-32 rounded-md border border-gray-300 p-2"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPageNumber(1);
            }}
            placeholder="např. 20000"
          />
        </div>
      </div>
      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisements.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Žádné inzeráty
          </div>
        )}
        {advertisements.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            <div className="h-40 bg-gray-100 rounded mb-2 flex items-center justify-center">
              {ad.image ? (
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-full w-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-400">Bez obrázku</span>
              )}
            </div>
            <h2 className="font-semibold text-lg">{ad.title}</h2>
            <div className="text-gray-500 text-sm">
              {ad.realEstate
                ? `${ad.realEstate.address.city}, ${ad.realEstate.address.street} • ${ad.realEstate.disposition} • ${ad.realEstate.size} m²`
                : ""}
            </div>
            <div className="font-bold text-green-600 text-lg">
              {Number(ad.price).toLocaleString()} Kč
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages >= 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Předchozí
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageClick(idx + 1)}
              className={`px-3 py-1 rounded ${
                pageNumber === idx + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}>
              {idx + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
            Další
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvertisementsPage;
