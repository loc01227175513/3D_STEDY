import { ProductEntity, KitchenTemplateEntity } from '@/types/model';
import { emitter, THREE_EVENTS } from '@/utils/events';

export const useModelUpdate = () => {
  const updateTemplateProducts = (
    template: KitchenTemplateEntity,
    product: ProductEntity,
    productToReplace: ProductEntity | null,
    meshNumber: string
  ) => {
    const updatedProducts = template.products.map((p: ProductEntity) => {
      if (productToReplace ? p.id === productToReplace.id : p.position === meshNumber) {
        const updatedProduct = {
          ...product,
          id: productToReplace ? productToReplace.id : product.id,
          position: p.position || meshNumber,
          price: typeof product.price === 'number' ? product.price : 0,
        };
        return updatedProduct;
      }
      return {
        ...p,
        price: typeof p.price === 'number' ? p.price : 0,
      };
    });

    const totalPrice = updatedProducts.reduce((sum, p) => {
      return sum + (typeof p.price === 'number' ? p.price : 0);
    }, 0);

    template.products = [...updatedProducts];

    return { updatedProducts, totalPrice };
  };

  const emitTemplateUpdate = (
    updatedProducts: ProductEntity[],
    totalPrice: number,
    productToReplace: ProductEntity | null,
    newProduct: ProductEntity,
    meshNumber: string
  ) => {
    emitter.emit(THREE_EVENTS.onTemplateDidLoad, {
      products: updatedProducts,
      totalPrice: totalPrice,
      isReplacement: true,
      replacedProduct: {
        old: productToReplace || {
          ...newProduct,
          position: meshNumber,
          price: typeof newProduct.price === 'number' ? newProduct.price : 0,
        },
        new: {
          ...newProduct,
          position: meshNumber,
          price: typeof newProduct.price === 'number' ? newProduct.price : 0,
        },
        position: meshNumber,
      },
    });
  };

  return {
    updateTemplateProducts,
    emitTemplateUpdate
  };
}; 