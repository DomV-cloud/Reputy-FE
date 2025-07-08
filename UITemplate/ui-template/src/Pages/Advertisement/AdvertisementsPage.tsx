import { useEffect, useState } from "react";
import { searchAdvertisements } from "../../Api/Client/Advertisement/AdvertisementApi";
import { Advertisement } from "../../Types/Advertisement";
import { getFilters } from "../../Api/Client/Advertisement/AdvertisementFilters";
import AdvertisementFilters from "../../Components/Advertisements/AdvertisementFilters";
import ProfileImage from "../../Components/ProfileImage";
import { translateDisposition } from "../../Utils/Translations";
import AdvertisementPagination from "../../Components/Advertisements/AdvertisementPagination";

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
        {advertisements.map((ad) => {
          const landlord = ad.landLord || {};
          return (
            <div
              key={ad.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <div className="h-40 bg-gray-100 rounded mb-2 flex items-center justify-center">
                {ad.imageUrl ? (
                  <img
                    src={ad.imageUrl}
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
                  ? `${ad.realEstate.address.city}, ${
                      ad.realEstate.address.street
                    } • ${translateDisposition(ad.realEstate.disposition)} • ${
                      ad.realEstate.size
                    } m²`
                  : ""}
              </div>
              <div className="font-bold text-green-600 text-lg">
                {Number(ad.price).toLocaleString()} Kč
              </div>
              {/* Landlord Info */}
              <div className="flex items-center gap-3 mt-2 border-t pt-2">
                <ProfileImage
                  profileImage={landlord.avatarUrl}
                  firstNameLetter={landlord.fullName?.charAt(0)}
                />

                <div>
                  <div className="font-medium flex items-center gap-1">
                    {landlord.fullName}
                    {landlord.isVerified && (
                      <span
                        className="ml-1 inline-block text-blue-500"
                        title="Ověřený pronajímatel">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.215.735 5.879 1.896M15 12h6m-3-3l3 3-3 3m-6 6a9.953 9.953 0 01-6.879-2.196M9 12H3m3-3l-3 3 3 3"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {landlord.averageRating && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">
                          {landlord.averageRating}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.73L12 2 10.18 8.51 1 9.24l7.46 4.73L5.82 21z"
                          />
                        </svg>
                      </div>
                    )}
                    <span>
                      {landlord.isVerified ? "Ověřený" : "Neověřený"}{" "}
                      pronajímatel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
