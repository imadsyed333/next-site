export type Project = {
  name: string;
  description: string;
  imageLink: string;
  url: string;
  stack: string[];
  featured?: boolean;
};

export type Experience = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
};

export type NavItem = {
  name: string;
  path: string;
};
