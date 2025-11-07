import React from 'react';

interface MemeDisplayProps {
  memeUrl: string;
  selectedText: string;
}

export function MemeDisplay({ memeUrl, selectedText }: MemeDisplayProps) {
  return (
    <div style={styles.memeContainer}>
      <div style={styles.imageWrapper}>
        <img src={memeUrl} alt="Meme" style={styles.image} />
        {selectedText && <h2 style={styles.topText}>{selectedText}</h2>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  memeContainer: { display: 'flex', flexDirection: 'column', gap: 16 },
  imageWrapper: { position: 'relative', textAlign: 'center' },
  image: {
    maxWidth: 600,
    borderRadius: 8,
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  },
  topText: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: 32,
    textTransform: 'uppercase',
    textShadow: '2px 2px 5px black',
  },
};
