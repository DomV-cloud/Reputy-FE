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
  return (
    <div
      className={`${width} ${height} bg-green-100 text-green-800 rounded-full flex items-center justify-center text-2xl font-bold`}>
      {firstNameLetter}
    </div>
  );
}

export default ProfileImage;
