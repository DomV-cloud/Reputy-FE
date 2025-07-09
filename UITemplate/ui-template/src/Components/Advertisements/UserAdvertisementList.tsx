import { useRef } from "react";
import AdvertisementCardFull from "./AdvertisementCard";
import ChevronLeftIcon from "../../Icons/ChevronLeftIcon";
import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import { useNavigate } from "react-router-dom";
import { Advertisement } from "../../Types/Advertisement";

type AdvertisementProps = {
  advertisements: Advertisement[];
  title?: string;
};

function UserAdvertisementList({
  advertisements,
  title = "Moje inzeráty",
}: AdvertisementProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {advertisements.length === 0 ? (
        <div className="text-center space-y-2">
          <p>Hmm, tady nic není... ani stopa po inzerátu!</p>
          <button
            onClick={() => navigate("/advertisement")}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Prohlédnout inzeráty
          </button>
        </div>
      ) : (
        advertisements.length > 3 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100">
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            </button>
          </>
        )
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 no-scrollbar scroll-smooth pr-4">
        {advertisements.map((advertisement) => (
          <div key={advertisement.id} className="flex-shrink-0 w-80">
            <AdvertisementCardFull ad={advertisement} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserAdvertisementList;
