import Head from 'next/head';

import { Button, Card, Main } from 'components';
import { Character } from 'interfaces/Characters';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';
import { Planet } from 'interfaces/Planets';
import { Starship } from 'interfaces/Starship';

interface HomeProps {
  highlightedCharacter: Character;
  highlightedCharacterPlanet: Planet;
  randomPlanet: Planet;
  randomStarship: Starship;
}

const Home: React.FC<HomeProps> = ({
  highlightedCharacter,
  highlightedCharacterPlanet,
  randomPlanet,
  randomStarship
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
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <Card className="col-start-1" title="Bem vindo ao Guia Estelar!">
            Bem vindo ao <strong>Guia Estelar</strong>, o seu guia de bolso para
            o universo de Star Wars. Aqui você irá encontrar informações sobre
            os personagens, planetas e naves do universo. Além de poder comprar
            sua nave graças ao nosso patrocinador, <strong>R2 Naves</strong>.
          </Card>

          <Card className="col-start-1" title="Pessoa em destaque do momento!">
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

          <Card className="col-start-1" title="Recomendação de viagem">
            <span className="text-lg font-semibold">{randomPlanet.name}</span>
            <p>
              O planeta {randomPlanet.name} tem uma população de{' '}
              {randomPlanet.population} habitantes, um período de rotação de{' '}
              {randomPlanet.rotation_period} horas e um período orbital de{' '}
              {randomPlanet.orbital_period} horas.
            </p>
          </Card>

          <Card
            className="row-start-1 row-end-3 col-start-2"
            title="Compre a sua nave!"
          >
            <span className="text-lg font-semibold">{randomStarship.name}</span>
            <p>
              A nave {randomStarship.name}, modelo {randomStarship.model} é a
              nave ideal para você, ela possui {randomStarship.length} metros de
              comprimento, espaço para {randomStarship.cargo_capacity} quilos de
              carga, {randomStarship.passengers} passageiros e uma avaliação de
              ⭐{randomStarship.hyperdrive_rating} no Hyperdrive.
            </p>
            <p>
              E custando a pechincha de{' '}
              <strong>{randomStarship.cost_in_credits}</strong> créditos, clique
              no botão abaixo para comprar!
            </p>
            <div className="flex mt-4 justify-around">
              <Button variant="primary">Ver detalhes</Button>
            </div>
          </Card>
        </div>
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
