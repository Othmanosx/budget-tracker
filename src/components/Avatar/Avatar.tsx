import Image from "next/image";
import React from "react";

interface Props {
  name?: string | null;
  image?: string | null;
}
const Avatar = ({ image, name }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="h-8 w-8 rounded-full"
        src={image || "/avatar.webp"}
        alt={name || "unknown"}
        width={32}
        height={32}
      />
      <span className="text-l self-center whitespace-nowrap font-semibold dark:text-white">
        {name}
      </span>
    </div>
  );
};

export default Avatar;
