import { css } from '@emotion/react'
import { Breadcrumbs, Container, Link, Typography } from '@mui/material'
import DOMParserReact from 'dom-parser-react'
import { Article as IArticle } from './article-service'
import { a, h2, h3, h4, img, p, table, tbody, td, th, tr } from './common/markdown'

interface Props {
  post: IArticle
}

const Article = ({ post }: Props) => {
  return (
    <Container sx={{ py: 4 }} component="article">
      <div>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link href="/" underline="hover" color="inherit" >プロキシカード印刷</Link>
          <Link href="/articles" underline="hover" color="inherit" >記事一覧</Link>
        </Breadcrumbs>
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
      </div>
      <DOMParserReact
        source={post.content}
        components={{ h2, h3, h4, p, a, table, tbody, tr, th, td, img }}
      />
      <div css={css`display: flex; justify-content: center; margin: 40px;`}>
        <Link href="/articles">
          記事一覧へ
        </Link>
      </div>
    </Container>
  )
}

export default Article
