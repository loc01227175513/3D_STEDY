/**
 * Các hàm tiện ích để định dạng số
 */

/**
 * Chuyển đổi số thành phần trăm
 * @param number Số cần chuyển đổi
 * @returns Số đã được chuyển thành phần trăm
 */
export function formatToPercent(number: number): number {
  return Math.floor(number * 100);
}

/**
 * Định dạng số với dấu phân cách hàng nghìn
 * @param num Số cần định dạng
 * @param period Ký tự phân cách (mặc định là dấu phẩy ",")
 * @returns Chuỗi số đã định dạng
 */
export function formatNumberWithSeparator(num: number, period: string = ','): string {
  if (num === undefined) return '';
  const formatted = Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, `$&${period}`);

  if (num < 1e3) return num.toString();

  if (Number.isInteger(num)) {
    return formatted.slice(0, -3);
  }

  return formatted;
}

/**
 * Định dạng số thành dạng rút gọn (K, M)
 * @param num Số cần định dạng
 * @returns Chuỗi đã định dạng thành dạng rút gọn (ví dụ: 1.5K, 2.4M)
 */
export function formatNumberShort(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}
