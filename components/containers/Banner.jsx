import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Cormorant } from "next/font/google";
import { Button } from "../ui/button";

export default function Banner({
  title,
  image,
  badge,
  tagline,
  author,
  published_at,
}) {
  return (
    <FullContainer
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="overflow-hidden bg-fixed text-white"
    >
      {/* <Image
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      /> */}

      <FullContainer className="gap-6 h-[60vh] bg-black/50 p-10 text-center">
        <Container>
          {badge && <Badge>{badge}</Badge>}
          <h1 className="font-extrabold text-5xl md:text-7xl capitalize leading-10">
            {title}
          </h1>
          {tagline && <p className="mt-10 text-lg">{tagline}</p>}
          <Button className="bg-white hover:text-white text-black mt-10">
            Explore Rovella
          </Button>
        </Container>
      </FullContainer>
    </FullContainer>
  );
}
