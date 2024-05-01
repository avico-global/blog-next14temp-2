import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Cormorant } from "next/font/google";

const myFont = Cormorant({ subsets: ["cyrillic"] });

export default function Banner({
  title,
  image,
  badge,
  tagline,
  author,
  published_at,
}) {
  return (
    <FullContainer className="h-[60vh] overflow-hidden p-10 bg-black/20 text-white text-center">
      <Image
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover absolute top-0"
      />
      <Container className="gap-6">
        {badge && <Badge>{badge}</Badge>}
        <h1
          className={cn(
            "font-extrabold text-7xl capitalize max-w-screen-md",
            myFont.className
          )}
        >
          {title}
        </h1>
        {tagline && <p className="text-xl">{tagline}</p>}
        {author && (
          <div className="flex items-center justify-center gap-4">
            <p>{author}</p> -<p>{published_at}</p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
