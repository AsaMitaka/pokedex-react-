import useHttp from '../../src/hooks/hook';

const useServices = () => {
  const _baseOffset = 0;
  const _limit = 20;
  const _url = 'https://pokeapi.co/api/v2/';

  const { loading, error, request, clearError } = useHttp();

  const getAllPokemon = async (offset = _baseOffset) => {
    const res = await request(`${_url}pokemon?offset=${offset}&limit=${_limit}`);

    const pokemonDataArray = await Promise.all(
      res.results.map(async (item) => {
        const pokemonResponse = await request(item.url);
        return _transformPokeData(pokemonResponse);
      }),
    );

    return pokemonDataArray;
  };

  const getPokemonById = async (id) => {
    if (typeof Number(id) !== 'number') {
      throw new Error('NaN');
    }

    const res = await request(`${_url}pokemon/${id}`);

    return _transformPokeData(res);
  };

  const getAllBerries = async (offset = _baseOffset) => {
    const res = await request(`${_url}berry?offset=${offset}&limit=${_limit}`);

    const berryDataArray = await Promise.all(
      res.results.map(async (item) => {
        const berryResponse = await request(item.url);

        return _transformBerryData(berryResponse);
      }),
    );

    return berryDataArray;
  };

  const getAllItems = async (offset = _baseOffset) => {
    const res = await request(`${_url}item?offset=${offset}&limit=${_limit}`);

    const itemsDataArray = await Promise.all(
      res.results.map(async (item) => {
        const berryResponse = await request(item.url);

        return _transformItemData(berryResponse);
      }),
    );

    return itemsDataArray;
  };

  return { loading, error, clearError, getAllPokemon, getPokemonById, getAllBerries, getAllItems };
};

const _transformPokeData = (res) => {
  return {
    id: res.id,
    base_experience: res.base_experience,
    name: res.name,
    height: res.height,
    weight: res.weight,
    types: res.types,
    imageUrl: res.sprites.front_default,
    abilities: res.abilities,
    stats: res.stats,
  };
};

const _transformBerryData = (res) => {
  return {
    id: res.id,
    name: res.name,
    size: res.size,
    smoothness: res.smoothness,
    growth_time: res.growth_time,
    natural_gift_power: res.natural_gift_power,
    soil_dryness: res.soil_dryness,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${res.item.name}.png`,
  };
};

const _transformItemData = (res) => {
  return {
    id: res.id,
    name: res.name,
    category: res.category.name,
    attributes: res.attributes,
    cost: res.cost,
    imageUrl: res.sprites.default,
  };
};

export default useServices;
