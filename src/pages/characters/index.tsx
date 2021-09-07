import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PagesController, Paper } from 'components';
import { Character } from 'interfaces/Characters';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';

interface CharacterProps {
  allCharacters: Character[];
  allCharactersCount: number;
}

const Characters = ({ allCharacters, allCharactersCount }: CharacterProps) => {
  const { pathname, query, push, events } = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== pathname && setLoading(true);
    const handleComplete = () => setLoading(false);
    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleComplete);
      events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <div>
      <Head>
        <title>Guia Estelar | Personagens</title>
        <meta name="description" content="Personagens do universo Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Paper className="flex flex-col p-4 gap-y-4">
          <h1 className="text-2xl font-semibold">Pessoas</h1>
          <div className="border border-solid" />
          {!loading ? (
            <div className="divide-y">
              {allCharacters.map((character) => (
                <div className="px-4 py-4 sm:px-6" key={character.url}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">
                      {character.name}
                    </span>
                    <Link
                      href={`/characters/${character.url.split('people/')[1]}`}
                    >
                      <span className="px-2 text-sm leading-5 text-indigo-600 font-semibold cursor-pointer">
                        Ver detalhes
                      </span>
                    </Link>
                  </div>
                  <span>
                    Nascimento:{' '}
                    {character.birth_year !== 'unknown'
                      ? character.birth_year
                      : 'Desconhecido'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-pulse divide-y overflow-hidden">
              {[...Array(10)].map((e, i) => (
                <div
                  className="mt-8 rounded-md bg-gray-300 h-11 w-full"
                  key={i}
                />
              ))}
            </div>
          )}

          <PagesController
            currentPage={query?.page ? +query.page : 1}
            onPageChange={(page) => {
              push({
                pathname: '/characters',
                query: { page }
              });
            }}
            totalPages={Math.ceil(allCharactersCount / 10)}
          />
        </Paper>
      </Layout>
    </div>
  );
};

export default Characters;

export async function getServerSideProps({ query }) {
  const allCharactersResponse = await api.get(
    `/people/${query?.page ? `?page=${query.page}` : ''}`
  );
  const allCharacters = allCharactersResponse.data.results;
  const allCharactersCount = allCharactersResponse.data.count;

  return {
    props: {
      allCharacters,
      allCharactersCount
    }
  };
}
