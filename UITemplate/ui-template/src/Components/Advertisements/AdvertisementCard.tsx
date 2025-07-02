import HomeIcon from "../../Icons/HomeIcon";

type AdvertisementCardProps = {
  title: string;
  location: string;
  price: string;
};

function AdvertisementCard({ title, location, price }: AdvertisementCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-2">
      <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
        <HomeIcon className="w-10 h-10" />
      </div>
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-primary-dark font-bold">{price}</p>
    </div>
  );
}

export default AdvertisementCard;
