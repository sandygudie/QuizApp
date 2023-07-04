import {
  SiHtml5,
  SiCss3,
  SiReact,
  SiTypescript,

} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import {
 
  RiFacebookCircleFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiWhatsappFill,
} from "react-icons/ri";

export const Categories = [
  {
    id: 21,
    name: "HTML",
    Icon: SiHtml5,
    score: 50,
  },
  {
    id: 27,
    name: "CSS",
    Icon: SiCss3,
    score: 0,
  },
  {
    id: 28,
    name: "JAVASCRIPT",
    Icon: IoLogoJavascript,
    score: 40,
  },
  {
    id: 20,
    name: "REACT",
    Icon: SiReact,
    score: 70,
  },
  {
    id: 19,
    name: "TYPESCRIPT",
    Icon: SiTypescript,
    score: 0,
  },
  
];
const referralMessage = "";
export const SHARE_MENU = [
  {
    name: "LinkledIn",
    Icon: RiLinkedinFill,
    link: `mailto:?subject=Assetbase%20Referral&body=${referralMessage}`,
  },
  {
    name: "Whatsapp",
    Icon: RiWhatsappFill,
    link: `https://api.whatsapp.com/send?text=${referralMessage}`,
  },
  {
    name: "Twitter",
    Icon: RiTwitterFill,
    link: `https://twitter.com/intent/tweet?text=${referralMessage}`,
  },
  {
    name: "Facebook",
    Icon: RiFacebookCircleFill,
    link: `https://www.facebook.com/sharer/sharer.php?quote=${referralMessage}`,
  },
];
