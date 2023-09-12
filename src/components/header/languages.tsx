'use client'

import { Select } from 'antd'

const languageOptions = [
  { value: 'esp', label: '🇪🇸 ESP' },
  { value: 'eng', label: '🇺🇸 ENG' },
]

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

export default function Languages() {
  // FIXME: corregir tamaño de fuente del select
  return (
    <Select
      defaultValue="esp"
      bordered={false}
      size={'small'}
      onChange={handleChange}
      options={languageOptions}
    />
  )
}
