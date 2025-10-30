import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { MemeObject } from '../types/MemeObject';
import '../index.css';

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
      <h1 style={styles.title}>🎮 Meme Maker Game</h1>

      <form onSubmit={handleGenerate} style={styles.form}>
        <button type="submit" style={styles.button}>
          Generate Meme
        </button>
      </form>

      {randomMeme && (
        <div style={styles.memeContainer}>
          <div style={styles.imageWrapper}>
            <img src={randomMeme} alt="Meme" style={styles.image} />
            {selectedText && <h2 style={styles.topText}>{selectedText}</h2>}
          </div>

          <div style={styles.choices}>
            {textOptions.map((text, i) => (
              <button
                key={i}
                onClick={() => setSelectedText(text)}
                style={{
                  ...styles.choiceButton,
                  background: selectedText === text ? '#2563eb' : '#e5e7eb',
                  color: selectedText === text ? '#fff' : '#000',
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// styless
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
  memeContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
  imageWrapper: { position: 'relative', textAlign: 'center' },
  image: {
    maxWidth: 600,
    borderRadius: 8,
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  topText: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: 32,
    textTransform: 'uppercase',
    textShadow: '2px 2px 5px black',
    textAlign: 'center',
    width: '90%',
    padding: '0 10px',
    wordWrap: 'break-word',
  },
  choices: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: 600,
  },
  choiceButton: {
    border: 'none',
    borderRadius: 6,
    padding: '10px 12px',
    fontSize: 16,
    cursor: 'pointer',
    transition: '0.2s',
  },
};
