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

// export interface Pr {
//   id: string;
//   title: string;
//   subject: string;
//   date: string;
//   content: string;
//   attachments: Attachment[];
// }

export interface Attachment {}

export class Pr {
  id: string;
  title: string;
  subject: string;
  date: string;
  content: string;
  attachments: Attachment[];

  constructor(pr: Pr) {
    this.id = pr.id;
    this.title = pr.title;
    this.subject = pr.subject;
    this.date = pr.date;
    this.content = pr.content;
    this.attachments = pr.attachments;
  }

  isValid(): boolean {
    let sum = this.id.length * this.title.length * this.subject.length * this.content.length * this.date.length;
    if (sum != 0) {
      return true;
    }
    return false;
  }
}
