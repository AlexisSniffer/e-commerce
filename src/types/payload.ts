// Interface automatically generated by schemas-to-ts

export interface Payload<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
