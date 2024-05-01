import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Search, Twitter } from "lucide-react";

export default function Navbar({ logo }) {
  return (
    <>
      <div className="hidden md:flex items-center sticky top-0 bg-white z-20 shadow-sm justify-center py-3 gap-6 w-full border-b border-gray-100">
        <Link href="/" className="uppercase text-sm">
          home
        </Link>
        <Link href={`/${"about"}`} className="uppercase text-sm">
          About
        </Link>
        <Link href={`/${"contact"}`} className="uppercase text-sm">
          contact
        </Link>
        <Link href={`/${"blogs"}`} className="uppercase text-sm">
          blogs
        </Link>
      </div>

      <FullContainer className="bg-white shadow-sm">
        <div className="flex items-center justify-between w-10/12 py-3 md:py-6 lg:py-10">
          <div className="hidden lg:flex items-center gap-3 uppercase">
            <Search className="w-5" />
            <input
              type="text"
              className="focus:border-b outline-none placeholder:text-gray-700 mt-1"
              placeholder="SEARCH.."
            />
          </div>
          <Link href="/">
            <Image
              height={50}
              width={170}
              src={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${logo.file_name}`}
              alt="logo"
              className="w-28 md:w-72"
            />
          </Link>
          <div className="flex items-center justify-end gap-3 text-gray-400">
            <Facebook className="w-5" />
            <Twitter className="w-5" />
            <Instagram className="w-5" />
          </div>
        </div>
      </FullContainer>
    </>
  );
}
