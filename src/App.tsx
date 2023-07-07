import React, { useState, useRef } from 'react';
import './App.css';

function App(): JSX.Element {
  const [result, setResult] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const poidsRef = useRef<HTMLInputElement>(null);
  const tailleRef = useRef<HTMLInputElement>(null);

  const resultSpan = useRef<HTMLParagraphElement>(null);
  const resultDetails = useRef<HTMLParagraphElement>(null);

  function handleCalcul(): void {
    if (poidsRef.current && tailleRef.current && resultSpan.current && resultDetails.current) {
      const poids = parseFloat(poidsRef.current.value);
      const taille = parseFloat(tailleRef.current.value);

    setError(false)
      
    if (isNaN(poids) || isNaN(taille)) {
      setError(true)
      return; 
    }

    if (poids <= 0 || taille <= 0) {
      setError(true)
      return;
    }

      const tailleEnMetres = taille / 100;
      const imc = poids / (tailleEnMetres * tailleEnMetres);
      const imcResult = imc.toFixed(2);

      let precision: string;
      let couleur: string;

      switch (true) {
        case imc < 18.5:
          precision = "Insuffisance pondérale";
          couleur = "insuffisance";
          break;
        case imc >= 18.5 && imc < 25:
          precision = "Votre poids est normal";
          couleur = "normal";
          break;
        case imc >= 25 && imc < 30:
          precision = "Vous êtes en surpoids";
          couleur = "surpoids";
          break;
        case imc >= 30:
          precision = "Attention, vous êtes en situation d'obésité";
          couleur = "obesite";
          break;
        default:
          precision = "";
          couleur = "";
      }

      setColor(couleur);

      if (resultSpan.current) {
        resultSpan.current.textContent = `Votre résultat : ${imcResult}`;
      }
      if (resultDetails.current) {
        resultDetails.current.textContent = `${precision}`;
      }
    }
  }

  return (
    <>
      <div className='calculator-container'>
        <h1>Calculateur d'IMC</h1>
        <div className='calculator-inputs'>
          <div className='input'>
            <label htmlFor="taille">Votre taille en centimètres</label>
            <input type="text" name='taille' id='taille' ref={tailleRef} />
          </div>
          <div className='input'>
            <label htmlFor="poids">Votre poids en Kg</label>
            <input type="text" name='poids' id='poids' ref={poidsRef} />
          </div>
        </div>
        <button onClick={handleCalcul}>Calculer l'IMC</button>
        <p className='result' ref={resultSpan}>Votre résultat</p>
        <p className={`resultDetails ${color}`} ref={resultDetails}></p>
        <p className={error ? 'error' : 'hidden'}>Veuillez entrer des valeurs valides</p>
      </div>
    </>
  );
}

export default App;
