import React from 'react';

interface MemeTextOptionsProps {
  options: string[];
  selected: string;
  onSelect: (text: string) => void;
}

export function MemeTextOptions({
  options,
  selected,
  onSelect,
}: MemeTextOptionsProps) {
  return (
    <div style={styles.choices}>
      {options.map((text, i) => (
        <button
          key={i}
          onClick={() => onSelect(text)}
          style={{
            ...styles.choiceButton,
            background: selected === text ? '#2563eb' : '#e5e7eb',
            color: selected === text ? '#fff' : '#000',
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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
