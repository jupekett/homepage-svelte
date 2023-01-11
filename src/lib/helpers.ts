import { Converter } from 'showdown'

export function mdToHtml(md: string): string {
  const converter = new Converter()
  const html = converter.makeHtml(md)
  return html
}
