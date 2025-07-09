import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Advertisement } from "../../Types/Advertisement";
import ProfileImage from "../../Components/ProfileImage";
import { translateDisposition } from "../../Utils/Translations";
import { getAdvertisementDetail } from "../../Api/Client/Advertisement/AdvertisementApi";
import Loader from "../../Components/Loaders/Loader";

const AdvertisementDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchAd = async () => {
    try {
      if (!id) {
        throw new Error("Inzerát ID není k dispozici");
      }
      const response = await getAdvertisementDetail(id!);

      setAdvertisement(response.data);
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAd();
  }, [id]);

  if (loading) return <Loader />;
  if (!advertisement)
    return <div className="text-center py-10">Inzerát nenalezen</div>;

  const landlord = advertisement.landLord || {};

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline">
        Zpět
      </button>
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {advertisement.imageUrl ? (
            <img
              src={advertisement.imageUrl}
              alt={advertisement.title}
              className="w-full h-80 object-cover rounded mb-4"
            />
          ) : (
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              Bez obrázku
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">{advertisement.title}</h1>
          <div className="text-gray-500 mb-2">
            {advertisement.realEstate
              ? `${advertisement.realEstate.address.city}, ${
                  advertisement.realEstate.address.street
                } • ${translateDisposition(
                  advertisement.realEstate.disposition
                )} • ${advertisement.realEstate.size} m²`
              : ""}
          </div>
          <div className="text-green-600 font-bold text-xl mb-4">
            {Number(advertisement.price).toLocaleString()} Kč
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Popis</h2>
            <p className="text-gray-700">
              {advertisement.description || "Žádný popis není k dispozici."}
            </p>
          </div>
        </div>
        <div className="w-full md:w-64 flex flex-col items-center border-l md:pl-6">
          <ProfileImage
            profileImage={landlord.avatarUrl}
            firstNameLetter={landlord.fullName?.charAt(0)}
            width="w-20"
            height="h-20"
          />
          <div className="mt-2 text-lg font-semibold">{landlord.fullName}</div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {landlord.averageRating && <span>⭐ {landlord.averageRating}</span>}
            <span>
              {landlord.isVerified ? "Ověřený" : "Neověřený"} pronajímatel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetailPage;
