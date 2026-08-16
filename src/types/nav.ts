export type NavItem = {
  title: string;
  href: string;
  /** Opens in a new tab and skips active-route matching. */
  external?: boolean;
};
