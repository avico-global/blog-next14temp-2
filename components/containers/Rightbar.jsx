import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Rightbar() {
  return (
    <div className="h-fit sticky top-0">
      <div className="relative cursor-pointer hover:opacity-90 transition-all">
        <div className="relative overflow-hidden w-full h-96">
          <Image
            fill={true}
            quality={80}
            loading="lazy"
            priority={false}
            sizes="400px, 300px"
            alt="Background Image"
            className="-z-10 w-full h-full object-cover absolute top-0"
            src="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/shutterstock_437021746-1024x683.jpg"
          />
        </div>
        <div className="bg-black/50 flex flex-col items-center gap-3 text-white text-center p-3 absolute bottom-0">
          <p className="uppercase text-xs">LifeStyle</p>
          <h2 className="font-extrabold text-lg">
            The Only Real Fix For All My DIY Needs
          </h2>
          <p className="text-xs">May 15, 2024</p>
        </div>
      </div>
      <div className="border p-5 mt-16 flex flex-col items-center text-center">
        <h2 className="bg-white px-5 font-bold text-lg -mt-9">About</h2>
        <div className="relative overflow-hidden w-full h-40 mt-8">
          <Image
            fill={true}
            quality={80}
            loading="lazy"
            priority={false}
            sizes="400px, 300px"
            alt="Background Image"
            className="-z-10 w-full h-full object-cover absolute top-0"
            src="https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2017/07/about-side.jpg"
          />
        </div>
        <p className="mt-3 text-sm">
          {
            " I'm Shane, a girly girl and lover of life. Join me on the journey to find latest in fashion."
          }
        </p>
        <p className="mt-3 underline text-sm font-bold">Read More</p>
      </div>

      <div className="border p-5 mt-16 flex flex-col items-center text-center">
        <h2 className="bg-white px-5 text-lg font-bold -mt-9">
          Connect & Follow
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-3">
          <Facebook className="w-5" />
          <Twitter className="w-5" />
          <Instagram className="w-5" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 mt-10 text-center flex flex-col items-center">
        <h2 className="font-bold text-lg">Newsletter</h2>
        <div className="border-2 w-14 my-3 border-black"></div>
        <p className="text-sm mt-1">
          Subscribe to our newsletter for exclusive content and all of the
          behind the scenes details.
        </p>
        <Input placeholder="Email" className="mt-5" />
        <Button className="w-full mt-2">Subscribe</Button>
      </div>
    </div>
  );
}
