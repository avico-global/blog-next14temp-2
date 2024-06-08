import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import PopularPosts from "./PopularPosts";
import LatestPosts from "./LatestPosts";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer({
  category,
  categories,
  project_id,
  logo,
  blog_list,
  imagePath,
}) {
  return (
    <FullContainer className="bg-black text-white py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 w-full">
          <div>
            <p className="font-bold">About</p>
            <div className="relative overflow-hidden w-full h-44 mt-5">
              <Image
                src={logo}
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
          <LatestPosts blog_list={blog_list} imagePath={imagePath} />
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-14">
          <Facebook className="w-5" />
          <Twitter className="w-5" />
          <Instagram className="w-5" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8 font-semibold uppercase">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className="uppercase text-sm p-3"
          >
            home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={project_id ? `/${item}?${project_id}` : `/${item}`}
              className={cn(
                "uppercase text-sm p-3",
                category === item && "border-b-2 border-purple-500"
              )}
            >
              {item}
            </Link>
          ))}
          <Link
            href={project_id ? `/${"about"}?${project_id}` : `/${"about"}`}
            className="uppercase text-sm p-3"
          >
            About
          </Link>
          <Link
            href={project_id ? `/${"contact"}?${project_id}` : `/${"contact"}`}
            className="uppercase text-sm p-3"
          >
            contact
          </Link>
        </div>
        <p className="mt-8 text-white/70 text-xs">
          © 2024 THEMESPHERE - ALL REGISTERED
        </p>
      </Container>
    </FullContainer>
  );
}
