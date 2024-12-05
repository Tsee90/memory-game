import { useEffect, useState } from 'react';

export function Card({ pokemon }) {
  const [src, setSrc] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const imgSrc = response.sprites.other['official-artwork'].front_default;
        setSrc(imgSrc);
      });
  }, [pokemon]);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const flavorText = response.flavor_text_entries[0].flavor_text;
        const descriptionText = flavorText.replace(/[\n\f]/g, ' ');
        setDescription(descriptionText);
      });
  });
  return (
    <div>
      <img src={src}></img>
      <div>{description}</div>
    </div>
  );
}
