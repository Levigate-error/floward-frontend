import PAGE_SLUGS from 'consts/pageSlugs';
import { SidebarNavItemType } from './types';

const SIDEBAR_NAV: SidebarNavItemType[] = [
  {
    title: 'Country Listing',
    path: `/${PAGE_SLUGS.CountryListing}`,
  },
];

export {
  SIDEBAR_NAV,
};
