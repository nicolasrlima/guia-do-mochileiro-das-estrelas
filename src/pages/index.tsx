import Head from 'next/head';

import { Main } from 'components';
import Sidebar from 'parts/Sidebar/Sidebar';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>O guia do mochileiro das estrelas</title>
        <meta
          name="description"
          content="Seu guia de bolso para o universo de Star Wars"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Sidebar />
      </Main>
    </div>
  );
};

export default Home;
