'use client'
import type { Toc } from '@/lib/toc'
import { Button } from '@mui/material'
import { useState, type FC } from 'react'
import { ArrowBack } from '@mui/icons-material'
import Hr from '../ui/Hr'
import { sanitizeID } from '@/lib/md'

interface Props {
  tocs: Toc[]
  id: string
}

const TocList: FC<Props> = ({ tocs, id }) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  return (
    <>
      <div>
        <Hr />
      </div>
      <div
        style={{
          padding: '6px 0',
          maxHeight: '460px',
          overflowY: 'scroll',
        }}
      >
        {tocs.map(({ level, id: hash }, index) => (
          <a
            key={hash}
            className="toc-list"
            href={'#' + sanitizeID(hash)}
            onClick={() => {
              setCurrentIdx(index)
            }}
            style={{
              paddingLeft: level * 16 + 'px',
              color: currentIdx === index ? '#1976D2' : 'inherit',
              backgroundColor: currentIdx === index ? '#F8F8F8' : 'inherit',
            }}
          >
            {currentIdx === index && <div className="toc-block" />}
            {hash}
          </a>
        ))}
      </div>
      <Hr />
      <Button
        variant="outlined"
        size="small"
        startIcon={<ArrowBack />}
        component="a"
        href="/article"
        sx={{
          ml: '12px',
          mt: 1,
        }}
      >
        文章页
      </Button>
    </>
  )
}

export default TocList
