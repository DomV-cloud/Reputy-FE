type ProfileImageProps = {
  profileImage?: string;
  firstNameLetter?: string;
  width?: string; // např. "w-16"
  height?: string; // např. "h-16"
};

function ProfileImage({
  profileImage,
  firstNameLetter,
  width = "w-20",
  height = "h-20",
}: ProfileImageProps) {
  const hasImage = profileImage && profileImage.trim() !== "";

  return (
    <div
      className={`${width} ${height} bg-green-100 text-green-800 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden`}>
      {hasImage ? (
        <img
          src={profileImage}
          alt={firstNameLetter || "Profilový obrázek"}
          className="object-cover w-full h-full"
        />
      ) : (
        firstNameLetter
      )}
    </div>
  );
}

export default ProfileImage;
