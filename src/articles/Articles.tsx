import { Breadcrumbs, Container, Link, Typography } from '@mui/material'
import { ArticlesPageProps } from '~/pages/articles/+onBeforeRender'

const Article = ({ posts }: ArticlesPageProps) => {
  return (
    <Container sx={{ py: 4 }}>
      <div>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link href="/" underline="hover" color="inherit" >プロキシカード印刷</Link>
          <Link href="/articles" underline="hover" color="inherit" >記事一覧</Link>
        </Breadcrumbs>
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          記事一覧
        </Typography>
      </div>
      <ul>
        {posts.map(v =>
          <li key={v.id}>
            <Link href={`/articles/${v.id}/`}>
              {v.title}
            </Link>
          </li>
        )}
      </ul>
    </Container>
  )
}

export default Article
