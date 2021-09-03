import Head from 'next/head';

import { Main } from 'components';
import Layout from 'parts/Layout/Layout';

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

      <Layout>CONTENT</Layout>
    </div>
  );
};

export default Home;
