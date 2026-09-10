export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  tags: string[];
};

export const team: TeamMember[] = [
  {
    slug: "terry-kinyanjui",
    name: "Terry Kinyanjui",
    role: "Advocate of the High Court of Kenya",
    bio: [
      "Terry Kinyanjui is an Advocate of the High Court of Kenya, admitted to the Bar in 2018. She holds a Bachelor of Laws degree from the University of Nairobi, has completed professional training in Data Protection, and is currently pursuing a Master's Degree in Public Finance at the University of Nairobi.",
      "Her practice focuses on litigation, land and environment law, arbitration, employment and labour relations, and regulatory advisory. She brings strong analytical depth and disciplined legal reasoning to both contentious and advisory matters.",
    ],
    tags: [
      "Litigation",
      "Land & Environment",
      "Arbitration",
      "Employment",
      "Regulatory Advisory",
    ],
  },
  {
    slug: "eric-cliff-gitonga",
    name: "Eric Cliff Gitonga",
    role: "Advocate of the High Court of Kenya",
    bio: [
      "Eric Cliff Gitonga is an Advocate of the High Court of Kenya, admitted in 2020. He holds a Bachelor of Laws degree from Mount Kenya University.",
      "His practice includes litigation, conveyancing, and general legal advisory work, supporting both dispute resolution and transactional matters within the firm.",
    ],
    tags: ["Litigation", "Conveyancing", "Legal Advisory"],
  },
  {
    slug: "virginia-watiri",
    name: "Virginia Watiri",
    role: "Office Secretary",
    bio: [
      "Virginia Watiri serves as the firm's office secretary, supporting administrative functions, client coordination, and document management.",
    ],
    tags: ["Administration", "Client Coordination"],
  },
];
