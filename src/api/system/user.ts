import { defHttp } from "/@/utils/http/axios";


enum API {
  getOrgData = '/m1/1630792-0-default/getUserList',
}

/**
 * 用户查询查询
 * @param params 查询组织机构条件参数
 */
export const getUserDataMethod1 = (params: any) => {
  return defHttp.get({ url: API.getOrgData, params: params });
};

export const getUserDataMethod: any[] = (() => {
  const arr: any[] = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      name: `${index} John Brown`,
      age: `${index + 10}`,
      no: `${index}98678`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();
