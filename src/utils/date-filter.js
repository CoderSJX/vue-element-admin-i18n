import moment from 'moment'

//定义一个全局过滤器实现日期格式化
export const getMoment = (value) => {
  // 使用moment.js这个日期格式化类库实现日期的格式化功能
  return moment(value).fromNow();
}
