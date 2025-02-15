import { css } from '@emotion/react'
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import type { DetailedHTMLProps, HTMLProps, ImgHTMLAttributes, ReactNode } from 'react'

const headingInnerStyle = css`
  visibility: hidden;

  h2:hover &,
  h3:hover &,
  h4:hover &,
  h5:hover &,
  h6:hover & {
    visibility: visible;
  }
`

const HeadingInner = ({ children, id }: { children?: ReactNode, id?: string }) =>
  <>
    {children}
    {id && <Link underline="none" href={`#${id}`} css={headingInnerStyle}>#</Link>}
  </>

const h2Style = css`
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid currentColor;
`

export const h2 = (props: HTMLProps<'h2'>) =>
  <Typography component="h2" variant="h4" fontWeight="bold" id={props.id} style={props.style} css={h2Style}>
    <HeadingInner {...props} />
  </Typography>

export const h3 = (props: HTMLProps<'h3'>) =>
  <Typography component="h3" variant="h5" fontWeight="bold" id={props.id} style={props.style} css={css`margin-top: 1em; margin-bottom: 1em;`}>
    <HeadingInner {...props} />
  </Typography>

export const h4 = (props: HTMLProps<'h4'>) =>
  <Typography component="h4" fontWeight="bold" gutterBottom variant="h6" id={props.id} style={props.style}>
    <HeadingInner {...props} />
  </Typography>

export const p = (props: HTMLProps<'p'>) =>
  <Typography component="p" gutterBottom style={props.style}>{props.children}</Typography>

export const a = (props: HTMLProps<'a'>) =>
  <Link
    href={props.href}
    hrefLang={props.hrefLang}
    target={props.target}
    rel={props.rel}
    style={props.style}
  >
    {props.children}
  </Link>

export const table = (props: HTMLProps<'table'>) =>
  <TableContainer component={Paper} variant="outlined" css={css`width: fit-content; margin-top: 1em; margin-bottom: 1em;`}>
    <Table style={props.style}>
      {props.children}
    </Table>
  </TableContainer>

export const tbody = (props: HTMLProps<'tbody'>) =>
  <TableBody style={props.style}>
    {props.children}
  </TableBody>

export const tr = (props: HTMLProps<'tr'>) =>
  <TableRow style={props.style}>
    {props.children}
  </TableRow>

export const th = (props: HTMLProps<'th'>) =>
  <TableCell
    variant="head"
    colSpan={props.colSpan === 1 ? undefined : props.colSpan}
    rowSpan={props.rowSpan === 1 ? undefined : props.rowSpan}
    style={props.style}
    css={css`background-color: #f5f5f5;`}
  >
    {props.children}
  </TableCell>

export const td = (props: HTMLProps<'th'>) =>
  <TableCell
    colSpan={props.colSpan === 1 ? undefined : props.colSpan}
    rowSpan={props.rowSpan === 1 ? undefined : props.rowSpan}
    style={props.style}
    css={css`tr:last-child & { border-bottom: 0px none; }`}
  >
    {props.children}
  </TableCell>


export const img = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) =>
  <a href={props.src} target="_blank" rel="noopener">
    <img {...props} css={css`max-width: 100%; height: auto; &:hover { opacity: 0.7; }`} />
  </a>
