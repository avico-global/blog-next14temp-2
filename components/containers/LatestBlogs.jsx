import React, { useState } from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function LatestBlogs({ blogs, imagePath, project_id }) {
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 6);
  };

  return (
    <FullContainer className="py-16 text-center">
      <Container>
        <h2 className="font-bold text-3xl bg-white px-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 w-full mt-11 mb-3">
          {blogs?.slice(0, visibleBlogs).map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              author={item.author}
              date={item.published_at}
              tagline={item.tagline}
              content={item.articleContent}
              image={
                item.image
                  ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                  : "/no-image.png"
              }
              href={
                project_id
                  ? `/${item.article_category.name}/${item.key}?${project_id}`
                  : `/${item.article_category.name}/${item.key}`
              }
            />
          ))}
        </div>
        {visibleBlogs < blogs.length && (
          <Button onClick={handleSeeMore} className="mt-10">
            See More Articles
          </Button>
        )}
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, tagline, href }) {
  return (
    <Link href={href || ""}>
      <div className="relative overflow-hidden w-full h-80 hover:opacity-80 transition-all">
        <Image
          src={image}
          alt="Background Image"
          priority={true}
          fill={true}
          loading="eager"
          sizes="400px, 300px"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
      </div>
      <h3 className="font-semibold text-lg mt-4 leading-5">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm">{tagline.slice(0, 200)}</p>
    </Link>
  );
}
