export default function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === 'undefined') return

  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'

  let nonce
  if (typeof window.__webpack_nonce__ !== 'undefined') nonce = window.__webpack_nonce__
	if (typeof window.nonce !== 'undefined') nonce = window.nonce

  if (nonce) style.setAttribute('nonce', nonce)

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild)
    } else {
      head.appendChild(style)
    }
  } else {
    head.appendChild(style)
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}
