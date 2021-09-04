import Head from 'next/head';

import { Card, Main } from 'components';
import { Character } from 'interfaces/Characters';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';
import { Planet } from 'interfaces/Planets';
import { Starship } from 'interfaces/Starship';

interface HomeProps {
  highlightedCharacter: Character;
  highlightedCharacterPlanet: Planet;
  randomPlanet: Planet;
}

const Home: React.FC<HomeProps> = ({
  highlightedCharacter,
  highlightedCharacterPlanet,
  randomPlanet
}) => {
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

        <Card title="Pessoa em destaque do momento!">
          <span className="text-lg font-semibold">
            {highlightedCharacter.name}
          </span>
          <p>
            A pessoa em destaque hoje é{' '}
            {highlightedCharacter.gender === 'female' ? 'a' : 'o'} ilustre{' '}
            {highlightedCharacter.name}, nascido no ano{' '}
            {highlightedCharacter.birth_year} no planeta{' '}
            {highlightedCharacterPlanet?.name}.
          </p>
        </Card>

        <Card title="Recomendação de viagem">
          <span className="text-lg font-semibold">{randomPlanet.name}</span>
          <p>
            O planeta {randomPlanet.name} tem uma população de{' '}
            {randomPlanet.population} habitantes, um período de rotação de{' '}
            {randomPlanet.rotation_period} horas e um período orbital de{' '}
            {randomPlanet.orbital_period} horas.
          </p>
        </Card>
      </Layout>
    </div>
  );
};

export default Home;

const getRandomElementByEndpoint = async <T extends unknown>(
  endpoint: string
) => {
  const allElements = await api.get(endpoint);
  const elementsCount = allElements.data.count;
  const randomElementIndex = Math.floor(Math.random() * elementsCount + 1);

  const elementResponse = await api.get<T>(`${endpoint}/${randomElementIndex}`);

  return elementResponse.data;
};

export async function getServerSideProps() {
  const highlightedCharacter = await getRandomElementByEndpoint<Character>(
    '/people'
  );

  const planetResponse = await api.get<Planet>(
    highlightedCharacter.homeworld.split('/api')[1]
  );

  const highlightedCharacterPlanet = planetResponse.data;

  const randomPlanet = await getRandomElementByEndpoint<Planet>('/planets');

  const randomStarship = await getRandomElementByEndpoint<Starship>(
    '/starships'
  );

  return {
    props: {
      highlightedCharacter,
      highlightedCharacterPlanet,
      randomPlanet,
      randomStarship
    }
  };
}
