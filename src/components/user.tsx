import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStore } from '@/store/store';
import { UserIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function User() {
  const { address, fullName, setAddress, userName, fetchUser } = useStore(
    useShallow((state) => ({
      address: state.address,
      fullName: state.fullName,
      userName: state.userName,
      setAddress: state.setAddress,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }
    fetchData();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'secondary'} size={'icon'}>
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='overflow-y-auto space-y-2 w-96'>
        <div className='flex gap-2 items-center'>
          <p>{fullName}</p>
          <p className='text-sm'>{userName}</p>
        </div>
        <Label htmlFor='address'>Your Address:</Label>
        <Input
          id='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
