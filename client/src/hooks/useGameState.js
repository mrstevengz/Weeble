import { useState, useEffect, useRef } from "react";

const KEYS = {
  GUESSES: "weeble_guesses",
  SECRET: "weeble_secret",
};

const MAX_GUESSES = 6;
const response_animation_ms = 1000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGameState(characterList) {
  //Variables para manejar los valores del API

  const [text, setText] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  //Variable para manejar el abrir/cerrar del modal cuando termina un juego

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  //Variables para escoger un personaje aleatorio

  const [secretCharacter, setSecretCharacter] = useState(null);
  const initializated = useRef(false);
  const hasLost = !hasWon && selectedCharacters.length >= MAX_GUESSES;
  const isGameOver = hasWon || hasLost;

  //Variables para manejar la cantidad de intentos/guesses
  const currentGuessNumber = Math.min(
    selectedCharacters.length + 1,
    MAX_GUESSES,
  );

  //Restaurar de local storage o empezar desde 0
  useEffect(() => {
    if (characterList.length === 0) return;
    if (initializated.current) return;
    initializated.current = true;

    const savedGuesses = localStorage.getItem(KEYS.GUESSES);
    const savedSecret = localStorage.getItem(KEYS.SECRET);

    //Cada vez que se recarga, se empieza un juego nuevo y se crea un personaje aleatorio.
    if (savedGuesses && savedSecret) {
      setSelectedCharacters(JSON.parse(savedGuesses));
      setSecretCharacter(JSON.parse(savedSecret));
    } else {
      startNewGame();
    }
  }, [characterList]);

  //Funcion para empezar un nuevo juego (resetear personajes, escoger un personaje aleatorio)

  function startNewGame() {
    if (characterList.length === 0) return;

    //Escoger un personaje aleatorio
    const randIndex = Math.floor(Math.random() * characterList.length);
    const randChar = characterList[randIndex];
    //Guardar el personaje en un objeto
    setSecretCharacter(randChar);
    setText("");
    setSelectedCharacters([]);
    setHasWon(false);
    setIsModalOpen(false);

    //Resetear local storage

    localStorage.setItem(KEYS.SECRET, JSON.stringify(randChar));
    localStorage.removeItem(KEYS.GUESSES);
  }

  //Funcion para almacenar cada personaje que se clickea a un arreglo
  async function handleSelectCharacter(character) {
    if (isGameOver) return;

    const nextCharacters = [...selectedCharacters, character];
    setSelectedCharacters(nextCharacters);
    setText("");

    //Guardar los guesses cada vez que se selecciona (mientras el juego esta en progreso)

    localStorage.setItem(KEYS.GUESSES, JSON.stringify(nextCharacters));

    await delay(response_animation_ms);

    const isCorrect = character._id === secretCharacter._id;

    if (isCorrect) {
      setHasWon(true);
      clearStorage();
      setIsModalOpen(true);
      return;
    }

    if (nextCharacters.length >= MAX_GUESSES) {
      clearStorage();
      setIsModalOpen(true);
    }
  }

  function clearStorage() {
    localStorage.removeItem(KEYS.GUESSES);
    localStorage.removeItem(KEYS.SECRET);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return {
    text,
    setText,
    selectedCharacters,
    isModalOpen,
    hasWon,
    hasLost,
    isGameOver,
    secretCharacter,
    currentGuessNumber,
    MAX_GUESSES,
    handleSelectCharacter,
    startNewGame,
    handleCloseModal,
  };
}
