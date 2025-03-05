import ChangeQuantityButtons from '@/components/change-quantity-buttons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStore } from '@/store/store';
import { CircleXIcon, ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';

export default function Cart() {
  const { reset, products, removeProduct, total } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'secondary'} size={'icon'}>
          <ShoppingCartIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='overflow-y-auto space-y-2 w-96'>
        <div className='flex gap-2 text-lg items-center'>
          <h1>Cart:</h1>
          <Button onClick={reset} variant={'destructive'} size={'icon'}>
            <CircleXIcon />
          </Button>
        </div>
        <div className='space-y-2'>
          {products.map((product) => (
            <Card key={product.id} className='flex flex-col'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between gap-2 text-xl'>
                  {product.title}
                  <Button
                    onClick={() => removeProduct(product.id)}
                    size={'icon'}
                    variant={'destructive'}>
                    <Trash2Icon />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>$ {product.price}</CardContent>
              <CardFooter>
                <ChangeQuantityButtons productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: $ {total}</p>
      </PopoverContent>
    </Popover>
  );
}
