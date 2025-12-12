import "./style.css";
import { getNameInitials } from "../../../utils/Initials";

interface ProfileAvatarProps {
  image?: string;
  text?: string;
}

const ProfileAvatar = ({ image, text }: ProfileAvatarProps) => {
  return (
    <div className="profile-avatar-container">
      {image ? (
        <img src={image} alt="Profile" className="profile-avatar-icon" />
      ) : (
        <div className="profile-avatar-text">
          {getNameInitials(text || "User")}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
