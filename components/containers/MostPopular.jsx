import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

const blogs = [
  {
    title: "Mountain Snow Isn’t Holding Me Back This Time",
    image:
      "https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/anthony-delanoix-226168-1-1536x1024.jpg",
  },
  {
    title: " A Serene Place For Deep Thinkers",
    image:
      "https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/MKF_5387-2048x1367.jpg",
  },
  ,
  {
    title: "My Very Minimal Interior Design Ideas",
    image:
      "https://cheerup2.theme-sphere.com/bold/wp-content/uploads/sites/8/2016/05/interiejer_12-2048x1365.jpg",
  },
];

export default function MostPopular() {
  return (
    <FullContainer className="py-16 text-center">
      <Container className="border border-gray-100 px-3 py-9 md:px-9">
        <h2 className="font-bold text-3xl -mt-14 bg-white px-6">
          Most Popular
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-11 mb-3">
          {blogs.map((item, index) => (
            <BlogCard key={index} title={item.title} image={item.image} />
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative overflow-hidden w-full h-52">
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
      <p className="italic text-xs w-fit text-gray-400 mt-4">
        in
        <span className="uppercase text-yellow-600 font-medium ml-2 text-xs">
          Lifestyle
        </span>
      </p>
      <h3 className="font-semibold mt-2 leading-5">{title}</h3>
    </div>
  );
}
