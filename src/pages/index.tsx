import Head from 'next/head';

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

      <main>
        <h1 className="text-6xl font-bold">
          Welcome to Guia do mochileiro das estrelas!
        </h1>
      </main>
    </div>
  );
};

export default Home;
