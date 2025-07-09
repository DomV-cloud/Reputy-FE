import { useNavigate } from "react-router-dom";
import ProfileImage from "../../Components/ProfileImage";
import { translateDisposition } from "../../Utils/Translations";
import { Advertisement } from "../../Types/Advertisement";

interface AdvertisementCardProps {
  ad: Advertisement;
}

const AdvertisementCard = ({ ad }: AdvertisementCardProps) => {
  const landlord = ad.landLord || {};
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/advertisement/${ad.id}`);
  };
  return (
    <div
      key={ad.id}
      className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}>
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
                <span className="font-medium">{landlord.averageRating}</span>
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
              {landlord.isVerified ? "Ověřený" : "Neověřený"} pronajímatel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementCard;
