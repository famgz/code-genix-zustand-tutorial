import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  productId: string;
}

export default function ChangeQuantityButtons({ productId }: Props) {
  const { getProductById, decrementQuantity, incrementQuantity, setTotal } =
    useStore(
      useShallow((state) => ({
        getProductById: state.getProductById,
        decrementQuantity: state.decrementQuantity,
        incrementQuantity: state.incrementQuantity,
        setTotal: state.setTotal,
      }))
    );
  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.quantity, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className='flex gap-2 items-center'>
          <Button onClick={() => decrementQuantity(productId)} size={'icon'}>
            <MinusIcon />
          </Button>

          {product.quantity}

          <Button onClick={() => incrementQuantity(productId)} size={'icon'}>
            <PlusIcon />
          </Button>
        </div>
      )}
    </>
  );
}
