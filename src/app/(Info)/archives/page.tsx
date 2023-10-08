import ArchiveCmp from '@/components/app/Archive'
import Title from '@/components/ui/Title'
import { useRequest } from '@/lib/api'
import React from 'react'

const Archive = async () => {
  const archives = await useRequest<Archeve[]>('archives')
  return (
    <>
      <Title>归档</Title>
      <ArchiveCmp archives={archives} />
    </>
  )
}

export default Archive
