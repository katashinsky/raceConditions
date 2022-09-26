import { binarySemaphore } from '@base/utils/binarySemaphore';

export function binarySemaphoreDecorator() {
  return (target: any, method: string, descriptor: PropertyDescriptor) => {
    async function handler() {
      await binarySemaphore.setInitialValue();
      await binarySemaphore.enter();

      const result = await descriptor.value.call(this, ...arguments);

      await binarySemaphore.leave();

      return result;
    }

    const newDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        return handler.bind(this);
      },
    };

    return newDescriptor;
  };
}
