import { ProductEntity, KitchenTemplateEntity } from '@/types/model';
import { determineCategory } from '../constants/templateConstants';

export const useProductManager = () => {
  const findProductToReplace = (
    template: KitchenTemplateEntity,
    category: string
  ): ProductEntity | null => {
    const foundProduct = template.products.find(
      (p: ProductEntity) =>
        p.categoryId === category?.replace('_model', '') ||
        p.categoryId === category
    );
    return foundProduct || null;
  };

  const getCategoryFromComponent = (
    meshNumber: string | null,
    componentName: string,
    getCategory: (meshNumber: string) => string | undefined
  ): string | undefined => {
    return meshNumber ? 
      getCategory(meshNumber) : 
      determineCategory(componentName);
  };

  const validateProduct = (
    product: ProductEntity | null,
    path: string | undefined
  ): boolean => {
    return !!(product && path);
  };

  return {
    findProductToReplace,
    getCategoryFromComponent,
    validateProduct
  };
}; 