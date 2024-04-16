import React from "react";
import Container from "../ui/container";
import { SiteLogo } from "../Navbar";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <main className="text-center text-sm pt-3">
      <div className="bg-gray-100/90 dark:bg-zinc-800 border-y border-gray-300 py-10">
        <Container>
          <div className="flex justify-between">
            <section>
              <SiteLogo />
              <div className="flex flex-col gap-4 text-start mt-8">
                <h4>Calista Wise 7292 Dictum Av. Antonio, Italy.</h4>
                <h4>(+01)-800-3456-88</h4>
                <p>contact@company.com</p>
                <div className="flex gap-3 items-center">
                  <FaFacebook size={20} />
                  <FaWhatsapp size={20} />
                  <FaInstagram size={20} />
                  <FaTwitter size={20} />
                </div>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-start">Useful links</h4>
              <div className="flex flex-col gap-4 text-start mt-8">
                <Link href={"#"}>Delivery Information</Link>
                <Link href={"#"}>Terms & Condition</Link>
                <Link href={"#"}>Customer Service</Link>
                <Link href={"#"}>Privacy Policy</Link>
                <Link href={"#"}>Search Terms</Link>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-start">Get in touch</h4>
              <div className="flex flex-col gap-4 text-start mt-8">
                <h4 className="flex justify-between gap-3">
                  <span>Whatsapp </span>{" "}
                  <span className="text-left">+001 2233 456 291</span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Real Live Support </span>{" "}
                  <span className="text-left">Calista Antonio, Italy </span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Monday - Friday </span>{" "}
                  <span className="text-left">08:00 - 20:00 </span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Monday - Friday </span>{" "}
                  <span className="text-left">08:00 - 20:00 </span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Monday - Friday </span>{" "}
                  <span className="text-left">08:00 - 20:00 </span>
                </h4>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-start">
                Newsletter signup
              </h4>
              <div className="flex flex-col gap-4 text-start mt-8">
                <h4 className="">
                  Subscribe to our newsletters now <br />
                  and stay up-to-date with new collections.
                </h4>
                <div className="relative w-fit">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="p-2 border border-gray-200 focus:outline-none lg:min-w-[300px]"
                    id=""
                  />
                  <button className="text-white absolute right-0 bg-pink-500 p-2">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex justify-between py-3 px-4 ">
          <h4>
            © 2024 Web.Dev <span className="font-semibold">Jihad</span> - All
            Right reserved!
          </h4>
          <ul className="flex items-center gap-5">
            <li>Accessibility</li>
            <li> About Us</li>
            <li>Contact</li>
            <li>Blog</li>
          </ul>
        </div>
      </Container>
    </main>
  );
};

export default Footer;
