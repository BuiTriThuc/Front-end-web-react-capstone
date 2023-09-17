"use client";

import React, { useState, useEffect } from "react";
import Container from "./Container";
import Logo from "./navbar/Logo";
import LinkHeader from "./navbar/LinkHeader";
import ButtonLoginHeader from "./navbar/ButtonLoginHeader";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import Navbar from "./navbar/Navbar";
import clsx from "clsx";
import useLoginModal from "../hooks/useLoginModal";
import { useSession } from "next-auth/react";
import UserMenu from "./navbar/UserMenu";

interface HeaderProps {
  currentUser?: Object | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const loginModal = useLoginModal();
  const [scroll, setScroll] = useState(false);

  const { data: session } = useSession();
  console.log("Session: ", { session });

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full fixed z-50">
      <Container
        className={
          scroll
            ? "bg-white opacity-90 -translate-y-1 duration-300 shadow-md"
            : ""
        }
      >
        <div className={clsx(`hidden md:block`)}>
          <div className="flex flex-row justify-between items-center gap-3 py-8">
            <Logo />
            <LinkHeader />

            {currentUser ? (
              <UserMenu currentUser={currentUser} />
            ) : (
              <ButtonLoginHeader onClick={loginModal.onOpen} />
            )}
          </div>
        </div>

        <div className="sm:block md:hidden absolute w-full">
          <div className="flex flex-row justify-between items-center gap-3 py-8">
            <Logo />
            <div onClick={handleMenu} className="mx-8">
              {openMenu ? <IoMdClose size={30} /> : <BiMenu size={30} />}
            </div>
          </div>
        </div>
      </Container>
      {openMenu ? (
        <div className="md:hidden sm:block min-h-full transition-all overflow-x-hidden overflow-y-auto relative">
          <div
            className={`translate duration-300 h-full ${
              openMenu ? `translate-y-0` : "translate-y-full"
            }`}
          >
            <Navbar onClick={handleMenu} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
