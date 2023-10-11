import qs from 'qs'

export const qsCategory = qs.stringify(
  {
    fields: ['name', 'slug'],
    populate: {
      categories: {
        fields: ['name', 'slug'],
        populate: {
          categories: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    filters: {
      category: {
        id: {
          $null: true,
        },
      },
      categories: {
        id: {
          $notNull: true,
        },
        categories: {
          id: {
            $notNull: true,
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const qsCategoryHeader = qs.stringify(
  {
    fields: ['name', 'slug'],
    populate: {
      categories: {
        fields: ['name', 'slug'],
        populate: {
          categories: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    filters: {
      category: {
        id: {
          $null: true,
        },
      },
      categories: {
        id: {
          $notNull: true,
        },
        categories: {
          id: {
            $notNull: true,
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)
