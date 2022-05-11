export interface NavProps {
  navItems: Array<NavItem>;
};

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface Prs {
  nodes: Pr[];
}

export interface Pr {
  id: string;
  title: string;
  content: string;
  date: string;
  prFiles: PrFiles;
}

export interface PrFiles {
  subject: string;
  date: string;
}
