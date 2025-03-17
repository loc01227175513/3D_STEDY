import ApiService from '../axios/apiService';
import { PATHS } from '../axios/apiConfig';
import { KitchenTemplateEntity } from '@/types/model';

export async function getTemplate(
  id?: string
): Promise<KitchenTemplateEntity | undefined> {
  try {
    const response = await ApiService.get<{
      data: KitchenTemplateEntity | undefined;
    }>(`${PATHS.kitchen_template}/${id}`);
    return response.data.data;
  } catch (error) {
    // Error handling without console.error
    return null;
  }
}
