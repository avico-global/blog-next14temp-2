import React, { useEffect, useRef, useState } from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Facebook, Instagram, Menu, Search, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar({
  logo,
  project_id,
  blog_list,
  categories,
  category,
  contact_details,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const searchContainerRef = useRef(null);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchToggle = () => {
    setOpenSearch((prev) => !prev);
    if (!openSearch) {
      setSearchQuery("");
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setOpenSearch(false);
      setSearchQuery("");
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (sidebar) setSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch, sidebar]);

  const filteredBlogs = blog_list?.filter((item) =>
    item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const socialIcons = {
    Facebook: <Facebook className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    Twitter: <Twitter className="w-5 h-5" />,
  };

  return (
    <>
      <div>
        <div className="hidden md:flex items-center sticky top-0 bg-white z-20 shadow-sm justify-center w-full border-b border-gray-100">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "uppercase text-sm p-3",
              isActive("/") && "border-b-2 border-black"
            )}
          >
            Home
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
            Contact
          </Link>
        </div>

        <FullContainer className="bg-white shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-3 w-10/12 py-3 md:py-6 lg:py-9">
            <div
              ref={searchContainerRef}
              className="hidden lg:flex items-center gap-3 uppercase relative"
            >
              <Search className="w-5" onClick={handleSearchToggle} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="focus:border-b outline-none placeholder:text-gray-700 mt-1"
                placeholder="SEARCH.."
              />
              {searchQuery && (
                <div className="absolute top-full p-3 left-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      key={index}
                      href={
                        project_id
                          ? `/${item.article_category.name}/${item.key}?${project_id}`
                          : `/${item.article_category.name}/${item.key}`
                      }
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
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
            <div
              className="flex items-center justify-end gap-3 text-gray-500 relative"
              ref={searchContainerRef}
            >
              <div className="hidden md:flex items-center gap-3">
                {contact_details?.socials?.map((item, index) => (
                  <Link key={index} href={item.link} aria-label={item.name}>
                    {socialIcons[item.name]}
                  </Link>
                ))}
              </div>
              <Search
                className="w-5 md:w-4 text-black cursor-pointer md:hidden"
                onClick={handleSearchToggle}
              />
              <Menu
                onClick={() => setSidebar(!sidebar)}
                className="w-6 h-6 md:hidden ml-1 text-black"
              />
              {openSearch && (
                <>
                  {searchQuery && (
                    <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                      {filteredBlogs?.map((item, index) => (
                        <Link
                          key={index}
                          href={
                            project_id
                              ? `/${item.article_category.name}/${item.key}?${project_id}`
                              : `/${item.article_category.name}/${item.key}`
                          }
                        >
                          <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                    placeholder="Search..."
                  />
                </>
              )}
            </div>
          </div>
        </FullContainer>
      </div>

      <div
        ref={sidebarRef}
        className={`h-screen w-7/12 transition-all z-50 fixed right-0 top-0 px-4 bg-white dark:bg-gray-800 capitalize ${
          sidebar && "shadow-xl"
        }`}
        style={{ transform: sidebar ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-end gap-3 h-[52px]">
          <Search
            className="w-5 md:w-4 text-black cursor-pointer"
            onClick={() => {
              setSidebar(false);
              handleSearchToggle();
            }}
          />
          <Menu
            onClick={() => setSidebar(false)}
            className="w-6 h-6 md:hidden ml-1"
          />
        </div>
        <div className="flex flex-col mt-5">
          <Link
            href={project_id ? `/?${project_id}` : "/"}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/") && "border-black text-black"
            )}
          >
            Home
          </Link>
          {categories?.map((item, index) => (
            <Link
              key={index}
              href={project_id ? `/${item}?${project_id}` : `/${item}`}
              className={cn(
                "font-semibold text-gray-500 capitalize hover:text-black transition-all py-3 px-2 border-b hover:border-black",
                (category === item || isActive(`/${item}`)) &&
                  "border-black text-black"
              )}
            >
              {item}
            </Link>
          ))}
          <Link
            href={project_id ? `/${"about"}?${project_id}` : `/${"about"}`}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/about") && "border-black text-black"
            )}
          >
            About
          </Link>
          <Link
            href={project_id ? `/${"contact"}?${project_id}` : `/${"contact"}`}
            className={cn(
              "font-semibold text-gray-500 capitalize border-b hover:text-black hover:border-black transition-all px-2 py-3",
              isActive("/contact") && "border-black text-black"
            )}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
