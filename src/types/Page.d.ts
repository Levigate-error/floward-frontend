declare type PageNames = (
  'Auth'
  | 'CountryListing'
  | 'CountryDetails'
)

declare type PageSlug = (
  ''
  | 'auth'
  | 'details'
)

declare type PageSlugs = Record<PageNames, PageSlug>
