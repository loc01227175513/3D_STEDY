import moment from 'moment';

/**
 * Các hàm tiện ích định dạng ngày tháng
 */

/**
 * Định dạng ngày tháng theo kiểu tương đối (Hôm nay, Hôm qua, Ngày mai, hoặc ngày cụ thể)
 * @param date Đối tượng Date cần định dạng
 * @returns Chuỗi đã định dạng
 */
export const formatDateRelative = (date: Date): string => {
  return moment(date).calendar(null, {
    sameDay: '[Today at] h:mm A', // "Today at 10:25 AM"
    nextDay: '[Tomorrow at] h:mm A', // "Tomorrow at 10:25 AM"
    lastDay: '[Yesterday at] h:mm A', // "Yesterday at 10:25 AM"
    sameElse: 'MMMM D, YYYY [at] h:mm A', // "February 28, 2024 at 10:25 AM"
  });
};

/**
 * Định dạng ngày tháng theo kiểu DD/MM/YYYY
 * @param date Đối tượng Date cần định dạng
 * @returns Chuỗi đã định dạng dạng DD/MM/YYYY
 */
export const formatDateDDMMYYYY = (date: Date): string => {
  return moment(date).format('DD/MM/YYYY');
};

/**
 * Định dạng ngày tháng theo kiểu DD/MM/YYYY HH:mm:ss
 * @param date Đối tượng Date cần định dạng
 * @returns Chuỗi đã định dạng dạng DD/MM/YYYY HH:mm:ss
 */
export const formatDateDDMMYYYYHHmmss = (date: Date): string => {
  return moment(date).format('DD/MM/YYYY HH:mm:ss');
};

/**
 * Chuyển đổi chuỗi ngày tháng thành đối tượng Date
 * @param dateString Chuỗi ngày tháng cần chuyển đổi
 * @param format Định dạng của chuỗi (mặc định là DD/MM/YYYY)
 * @returns Đối tượng Date
 */
export const parseDate = (dateString: string, format: string = 'DD/MM/YYYY'): Date => {
  return moment(dateString, format).toDate();
};
