import qs from 'qs'

const productPopulate = {
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
  deliveryTime: '*',
  variants: {
    populate: {
      variant: {
        populate: {
          type: '*',
        },
      },
    },
  },
}

export const qsProducts = (
  filter: string,
  categories: string[],
  prices: number[],
  brands: string[],
  pagination: { page: number; pageSize: number },
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
      sort: ['name:asc'],
      pagination,
      locale: localStorage.getItem('locale'),
    },
    {
      encodeValuesOnly: true,
    },
  )

export const qsProductsBySlug = (slug: string) => {
  return qs.stringify(
    {
      populate: {
        ...productPopulate,
      },
      filters: {
        slug: {
          $eq: slug,
        },
      },
      locale: localStorage.getItem('locale') ?? 'es',
    },
    {
      encodeValuesOnly: true,
    },
  )
}

export const qsProductUntil = qs.stringify(
  {
    populate: {
      categories: {
        fields: ['name', 'slug'],
      },
      images: '*',
      variants: {
        populate: {
          variant: {
            populate: {
              type: '*',
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)
