import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PagesController, Paper } from 'components';
import { Planet } from 'interfaces/Planets';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';

interface PlanetsProps {
  allPlanets: Planet[];
  allPlanetsCount: number;
}

const Planets = ({ allPlanets, allPlanetsCount }: PlanetsProps) => {
  const { asPath, pathname, query, push } = useRouter();

  const [planets, setPlanets] = useState<Planet[]>(allPlanets);
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

    const { data } = await api.get<{ results: Planet[]; count: number }>(
      `/planets?page=${page}`
    );
    setPlanets(data.results);
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
          <h1 className="text-2xl font-semibold">Planetas</h1>
          <div className="border border-solid" />
          {!loading ? (
            <div className="divide-y">
              {planets.map((planet) => (
                <div className="px-4 py-4 sm:px-6" key={planet.url}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{planet.name}</span>
                    <Link href={`details/${planet.url.split('planets/')[1]}`}>
                      <span className="px-2 text-sm leading-5 text-indigo-600 font-semibold cursor-pointer">
                        Ver detalhes
                      </span>
                    </Link>
                  </div>
                  <span>População: {planet?.population}</span>
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
            totalPages={Math.ceil(allPlanetsCount / 10)}
          />
        </Paper>
      </Layout>
    </div>
  );
};

export default Planets;

export const getStaticPaths = async () => {
  const { data } = await api.get<{ count: number }>(`/planets`);

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
  const { data } = await api.get<{ results: Planet[]; count: number }>(
    `/planets?page=${page}`
  );
  const allPlanets = data.results;
  const allPlanetsCount = data.count;

  return {
    props: {
      allPlanets,
      allPlanetsCount
    }
  };
};
