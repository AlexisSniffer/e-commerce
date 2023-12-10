import qs from 'qs'

export const qsProducts = (
  filter: string,
  categories: string[],
  prices: [number, number],
  brands: string[],
) =>
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
        brand: {
          fields: ['name', 'slug'],
        },
        images: '*',
      },
      filters: {
        name: {
          $containsi: filter,
        },
        price: {
          $between: prices,
        },
        brand: {
          slug: {
            $in: brands,
          },
        },
        categories: {
          $or: [
            {
              slug: {
                $in: categories,
              },
            },
            {
              category: {
                $or: [
                  {
                    slug: {
                      $in: categories,
                    },
                  },
                  {
                    category: {
                      slug: {
                        $in: categories,
                      },
                    },
                  },
                ],
              },
            },
          ],
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
