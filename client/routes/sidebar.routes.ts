import { FaBlog } from "react-icons/fa";
import { FiCompass } from "react-icons/fi";
import { ImFeed, ImInfo } from "react-icons/im";
import { MdOutlineContactSupport, MdPostAdd } from "react-icons/md";
import { LinkItemProps } from "../@types";

const SidebarRoutes: Array<LinkItemProps> = [
  { name: "Feed", icon: ImFeed, href: "/feed" },
  { name: "Create Post", icon: MdPostAdd, href: "/meetup/create" },
  { name: "Explore Meetups", icon: FiCompass, href: "/explore" },
  { name: "Blog", icon: FaBlog, href: "/blog" },
  { name: "About", icon: ImInfo, href: "/about" },
  { name: "Contact", icon: MdOutlineContactSupport, href: "/contact" },
];

export default SidebarRoutes;
