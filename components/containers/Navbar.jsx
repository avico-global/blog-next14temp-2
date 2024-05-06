import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Search, Twitter } from "lucide-react";
import { useRouter } from "next/router";

export default function Navbar({ logo }) {
  const router = useRouter();
  const { project_id } = router.query;

  return (
    <>
      <div className="hidden md:flex items-center sticky top-0 bg-white z-20 shadow-sm justify-center py-3 gap-6 w-full border-b border-gray-100">
        <Link
          href={project_id ? `/${project_id}` : "/"}
          className="uppercase text-sm"
        >
          home
        </Link>
        <Link
          href={project_id ? `/${project_id}/${"about"}` : `/${"about"}`}
          className="uppercase text-sm"
        >
          About
        </Link>
        <Link
          href={project_id ? `/${project_id}/${"contact"}` : `/${"contact"}`}
          className="uppercase text-sm"
        >
          contact
        </Link>
        <Link
          href={project_id ? `/${project_id}/${"blogs"}` : `/${"blogs"}`}
          className="uppercase text-sm"
        >
          blogs
        </Link>
      </div>

      <FullContainer className="bg-white shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-3 w-10/12 py-3 md:py-6 lg:py-9">
          <div className="hidden lg:flex items-center gap-3 uppercase">
            <Search className="w-5" />
            <input
              type="text"
              className="focus:border-b outline-none placeholder:text-gray-700 mt-1"
              placeholder="SEARCH.."
            />
          </div>
          <div className="flex items-center lg:justify-center">
            <Link href={project_id ? `/${project_id}` : "/"}>
              <Image
                height={50}
                width={170}
                src={logo}
                alt="logo"
                className="w-28 md:w-44 lg:w-72"
              />
            </Link>
          </div>
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
