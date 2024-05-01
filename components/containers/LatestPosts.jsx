import Image from "next/image";
import React from "react";

export default function LatestPosts() {
  return (
    <div className="flex flex-col">
      <p className="font-bold">Latest Posts</p>
      <Blog
        title="A Look Inside The Work Abode"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/DSC2670-1536x1025.jpg"
      />
      <Blog
        title="Newly Wed And Blissful Start of New Life"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_604112207-1024x683.jpg"
      />
      <Blog
        title="Latest Style Ideas For Men in Fashion"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_350435249-1024x1024.jpg"
      />
    </div>
  );
}

function Blog({ image, title }) {
  return (
    <div className="flex items-center gap-3 mt-5 cursor-pointer">
      <div className="relative overflow-hidden w-2/6 h-20">
        <Image
          src={image}
          fill={true}
          loading="eager"
          priority={true}
          sizes="200px, 150px"
          alt="Background Image"
          className="w-full h-full object-cover absolute top-0"
        />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs mt-2 text-gray-400">May 19, 2024</p>
      </div>
    </div>
  );
}
