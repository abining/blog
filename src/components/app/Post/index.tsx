import type { FC } from 'react'
import './index.css'

interface Props {
  html: string
}

const PostCmp: FC<Props> = ({ html }) => {
  return (
    <>
      <div
        className="md"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        style={{
          padding: '16px 20px 56px 20px',
          margin: '0 20px 0 260px',
          flex: 1,
        }}
      />
    </>
  )
}

export default PostCmp
