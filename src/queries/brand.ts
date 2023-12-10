import qs from 'qs'

export const qsBrands = qs.stringify(
  {
    fields: ['name', 'slug'],
    sort: ['name:asc'],
  },
  {
    encodeValuesOnly: true,
  },
)
