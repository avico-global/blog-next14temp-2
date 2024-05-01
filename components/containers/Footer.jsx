import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import PopularPosts from "./PopularPosts";
import LatestPosts from "./LatestPosts";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <FullContainer className="bg-black text-white py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 w-full">
          <div>
            <p className="font-bold">About</p>
            <div className="relative overflow-hidden w-full h-44 mt-5">
              <Image
                src="https://zoya.qodeinteractive.com/wp-content/uploads/2021/04/user-img-1.png"
                alt="Background Image"
                height={200}
                width={200}
              />
            </div>
            <p className="text-white/90 mt-6 text-sm">
              Sed ut in perspiciatis unde omnis iste natus error sit on i tatem
              accusantium doloremque laudan totam rem aperiam eaque.
            </p>
          </div>
          <PopularPosts />
          <LatestPosts />
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-14">
          <Facebook className="w-5" />
          <Twitter className="w-5" />
          <Instagram className="w-5" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 font-semibold uppercase">
          <p className="text-xs">Home</p>
          <p className="text-xs">shop</p>
          <p className="text-xs">lifestyle</p>
          <p className="text-xs">fashion</p>
          <p className="text-xs">about</p>
          <p className="text-xs">contact</p>
        </div>
        <p className="mt-8 text-white/70 text-xs">
          © 2024 THEMESPHERE - ALL REGISTERED
        </p>
      </Container>
    </FullContainer>
  );
}
