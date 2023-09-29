export interface MediaProps {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: FormatMediaProps
    hash: string
    ext: string
    mime: string
    size: 3.57
    url: string
    previewUrl: null
    provider: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface FormatMediaProps {
  thumbnail: {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: string
    size: number
    width: number
    height: number
  }
}

export interface MediaListProps {
  data: MediaProps[]
}
