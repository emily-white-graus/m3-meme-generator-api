import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { MemeObject } from '../../types';
import { MemeDisplay } from '../MemeDisplay';
import { MemeTextOptions } from '../MemeTextOptions';
import '../../index.css';

export function MemeGenerator() {
  const [memes, setMemes] = useState<MemeObject[]>([]);
  const [randomMeme, setRandomMeme] = useState<string>('');
  const [textOptions, setTextOptions] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  const fetchTexts = async () => {
    const promises = Array(3)
      .fill(null)
      .map(() =>
        fetch('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        }).then((res) => res.json())
      );

    const results = await Promise.all(promises);
    setTextOptions(results.map((r) => r.joke));
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * memes.length);
    setRandomMeme(memes[randomIndex].url);
    await fetchTexts();
    setSelectedText('');
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Meme Maker Game</h1>

      <form onSubmit={handleGenerate} style={styles.form}>
        <button type="submit" style={styles.button}>
          Generate Meme
        </button>
      </form>

      {randomMeme && (
        <>
          <MemeDisplay memeUrl={randomMeme} selectedText={selectedText} />
          <MemeTextOptions
            options={textOptions}
            selected={selectedText}
            onSelect={setSelectedText}
          />
        </>
      )}
    </div>
  );
}

// Styles (same as before)
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Impact, Arial Black, sans-serif',
    padding: '20px',
  },
  title: { fontSize: 36, margin: '20px 0' },
  form: { marginBottom: 20 },
  button: {
    padding: '10px 20px',
    fontSize: 18,
    border: 'none',
    borderRadius: 8,
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
  },
};

