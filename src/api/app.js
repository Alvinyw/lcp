import request from '@/utils/request'

/**
 * 登录
 * @param { templateId } 模板编号
 */
 export function userLoginLowCode(data = {}) {
  return request({
    url: '/userLoginLowCode',
    method: 'post',
    data,
  })
}

/**
 * 模版明细查询
 * @param { templateId } 模板编号
 */
export function lowCodeTemplateInfoTableSelectById(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoTableSelectById',
    method: 'post',
    data,
  })
}

/**
 * 查询所有模版
 * @param { pageId } 归属页面
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function lowCodeTemplateInfoListByPageId(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoListByPageId',
    method: 'post',
    data,
  })
}

/**
 * 模版新增
 * @param { templateName } 模板名称
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pageId } 归属页面
 * @param { remark } 备注
 * @param { templateContext } 模板内容
 */
 export function lowCodeTemplateInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoTableInsert',
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