export interface FooterLink {
  name: string,
  content: string | JSX.Element,
  pageToNavigateTo: string
}

export type FooterLinks = FooterLink[]