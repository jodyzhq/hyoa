require('es6-promise').polyfill()
import axios from 'axios'
import { getCookie, signOut } from '../util/authUtil'
import baseConfig from '../../../config'
import reqURL from '../constants/requestURL'

const { NOTICE_LIST_URL, NOTICE_DETAILS_URL } = reqURL


/**
 * 使用axios调用后台接口，所有请求的方法暂时都放这里
 * @autor zhanghq
 */

export default {
    /**
   * 查询所有公告，暂时不分页
   * @param {}
   * @returns promise对象，调用then方法后，获取查询到的数据
   */
  getNoticeList: function(data) {
     return axios.get(NOTICE_LIST_URL, data)
  },


  /**
   * 查询公告内容
   * @param {}
   * @returns promise对象，调用then方法后，获取查询到的数据
   */
  getNoticeDetails: function(id){
    return axios.get(NOTICE_LIST_URL + '/' + id)
  }

}