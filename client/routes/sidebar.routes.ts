import { FiCompass } from "react-icons/fi";
import { ImFeed } from "react-icons/im";
import { MdPostAdd } from "react-icons/md";
import { LinkItemProps } from "../@types";

const SidebarRoutes: Array<LinkItemProps> = [
  { name: "Feed", icon: ImFeed, href: "/feed" },
  { name: "Create Post", icon: MdPostAdd, href: "/meetup/create" },
  // { name: "Explore Meetups", icon: FiCompass, href: "/meetup/explore" },
];

export default SidebarRoutes;
