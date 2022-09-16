import { defHttp } from "/@/utils/http/axios";


enum API {
  getOrgData = '',
  modifyOrgData = '',
  addOrgData = '',
  removeData = '/{id}',
}

/**
 * 组织机构查询
 * @param params 查询组织机构条件参数
 */
export const getOrgDataMethod = (params: any) => {
  return defHttp.get({ url: API.getOrgData, params: params });
};

/**
 * 组织机构修改
 * @param params 修改组织机构参数
 */
export const modifyOrgDataMethod = (params: any) => {
  return defHttp.post({ url: API.getOrgData, params: params });
};

/**
 * 组织机构添加
 * @param params 添加组织机构参数
 */
export const addOrgDataMethod = (params: any) => {
  return defHttp.post({ url: API.getOrgData, params: params });
};

/**
 * 组织机构删除
 * @param params 删除组织机构参数
 */
export const removieOrgDataMethod = (params: any) => {
  return defHttp.get({ url: API.getOrgData.replace('id', params) });
};