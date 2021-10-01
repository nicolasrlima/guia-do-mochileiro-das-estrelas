import { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Paper } from 'components';
import { Planet } from 'interfaces/Planets';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';

interface PlanetDetailsProps {
  planet: Planet;
}

const PlanetDetails = ({ planet }: PlanetDetailsProps) => {
  const { back } = useRouter();

  return (
    <div>
      <Head>
        <title>Guia Estelar | {planet?.name}</title>
        <meta name="description" content={`Tudo sobre ${planet?.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-2xl font-semibold">
          {' '}
          <span
            className="pr-2 text-sm text-gray-600 font-semibold cursor-pointer"
            onClick={back}
          >
            Planetas /
          </span>
          {planet?.name}
        </h1>
        <div className="border border-solid mt-4 mb-4" />
        <section className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-4">
          <Paper className="flex flex-col p-4 gap-y-4">
            <h2 className="text-xl font-semibold">Dados</h2>
            <ul>
              <li>
                <strong className="font-semibold">Nome:</strong> {planet?.name}
              </li>
              <li>
                <strong className="font-semibold">População:</strong>{' '}
                {planet?.population}
              </li>
              <li>
                <strong className="font-semibold">Diâmetro:</strong>{' '}
                {planet?.diameter}km
              </li>
              <li>
                <strong className="font-semibold">Período orbital:</strong>{' '}
                {planet?.orbital_period} dias
              </li>
              <li>
                <strong className="font-semibold">Período de rotação:</strong>{' '}
                {planet?.rotation_period} dias
              </li>
              <li>
                <strong className="font-semibold">Gravidade:</strong>{' '}
                {planet?.gravity} Gs
              </li>
              <li>
                <strong className="font-semibold">
                  Superfície coberta por água:
                </strong>{' '}
                {planet?.surface_water}%
              </li>
            </ul>
          </Paper>
          <Paper className="flex flex-col p-4 gap-y-4">
            <h2 className="text-xl font-semibold">
              Residentes de {planet?.name}
            </h2>
            <ul>
              {planet?.residents.map((resident) => (
                <li key={resident}>{resident}</li>
              ))}
            </ul>
          </Paper>
        </section>
      </Layout>
    </div>
  );
};

export default PlanetDetails;

export const getStaticPaths = async () => {
  const { data } = await api.get<{ count: number }>(`/planets`);

  const paths = [...Array(data.count)].map((_, i) => ({
    params: {
      id: `${i + 1}`
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
  params: { id: string };
}): Promise<GetStaticPropsResult<PlanetDetailsProps>> => {
  const { id } = params;
  const { data: planet } = await api.get<Planet>(`/planets/${id}`);

  const residents = await Promise.all(
    planet.residents.map((resident) => api.get<string>(resident))
  );

  return {
    props: {
      planet
    }
  };
};
