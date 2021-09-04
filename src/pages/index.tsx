import Head from 'next/head';

import { Card, Main } from 'components';
import { Character } from 'interfaces/Characters';
import Layout from 'parts/Layout/Layout';
import api from 'services/api';
import { Planet } from 'interfaces/Planets';

interface HomeProps {
  highlightedCharacter: Character;
  planet: Planet;
}

const Home: React.FC<HomeProps> = ({ highlightedCharacter, planet }) => {
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
            {highlightedCharacter.birth_year} no planeta {planet?.name}.
          </p>
        </Card>
      </Layout>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const allCharacters = await api.get('/people');
  const characterCount = allCharacters.data.count;
  const randomCharacterIndex = Math.floor(Math.random() * characterCount + 1);

  const characterResponse = await api.get<Character>(
    `/people/${randomCharacterIndex}`
  );
  const highlightedCharacter = characterResponse.data;

  const planetResponse = await api.get<Planet>(
    highlightedCharacter.homeworld.split('/api')[1]
  );
  const planet = planetResponse.data;

  return {
    props: {
      highlightedCharacter,
      planet
    }
  };
}
