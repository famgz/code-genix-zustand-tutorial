import Cart from '@/components/cart';
import ChangeQuantityButtons from '@/components/change-quantity-buttons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PRODUCTS_DATA } from '@/lib/mock-data';
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';

export default function App() {
  // const store = useStore();

  /* const { age, fullName } = useStore((state) => ({
    age: state.age,
    fullName: state.fullName,
  }));
  */

  // most performant usage
  const { addProduct, cartProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
    }))
  );

  // also performant, avoid re-renders, but for only one variable
  // const address = useStore((state) => state.address);

  return (
    <main className='space-y-2 dark min-h-screen bg-background max-w-sm mx-auto mt-2'>
      <Cart />
      <h1 className='text-2xl'>Products:</h1>

      <div className='space-y-2'>
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>{product.price}</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQuantityButtons productId={product.id} />
              ) : (
                <Button onClick={() => addProduct(product)}>Add to Cart</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
