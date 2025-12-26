"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import courses from "../_data/coursedata";
import { UserButton, useUser } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";

const Header = () => {
  const { user } = useUser();
  const pathurl = usePathname();
  // console.log(pathurl);
  const { exerciseslug } = useParams();
  const capitalize = (s:string) => s ? s[0].toUpperCase() + s.slice(1) : s;

  return (
    <div className="p-4 max-w-7xl flex justify-between items-center w-full">
        <Link href={"/"} className="flex gap-2 items-center ">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <h1 className="text-3xl font-game font-bold">GhostBox </h1>
        </Link>
        {!exerciseslug ? (
          <NavigationMenu>
             
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                   
                  <ul className="grid md:grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px]">
                    {courses.map((course, index) => {
                      return (
                        <div
                          key={index}
                          className="p-2 hover:bg-accent rounded-2xl cursor-pointer"
                        >
                          <h2 className="font-medium">{course.name}</h2>
                          <p className="text-sm text-gray-500">{course.desc}</p>
                        </div>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/projects">Projects</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/pricing"}>Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/contact"}>Contact Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <div className="">
            <h2 className="font-game rounded-tl-none text-5xl p-4 border-4 bg-slate-900 rounded-4xl">
              {capitalize(exerciseslug?.toString()?.replaceAll("-"," "))}</h2>
          </div>
        )}
      {!user ? (
        <Link href={"./sign-in"}>
          <Button className="font-game text-2xl" variant={"pixel"}>
            SignUp
          </Button>
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <Link href={"/dashboard"}>
            <Button className="font-game text-2xl" variant={"pixel"}>
              DashBoard
            </Button>
          </Link>
          <UserButton />
        </div>
      )}
    </div>
  );
};

export default Header;
