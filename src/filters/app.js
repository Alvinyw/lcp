
const appFilters = {

  // 首字母大写
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },

}

export default appFilters