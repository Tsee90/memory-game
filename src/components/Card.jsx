import { useEffect, useState } from 'react';
import '../styles/card.css';

export function Card({ pokemon }) {
  const [src, setSrc] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const imgSrc = response.sprites.other['official-artwork'].front_default;
        setSrc(imgSrc);
      })
      .catch(() => {
        setSrc(null);
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
        const colorText = response.color.name;
        setColor(colorText);
      })
      .catch(() => setDescription(null));
  });
  return src && description ? (
    <div className="card-wrapper" style={{ backgroundColor: color }}>
      <div className="card">
        <div className="card-name">{capitalizeFirstLetter(pokemon)}</div>
        <img src={src} className="card-image"></img>
        <div className="card-description">{description}</div>
      </div>
    </div>
  ) : null;
}
