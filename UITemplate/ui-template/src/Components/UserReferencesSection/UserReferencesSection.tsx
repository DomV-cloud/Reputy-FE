import StarIcon from "../../Icons/StarIcon";

type Reference = {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
};

type UserReferencesSectionProps = {
  references: Reference[];
  title?: string;
};

function UserReferencesSection({
  references,
  title = "Nejnovější reference o vás",
}: UserReferencesSectionProps) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-4">
        {references.map((ref) => (
          <div key={ref.id} className="bg-white p-4 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{ref.author}</span>
              <span className="text-sm text-gray-400">{ref.date}</span>
            </div>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < ref.rating ? "text-primary" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 italic">„{ref.comment}“</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserReferencesSection;
