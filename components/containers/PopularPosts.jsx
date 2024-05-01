import Image from "next/image";
import React from "react";

export default function PopularPosts() {
  return (
    <div className="flex flex-col">
      <p className="font-bold">Popular Posts</p>
      <Blog
        title="Driving Convertible is a fashion"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_398822470-1536x1024.jpg"
      />
      <Blog
        title="A Living Room That is Fit For The Millenials"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_458700517-scaled-702x1024.jpg"
      />
      <Blog
        title="Going for a swim"
        image="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/DSC_6314-1536x1025.jpg"
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
