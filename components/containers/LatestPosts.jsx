import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LatestPosts({ blog_list, imagePath }) {
  return (
    <div className="flex flex-col">
      <p className="font-bold">Latest Posts</p>
      {blog_list
        ?.slice(-4)
        .reverse()
        .map((item, index) => (
          <Blog
            key={index}
            title={item.title}
            href={`/${item?.article_category?.name}/${item.key}`}
            image={
              item.image
                ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                : "/no-image.png"
            }
            author={item.author}
            date={item.published_at}
          />
        ))}
    </div>
  );
}

function Blog({ image, title, href, author, date }) {
  return (
    <div className="flex items-center gap-3 mt-5 cursor-pointer">
      <Link href={href || ""} className="relative overflow-hidden w-2/6 h-20">
        <Image
          src={image}
          fill={true}
          loading="eager"
          priority={true}
          sizes="200px, 150px"
          alt="Background Image"
          className="w-full h-full object-cover absolute top-0 hover:scale-110 transition-all"
        />
      </Link>
      <div className="flex-1">
        <p className="font-bold text-sm">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs mt-2 text-gray-400">{author}</p>
          <span className="text-xs text-gray-400">_</span>
          <p className="text-xs mt-2 text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
}
