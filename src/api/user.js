import request from '@/utils/request'

/**
 * 用户登录
 * @param{userId} 账号
 * @param{passWd} 密码
*/
export function login(data={}){
    return request({
        url:'/userLoginLowCode',
        method:'post',
        data,
    })
}