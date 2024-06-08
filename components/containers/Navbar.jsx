import React, { useState } from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Facebook, Instagram, Search, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar({
  logo,
  project_id,
  blog_list,
  categories,
  category,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const currentPath = router.asPath;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const isActive = (path) => currentPath === path;

  return (
    <>
      <div className="hidden md:flex items-center sticky top-0 bg-white z-20 shadow-sm justify-center w-full border-b border-gray-100">
        <Link
          href={project_id ? `/?${project_id}` : "/"}
          className={cn(
            "uppercase text-sm p-3",
            isActive("/") && "border-b-2 border-black"
          )}
        >
          home
        </Link>
        {categories?.map((item, index) => (
          <Link
            key={index}
            href={project_id ? `/${item}?${project_id}` : `/${item}`}
            className={cn(
              "uppercase text-sm p-3",
              (category === item || isActive(`/${item}`)) &&
                "border-b-2 border-black"
            )}
          >
            {item}
          </Link>
        ))}
        <Link
          href={project_id ? `/${"about"}?${project_id}` : `/${"about"}`}
          className={cn(
            "uppercase text-sm p-3",
            isActive("/about") && "border-b-2 border-black"
          )}
        >
          About
        </Link>
        <Link
          href={project_id ? `/${"contact"}?${project_id}` : `/${"contact"}`}
          className={cn(
            "uppercase text-sm p-3",
            isActive("/contact") && "border-b-2 border-black"
          )}
        >
          contact
        </Link>
      </div>

      <FullContainer className="bg-white shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-3 w-10/12 py-3 md:py-6 lg:py-9">
          <div className="hidden lg:flex items-center gap-3 uppercase relative">
            <Search className="w-5" />
            <input
              type="text"
              className="focus:border-b outline-none placeholder:text-gray-700 mt-1"
              placeholder="SEARCH.."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <div className="absolute top-full p-3 left-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
                  <Link
                    key={index}
                    href={
                      project_id
                        ? `/${item.title
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}?${project_id}`
                        : `/${item.title?.toLowerCase().replaceAll(" ", "-")}`
                    }
                  >
                    <div className="p-2 hover:bg-gray-200 border-b">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center lg:justify-center">
            <Link href={project_id ? `/?${project_id}` : "/"}>
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
