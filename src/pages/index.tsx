import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/header';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  // @ts-ignore
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/signin');
    }
  }, [user, isLoading]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
