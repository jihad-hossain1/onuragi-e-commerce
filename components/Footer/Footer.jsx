"use client";

import React from "react";
import Container from "../ui/container";
import { SiteLogo } from "../Navbar";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();
  const paths = ["/login", "/login/register",'/customer-dashboard'];


  const hiddenPath = paths.some((item) => path.startsWith(item));
  return (
    <main
      className={hiddenPath ? "hidden" : "max-w-screen-xl mx-auto"}
    >
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 py-10">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-4">
            <section>
              <SiteLogo />
              <div className="flex flex-col gap-4 text-start mt-8">
                <h4 className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">
                  Bogura - 5800 , Bangladesh.
                </h4>
                <h4 className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300">
                  (+880)-1774437263
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  onuragiinof@gmail.com
                </p>
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://facebook.com"
                    className="text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://whatsapp.com"
                    className="text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-green-500"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-pink-500"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-blue-400"
                  >
                    <FaTwitter size={24} />
                  </a>
                </div>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                Useful Links
              </h4>
              <div className="flex flex-col gap-4 text-start mt-4">
                <Link href={"#"} className="hover:text-pink-500 transition-colors hover:underline">
                  Delivery Information
                </Link>
                <Link href={"#"} className="hover:text-pink-500 transition-colors hover:underline">
                  Terms & Condition
                </Link>
                <Link href={"#"} className="hover:text-pink-500 transition-colors hover:underline">
                  Customer Service
                </Link>
                <Link href={"#"} className="hover:text-pink-500 transition-colors hover:underline">
                  Privacy Policy
                </Link>
                <Link href={"#"} className="hover:text-pink-500 transition-colors hover:underline">
                  Search Terms
                </Link>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                Get in Touch
              </h4>
              <div className="flex flex-col gap-4 text-start mt-4">
                <h4 className="flex justify-between gap-3">
                  <span>Whatsapp</span>
                  <span className="text-left">+880 1774437263</span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Real Live Support</span>
                  <span className="text-left">Bogura, Bangladesh</span>
                </h4>
                <h4 className="flex justify-between gap-3">
                  <span>Monday - Friday</span>
                  <span className="text-left">08:00 - 20:00</span>
                </h4>
              </div>
            </section>
            <section>
              <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                Newsletter Signup
              </h4>
              <div className="flex flex-col gap-4 text-start mt-4">
                <h4>
                  Subscribe to our newsletters now <br />
                  and stay up-to-date with new collections.
                </h4>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="p-2 border border-gray-200 rounded-lg focus:outline-none w-full transition-shadow shadow-sm hover:shadow-md"
                  />
                  <button className="absolute right-0 top-0 mt-1 mr-1 bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 border-t border-gray-300 dark:border-gray-600">
          <h4 className="text-gray-700 dark:text-gray-300">
            © 2024 Web.Dev <span className="font-semibold">Jihad</span> - All
            Rights Reserved!
          </h4>
          <ul className="flex flex-wrap items-center gap-6 mt-4 md:mt-0">
            <li className="hover:text-pink-500 transition-colors hover:underline">Accessibility</li>
            <li className="hover:text-pink-500 transition-colors hover:underline">About Us</li>
            <li className="hover:text-pink-500 transition-colors hover:underline">Contact</li>
            <li className="hover:text-pink-500 transition-colors hover:underline">Blog</li>
          </ul>
        </div>
      </Container>
    </main>
  );
};

export default Footer;
