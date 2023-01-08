import { Converter } from 'showdown'

export async function fetchMdAndConvertToHtml(path: string) {
  const response = await fetch(path)
  const md = await response.text()

  const converter = new Converter()
  const html = await converter.makeHtml(md)

  return html
}
