import Head from 'next/head';

import { Card, Main } from 'components';
import Layout from 'parts/Layout/Layout';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Guia Estelar</title>
        <meta
          name="description"
          content="Seu guia de bolso para o universo de Star Wars"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Card title="Bem vindo ao Guia Estelar!">
          Bem vindo ao <strong>Guia Estelar</strong>, o seu guia de bolso para o
          universo de Star Wars. Aqui você irá encontrar informações sobre os
          personagens, planetas e naves do universo. Além de poder comprar sua
          nave graças ao nosso patrocinador, <strong>R2 Naves</strong>.
        </Card>
      </Layout>
    </div>
  );
};

export default Home;
