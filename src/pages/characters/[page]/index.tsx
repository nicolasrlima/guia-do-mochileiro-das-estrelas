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
  const { asPath, pathname, query, push } = useRouter();

  const [characters, setCharacters] = useState<Character[]>(allCharacters);
  const [loading, setLoading] = useState(false);

  const changePage = async (page: number) => {
    setLoading(true);

    push(
      {
        pathname,
        query: {
          ...query,
          page
        }
      },
      null,
      { shallow: true }
    );

    const { data } = await api.get<{ results: Character[]; count: number }>(
      `/people?page=${page}`
    );
    setCharacters(data.results);
    setLoading(false);
  };

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
              {characters.map((character) => (
                <div className="px-4 py-4 sm:px-6" key={character.url}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">
                      {character.name}
                    </span>
                    <Link href={`details/${character.url.split('people/')[1]}`}>
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
            onPageChange={(page) => changePage(page)}
            totalPages={Math.ceil(allCharactersCount / 10)}
          />
        </Paper>
      </Layout>
    </div>
  );
};

export default Characters;

export const getStaticPaths = async () => {
  const { data } = await api.get<{ count: number }>(`/people`);

  const pagesNumber = Math.ceil(data.count / 10);

  const paths = [...Array(pagesNumber)].map((_, i) => ({
    params: {
      page: `${i + 1}`
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({
  params
}: {
  params: { page: string };
}) => {
  const { page } = params;
  const { data } = await api.get<{ results: Character[]; count: number }>(
    `/people?page=${page}`
  );
  const allCharacters = data.results;
  const allCharactersCount = data.count;

  return {
    props: {
      allCharacters,
      allCharactersCount
    }
  };
};
