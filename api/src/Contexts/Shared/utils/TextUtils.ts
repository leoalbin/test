import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
const { window } = new JSDOM('<!DOCTYPE html>')
const domPurify = DOMPurify(window)

export class TextUtils {
  public static sanitize(text: string): string {
    return domPurify.sanitize(text)
  }
}
