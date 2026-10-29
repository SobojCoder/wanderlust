import { auth } from './auth';
import { headers } from 'next/headers';

const getTokenFromSever = async() => {
   const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  const token = jwtToken?.token;

  return token
};

export default getTokenFromSever;