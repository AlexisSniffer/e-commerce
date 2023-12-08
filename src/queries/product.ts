import qs from 'qs'

export const qsProducts = (categories: string[]) =>
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
