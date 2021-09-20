import { GetStaticPaths, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Paper } from 'components';
import { Character } from 'interfaces/Characters';
import { Planet } from 'interfaces/Planets';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';

interface CharacterDetailsProps {
  character: Character;
  homeWorld: Planet;
}

const CharacterDetails = ({ character, homeWorld }: CharacterDetailsProps) => {
  const { back } = useRouter();

  return (
    <div>
      <Head>
        <title>Guia Estelar | {character?.name}</title>
        <meta name="description" content={`Tudo sobre ${character?.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-2xl font-semibold">
          {' '}
          <span
            className="pr-2 text-sm text-gray-600 font-semibold cursor-pointer"
            onClick={back}
          >
            Pessoas /
          </span>
          {character?.name}
        </h1>
        <div className="border border-solid mt-4 mb-4" />
        <section className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-4">
          <Paper className="flex flex-col p-4 gap-y-4">
            <h2 className="text-xl font-semibold">Dados</h2>
            <ul>
              <li>
                <strong className="font-semibold">Nome:</strong>{' '}
                {character?.name}
              </li>
              <li>
                <strong className="font-semibold">Altura:</strong>{' '}
                {character?.height}cm
              </li>
              <li>
                <strong className="font-semibold">Massa:</strong>{' '}
                {character?.mass}kg
              </li>
              <li>
                <strong className="font-semibold">Ano de nascimento:</strong>{' '}
                {character?.birth_year}
              </li>
              <li>
                <strong className="font-semibold">Gênero:</strong>{' '}
                {character?.gender.charAt(0).toUpperCase()}
              </li>
            </ul>
          </Paper>
          <Paper className="flex flex-col p-4 gap-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Planeta natal</h2>
              <Link href={`teste`}>
                <span className="px-2 text-sm leading-5 text-indigo-600 font-semibold cursor-pointer">
                  Detalhes
                </span>
              </Link>
            </div>
            <ul>
              <li>
                <strong className="font-semibold">Nome:</strong>{' '}
                {homeWorld?.name}
              </li>
              <li>
                <strong className="font-semibold">População:</strong>{' '}
                {homeWorld?.population}
              </li>
              <li>
                <strong className="font-semibold">Diâmetro:</strong>{' '}
                {homeWorld?.diameter}km
              </li>
              <li>
                <strong className="font-semibold">Período orbital:</strong>{' '}
                {homeWorld?.orbital_period} dias
              </li>
              <li>
                <strong className="font-semibold">Período de rotação:</strong>{' '}
                {homeWorld?.rotation_period} dias
              </li>
              <li>
                <strong className="font-semibold">Gravidade:</strong>{' '}
                {homeWorld?.gravity} Gs
              </li>
              <li>
                <strong className="font-semibold">
                  Superfície coberta por água:
                </strong>{' '}
                {homeWorld?.surface_water}%
              </li>
            </ul>
          </Paper>
        </section>
      </Layout>
    </div>
  );
};

export default CharacterDetails;

export const getStaticPaths = async () => {
  const { data } = await api.get<{ count: number }>(`/people`);

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
}): Promise<GetStaticPropsResult<CharacterDetailsProps>> => {
  const { id } = params;
  const { data: character } = await api.get<Character>(`/people/${id}`);
  const { data: homeWorld } = await api.get<Planet>(
    `${character.homeworld.split('/api')[1]}`
  );

  return {
    props: {
      character,
      homeWorld
    }
  };
};
