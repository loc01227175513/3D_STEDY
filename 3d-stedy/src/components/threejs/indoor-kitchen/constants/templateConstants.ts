import * as THREE from 'three';

export const ISLAND_Z = 2.8;

export const MODEL_CATEGORIES = {
  '001': 'kitchen-rangehood',
  '016': 'island-cabinet',
  '018': 'island-cabinet',
  '023': 'island-bar',
  '024': 'island-cabinet',
  '025': ['kitchen-oven', 'kitchen-cabinet'],
  '026': ['kitchen-oven', 'kitchen-cabinet'],
} as const;

export const determineCategory = (componentName: string): string => {
  const name = componentName.toLowerCase();

  // Xử lý các trường hợp đặc biệt trước
  if (name.includes('cabinet_opening')) return 'cabinet_model';
  if (name.includes('fridge')) return 'fridge_model';
  if (name.includes('cabinet_four')) return 'cabinet_model';
  if (name.includes('cabinet_microwave')) return 'cabinet_model';
  if (name.includes('cabinet')) return 'cabinet_model';
  if (name.includes('cabinet')) return 'cabinet_model';
  if (name.includes('bar')) return 'kitchen-fridgecabinet';
  if (name.includes('oven')) return 'kitchen-oven';
  // Mặc định trả về cabinet_model nếu không match với category nào
  if (name.includes('dishwasher')) return 'kitchen-oven';
  return '';
};
