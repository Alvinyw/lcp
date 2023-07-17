const Language = 'language'
const productInfo = 'productInfo'

// 当前语言
export function getLanguage() {
  return sessionStorage.getItem(Language)
}
export function setLanguage(lang) {
  return sessionStorage.setItem(Language, lang)
}

// 产品信息 logo， color
export function getProductInfo() {
  return sessionStorage.getItem(productInfo) ? JSON.parse(sessionStorage.getItem(productInfo)) : {}
}
export function setProductInfo(val) {
  return sessionStorage.setItem(productInfo, JSON.stringify(val))
}
export function removeProductInfo() {
  sessionStorage.removeItem(productInfo)
}


export function clearSessionData() {
  sessionStorage.clear()
}