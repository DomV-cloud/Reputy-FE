// --- Filter Component ---
type FiltersProps = {
  filters: { cities: string[]; dispositions: string[] };
  city: string;
  setCity: (v: string) => void;
  disposition: string;
  setDisposition: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  resetPage: () => void;
};
const AdvertisementFilters = ({
  filters,
  city,
  setCity,
  disposition,
  setDisposition,
  maxPrice,
  setMaxPrice,
  resetPage,
}: FiltersProps) => (
  <div className="bg-white rounded-xl shadow p-4 mb-8 flex flex-wrap gap-4 items-end">
    <div>
      <label className="block text-sm font-medium text-gray-700">Město</label>
      <select
        className="mt-1 block w-40 rounded-md border border-gray-300 p-2"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          resetPage();
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
          resetPage();
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
          resetPage();
        }}
        placeholder="např. 20000"
      />
    </div>
  </div>
);
export default AdvertisementFilters;
