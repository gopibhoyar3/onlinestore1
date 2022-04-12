import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/api';
import Link from 'next/link';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    },
    [username, password]
  );

  if (currentUser) {
    router.replace('/');
    return null;
  }

  return (<>
    <Announcement />
      <Navbar />
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover "
    >
      <div className="p-[20px] w-3/4 sm:w-1/4 bg-white ">
        <h1 className="text-[24px] font-light ">SIGN IN</h1>
        <form action="" className="flex flex-col ">
          <input
            type="text"
            className="flex-1 min-w-2/5 my-[10px] p-[10px] outline-none
            border "
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            className="flex-1 min-w-2/5 my-[10px] p-[10px] outline-none
            border "
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={handleLogin}
            disabled={isFetching}
            className="w-2/5 py-[15px] px-[20px] mb-[10px] bg-[teal] text-white cursor-pointer
            disabled:text-green-600 disabled:cursor-not-allowed "
          >
            LOGIN
          </button>
          {error && (
            <span className="text-red-500 ">Something Went Wrong...</span>
          )}
          <a href="" className="my-[5px] text-[12px] underline cursor-pointer ">
            FORGOT PASSWORD?
          </a>
          <Link href="/register">
            <a className="my-[5px] text-[12px] underline cursor-pointer ">
              CREATE A NEW ACCOUNT
            </a>
          </Link>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
