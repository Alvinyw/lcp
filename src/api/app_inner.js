import request from '@/utils/request'

/**
 * 模版明细查询
 * @param { templateId } 参数1
 */
export function perTemplateQry(data = {}) {
  return request({
    url: '/perTemplateQry.do',
    method: 'post',
    data,
  })
}

/**
 * 查询所有模版
 */
 export function perTemplateQryAll(data = {}) {
  return request({
    url: '/perTemplateQryAll.do',
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
    url: '/perTemplateAdd.do',
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
    url: '/perTemplateDel.do',
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
    url: '/perTemplateUpd.do',
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
    url: '/perPageTemplateMappingUse.do',
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
    url: '/perPageTemplateMappingQry.do',
    method: 'post',
    data,
  })
}