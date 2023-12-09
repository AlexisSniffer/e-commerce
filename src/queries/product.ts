import qs from 'qs'

export const qsProducts = (filter: string, categories: string[]) =>
  qs.stringify(
    {
      populate: {
        categories: {
          fields: ['name', 'slug'],
          populate: {
            category: {
              fields: ['name', 'slug'],
              populate: {
                category: {
                  fields: ['name', 'slug'],
                },
              },
            },
          },
        },
        images: '*',
      },
      filters: {
        name: {
          $containsi: filter,
        },
        categories: {
          slug: {
            $in: categories,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

export const qsProductUntil = qs.stringify(
  {
    populate: {
      categories: {
        fields: ['name', 'slug'],
      },
      images: '*',
    },
  },
  {
    encodeValuesOnly: true,
  },
)
