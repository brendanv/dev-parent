import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://devslashparent.com/",
  author: "Brendan Viscomi",
  desc: "Over-engineering simple things, for the children.",
  title: "/dev/parent",
  ogImage: "devslashparent-og.jpg",
  lightAndDarkMode: false, // system dark mode only, reduces JS required
  postPerPage: 5,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-US"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

// Not really used anymore, SVG is inline!
export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/brendanv/dev-parent",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@devslashparent.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
