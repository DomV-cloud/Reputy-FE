import { useEffect, useState } from "react";
import { getAllAdvertisements } from "../../Api/Client/Advertisement/AdvertisementApi";
import { Advertisement } from "../../Types/Advertisement";

const AdvertisementsPage = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [location, setLocation] = useState("");
  const [disposition, setDisposition] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const unique = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));

  const filtered = advertisements.filter((ad) => {
    if (!ad.realEstate) return false;
    const matchesLocation =
      !location || ad.realEstate.address.city === location;
    const matchesDisposition =
      !disposition || ad.realEstate.disposition === disposition;
    const matchesPrice = !maxPrice || Number(ad.price) <= Number(maxPrice);
    return matchesLocation && matchesDisposition && matchesPrice;
  });

  const fetchAdvertisementList = async () => {
    const response = await getAllAdvertisements();
    if (!response || !response.data) {
      alert("Chyba při načítání inzerátů");
      return;
    }
    console.log("Fetched advertisements:", response.data);
    setAdvertisements(response.data);
  };

  useEffect(() => {
    fetchAdvertisementList();
  }, []);

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
            value={location}
            onChange={(e) => setLocation(e.target.value)}>
            <option value="">Vše</option>
            {unique(
              advertisements
                .map(
                  (a) =>
                    a.realEstate &&
                    a.realEstate.address &&
                    a.realEstate.address.city
                )
                .filter(Boolean)
            ).map((c) => (
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
            onChange={(e) => setDisposition(e.target.value)}>
            <option value="">Vše</option>
            {unique(
              advertisements
                .map((a) => a.realEstate && a.realEstate.disposition)
                .filter(Boolean)
            ).map((d) => (
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
            onChange={(e) => setMaxPrice(e.target.value)}
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
    </div>
  );
};

export default AdvertisementsPage;
