import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Gavel,
  Landmark,
  ScrollText,
  Users,
} from "lucide-react";

export type PracticeArea = {
  slug: string;
  number: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  intro: string;
  items: string[];
  closing?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "litigation-dispute-resolution",
    number: "01",
    title: "Litigation & Dispute Resolution",
    icon: Gavel,
    summary:
      "Civil and commercial litigation before the High Court, specialised courts, and statutory tribunals, conducted with clarity of issues and evidentiary discipline.",
    intro:
      "The firm undertakes litigation across a broad range of civil and commercial disputes. We appear before the High Court, specialised courts including the Environment and Land Court and the Employment and Labour Relations Court, subordinate courts, and statutory tribunals.",
    items: [
      "Property and land disputes",
      "Employment and labour relations disputes",
      "Contractual and commercial disputes",
      "Succession and estate-related disputes",
      "Judicial review and public law matters",
      "Post-judgment processes, execution, and enforcement",
    ],
    closing:
      "We approach litigation with a focus on clarity of issues, evidentiary discipline, and strategic conduct of proceedings.",
  },
  {
    slug: "land-environment-conveyancing",
    number: "02",
    title: "Land, Environment & Conveyancing",
    icon: Landmark,
    summary:
      "Disputes and advisory work on ownership, title, and land use, with conveyancing approached as preventive legal risk management.",
    intro:
      "The firm has a strong practice in land and environment law, handling disputes and advisory matters involving ownership, title, and land use. Conveyancing is integrated within our land law practice and is approached as preventive legal risk management.",
    items: [
      "Ownership and title disputes",
      "Customary trust and beneficial interest claims",
      "Adverse possession",
      "Boundary and land use conflicts",
      "Institutional and public land issues",
      "Land due diligence and title investigations",
      "Drafting and registration of sale agreements, transfers, leases, and charges",
      "Subdivision, amalgamation, and change-of-user processes",
      "Advisory on land acquisition, compliance, and land holding structures",
    ],
  },
  {
    slug: "employment-labour-relations",
    number: "03",
    title: "Employment & Labour Relations",
    icon: Users,
    summary:
      "Advisory and representation for both employers and employees, emphasising procedural fairness and statutory compliance.",
    intro:
      "The firm advises and represents both employers and employees in employment and labour relations matters, whether through litigation, negotiation, or alternative dispute resolution.",
    items: [
      "Employment contracts and workplace policies",
      "Disciplinary and termination processes",
      "Redundancy and restructuring disputes",
      "Employment compliance advisory",
      "Representation before the Employment and Labour Relations Court",
    ],
    closing:
      "Our approach emphasises procedural fairness, statutory compliance, evidentiary discipline, and strategic dispute resolution.",
  },
  {
    slug: "arbitration-alternative-dispute-resolution",
    number: "04",
    title: "Arbitration & Alternative Dispute Resolution",
    icon: ScrollText,
    summary:
      "Arbitration and ADR with a focus on procedural integrity, efficiency, and enforceability, including particular experience in construction disputes.",
    intro:
      "The firm undertakes arbitration and alternative dispute resolution matters, with a focus on procedural integrity, efficiency, and enforceability of outcomes. We have particular experience in disputes arising from construction and building contracts, an area that requires close engagement with contractual documentation, technical evidence, and arbitral procedure.",
    items: [
      "Construction and building contract disputes",
      "Commercial arbitration",
      "Mediation and negotiated dispute resolution",
    ],
    closing:
      "We assist clients to resolve disputes pragmatically while protecting their legal and commercial interests.",
  },
  {
    slug: "public-financial-regulatory-advisory",
    number: "05",
    title: "Public, Financial & Regulatory Advisory",
    icon: Building2,
    summary:
      "Advisory work informed by advanced training in public finance, covering statutory compliance, governance, and regulatory risk.",
    intro:
      "The firm's advisory work is informed by advanced academic training in public finance. We also provide advisory services on data protection compliance, assisting clients to align their operations with applicable data protection laws and regulatory requirements.",
    items: [
      "Statutory and regulatory compliance",
      "Governance and accountability frameworks",
      "Disputes involving public resources or institutional decision-making",
      "Regulatory risk assessment and mitigation",
      "Data protection compliance advisory",
    ],
  },
];

export function getPracticeAreaBySlug(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
