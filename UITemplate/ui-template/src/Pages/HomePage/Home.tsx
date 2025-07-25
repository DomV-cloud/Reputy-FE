import { useEffect, useState } from "react";
import StarIcon from "../../Icons/StarIcon";
import ProfileImage from "../../Components/ProfileImage";
import UserAdvertisementList from "../../Components/Advertisements/UserAdvertisementList";
import UserReferencesSection from "../../Components/UserReferencesSection/UserReferencesSection";
import { getUserAdvertisementList } from "../../Api/Client/Advertisement/AdvertisementApi";
import { useUser } from "../../Context/UserContext";
import { isTokenValid } from "../../Utils/auth";
import { useNavigate } from "react-router";
import { Advertisement } from "../../Types/Advertisement";

const HomePage = () => {
  const [userAdvertisements, setUserAdvertisements] = useState<Advertisement[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();
  const mockUser = {
    references: [
      {
        id: 1,
        author: "Petr S.",
        rating: 5,
        comment: "Skvělá komunikace!",
        date: "2025-06-10",
      },
      {
        id: 2,
        author: "Eva M.",
        rating: 4,
        comment: "Byt odpovídal popisu.",
        date: "2025-05-22",
      },
    ],
  };
  const fetchUserAdvertisements = async () => {
    try {
      console.log("User:", user);
      const response = await getUserAdvertisementList();
      if (!response || !response.data) {
        setError(true);
        return;
      }

      if (!user) {
        setError(true);
        return;
      }

      setUserAdvertisements(response.data);
    } catch (err) {
      console.error("Error fetching advertisements:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isTokenValid()) {
      navigate("/login");
    }
    fetchUserAdvertisements();
  }, []);

  if (loading) return <div>Načítám...</div>;
  if (error) return <div>Chyba při načítání inzerátů</div>;

  return (
    <div className="w-full px-4 py-6 space-y-8">
      {/* Profil stand-alone component*/}
      <section className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">
        <ProfileImage firstNameLetter={user?.firstName.charAt(0)} />
        <div>
          <h2 className="text-xl font-semibold">{user?.firstName}</h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(user?.rating ?? 0)
                    ? "text-green-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm ml-2 text-gray-500">{user?.rating}</span>
          </div>
        </div>
      </section>

      {/* Inzeráty */}
      <UserAdvertisementList advertisements={userAdvertisements} />

      {/* Reference */}
      <UserReferencesSection references={mockUser.references} />
    </div>
  );
};

export default HomePage;
