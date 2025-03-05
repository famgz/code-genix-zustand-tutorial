import { Button } from '@/components/ui/button';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface Props {
  productId: string;
}

export default function ChangeQuantityButtons({ productId }: Props) {
  const { getProductById, decrementQuantity, incrementQuantity } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decrementQuantity: state.decrementQuantity,
      incrementQuantity: state.incrementQuantity,
    }))
  );
  const product = getProductById(productId);

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
