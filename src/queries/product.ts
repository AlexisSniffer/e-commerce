import qs from 'qs'

export const qsProducts = qs.stringify(
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
  },
  {
    encodeValuesOnly: true,
  },
)
