import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Head from "next/head";
import React from "react";
import { Montserrat } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Map from "@/components/containers/Map";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Contact({ logo }) {
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar logo={logo} />
      <FullContainer>
        <Container className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-contact gap-14 w-full">
            <div>
              <Textarea label="Message" />
              <div className="grid grid-cols-2 gap-10 mt-3">
                <Input label="Name" placeholder="Your Name" />
                <Input label="Email" placeholder="Your Email" />
              </div>
              <Button className="mt-6">Send Message</Button>
            </div>
            <div className="flex flex-col items-center text-center">
              <Map location="united states" />
              <div className="flex flex-col items-center text-center text-gray-500 text-xs gap-3">
                <p className="text-xl mt-3 font-bold text-black">
                  London Studio
                </p>
                <p>zoya@qodeinteractive.com</p>
                <p>Westminster, London, UK</p>
                <p>(00)207-123-1234</p>
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const _logo = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo"}`
  );
  const logo = await _logo.json();

  return {
    props: {
      logo: logo.data[0],
    },
  };
}
