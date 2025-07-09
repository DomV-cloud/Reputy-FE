import { useEffect, useState } from "react";
import { searchAdvertisements } from "../../Api/Client/Advertisement/AdvertisementApi";
import { Advertisement } from "../../Types/Advertisement";
import { getFilters } from "../../Api/Client/Advertisement/AdvertisementFilters";
import AdvertisementFilters from "../../Components/Advertisements/AdvertisementFilters";

import AdvertisementPagination from "../../Components/Advertisements/AdvertisementPagination";
import AdvertisementCard from "../../Components/Advertisements/AdvertisementCard";

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
      console.log("Načtené inzeráty:", response.data.data[0]);
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

  const resetPage = () => setPageNumber(1);

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inzeráty</h1>
      {/* Filters */}
      <AdvertisementFilters
        filters={filters}
        city={city}
        setCity={setCity}
        disposition={disposition}
        setDisposition={setDisposition}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        resetPage={resetPage}
      />
      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto">
        {advertisements.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Žádné inzeráty
          </div>
        )}
        {advertisements.map((ad) => (
          <AdvertisementCard key={ad.id} ad={ad} />
        ))}
      </div>
      {/* Pagination */}
      <AdvertisementPagination
        totalPages={totalPages}
        pageNumber={pageNumber}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default AdvertisementsPage;
