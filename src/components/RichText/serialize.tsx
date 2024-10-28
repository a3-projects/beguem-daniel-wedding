import React, { Fragment, JSX } from 'react'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

import {
  IS_ALIGN_CENTER,
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import { Link } from '@/ui/components/Link'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { Media } from '@/payload-types'
import { cn } from '@/ui/utils/utils'
import { ElementFormatType } from 'lexical'

export type NodeTypes = DefaultNodeTypes

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return text
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''
        let className

        const getFormatClass = (format: ElementFormatType) => {
          switch (format) {
            case 'center':
              return 'text-center'
            case 'left':
              return 'text-left'
            case 'right':
              return 'text-right'
            default:
              return ''
          }
        }

        switch (node.type) {
          case 'linebreak': {
            return <br className="col-start-2" key={index} />
          }
          case 'paragraph': {
            node.format

            return (
              <p className={cn(getFormatClass(node.format))} key={index}>
                {serializedChildren}
              </p>
            )
          }
          case 'heading': {
            const Tag = node?.tag
            return (
              <Tag className={cn(getFormatClass(node.format))} key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'list': {
            const Tag = node?.tag
            return (
              <Tag className="list col-start-2" key={index}>
                {serializedChildren}
              </Tag>
            )
          }
          case 'horizontalrule':
            return <hr />
          case 'upload': {
            return <ImageMedia resource={node.value as Media} />
          }
          case 'listitem': {
            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? 'true' : 'false'}
                  className={` ${node.checked ? '' : ''}`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          }
          case 'quote': {
            return (
              <blockquote className={cn(getFormatClass(node.format))} key={index}>
                {serializedChildren}
              </blockquote>
            )
          }
          case 'link': {
            const fields = node.fields

            return (
              <Link
                key={index}
                target={Boolean(fields?.newTab) ? '_blank' : undefined}
                type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                href={fields.url}
                className={cn('col-start-2', getFormatClass(node.format))}
              >
                {serializedChildren}
              </Link>
            )
          }

          default:
            return null
        }
      })}
    </Fragment>
  )
}
