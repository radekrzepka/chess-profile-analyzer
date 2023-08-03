import { FC } from "react";

interface ProfileCardProps {}

const ProfileCard: FC<ProfileCardProps> = ({}) => {
   return (
      <div className="mt-3 h-[300px] w-full rounded-xl bg-primary p-3 text-background lg:col-span-2">
         ProfileCard
      </div>
   );
};

export default ProfileCard;
