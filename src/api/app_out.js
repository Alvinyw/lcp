import request from '@/utils/request'

/**
 * 模版明细查询
 * @param { templateId } 参数1
 */
export function perTemplateQry(data = {}) {
  return request({
    url: '/prmTemplateInfoTableSelectById',
    method: 'post',
    data,
  })
}

/**
 * 查询所有模版
 */
 export function perTemplateQryAll(data = {}) {
  return request({
    url: '/prmTemplateInfoTableSelectAll',
    method: 'post',
    data,
  })
}

/**
 * 模版新增
 * @param { templateId } 参数1
 * @param { templateName } 参数1
 * @param { templateContext } 参数1
 */
 export function perTemplateAdd(data = {}) {
  return request({
    url: '/prmTemplateInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 模版删除
 * @param { templateId } 参数1
 */
 export function perTemplateDel(data = {}) {
  return request({
    url: '/prmTemplateInfoTableDeleteById',
    method: 'post',
    data,
  })
}

/**
 * 模版更新
 * @param { templateId } 参数1
 * @param { templateName } 参数1
 * @param { templateContext } 参数1
 */
 export function perTemplateUpd(data = {}) {
  return request({
    url: '/prmTemplateInfoTableUpdateById',
    method: 'post',
    data,
  })
}


/**
 * 应用模版至页面
 * @param { templateId } 参数1
 * @param { pageId } 参数1
 * @param { remark } 参数1
 */
 export function perPageTemplateMappingUse(data = {}) {
  return request({
    url: '/prmPageTemplateMappingTableUse',
    method: 'post',
    data,
  })
}

/**
 * 页面模版查询
 * @param { pageId } 参数1
 */
 export function perPageTemplateMappingQry(data = {}) {
  return request({
    url: '/prmPageTemplateMappingTableSelectById',
    method: 'post',
    data,
  })
}