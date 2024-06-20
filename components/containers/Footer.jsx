import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import PopularPosts from "./PopularPosts";
import LatestPosts from "./LatestPosts";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const socialIcons = {
  Facebook: <Facebook className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
};

export default function Footer({
  category,
  categories,
  project_id,
  blog_list,
  imagePath,
  about_me,
  contact_details,
  copyright,
}) {
  const content = md.render(about_me?.value || "");

  return (
    <FullContainer className="bg-black text-white py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 w-full">
          <div>
            <p className="font-bold">About</p>
            <div className="relative overflow-hidden w-full h-40 mt-5">
              <Image
                src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${about_me?.file_name}`}
                alt="Background Image"
                fill={true}
                loading="lazy"
                className="w-full h-full object-cover absolute top-0"
              />
            </div>
            <div
              className="my-5 text-xs"
              dangerouslySetInnerHTML={{
                __html: `${content.slice(0, 100)}...`,
              }}
            ></div>
            <Link href="/about" className="underline font-bold">
              Read More
            </Link>
          </div>
          <PopularPosts blog_list={blog_list} imagePath={imagePath} />
          <LatestPosts blog_list={blog_list} imagePath={imagePath} />
        </div>
        <div className="flex items-center justify-center gap-4 text-gray-400 mt-14">
          {contact_details?.socials?.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              aria-label={item.name}
              className="flex items-center gap-1"
            >
              {socialIcons[item.name]}
            </Link>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mt-8 font-semibold uppercase">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className="uppercase text-sm p-3"
          >
            Home
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
            Contact
          </Link>
        </div>
        <p className="mt-8 text-white/70 text-xs">{copyright}</p>
      </Container>
    </FullContainer>
  );
}
