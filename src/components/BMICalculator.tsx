import React, { FC, useState, useRef, useEffect } from "react";
import FadeIn from "react-fade-in";

/** male =1, female = 0 */
const GENRE_DEFAULT = 0;
const HEIGHT_DEFAULT = 165;
const WEIGHT_DEFAULT = 60;
const AGE_DEFAULT = 18;

const SKINNY = "🤔 Too skinny";
const NORMAL = "✔ Normal";
const OVERWEIGHT = "🛑 Overweight";
const OBESITY = "🤕 Obesity";
const MORBID_OBESITY = "🤒 Morbid Obesity";

const BMICalculator: FC = () => {
  const [genre, setGenre] = useState(GENRE_DEFAULT);
  const [height, setHeight] = useState(HEIGHT_DEFAULT);
  const [weight, setWeight] = useState(WEIGHT_DEFAULT);
  const [age, setAge] = useState(AGE_DEFAULT);
  const [showResults, setShowResults] = useState(false);

  const maleClassName = useRef("male");
  const femaleClassName = useRef("female active");
  const [bmiClassName, setBmiClassName] = useState("bmi");

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (genre === 0) {
      maleClassName.current = "male active";
      femaleClassName.current = "female";
    } else {
      maleClassName.current = "male ";
      femaleClassName.current = "female active";
    }
    setGenre(parseInt(e.target.value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeight(parseInt(e.target.value));

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWeight(parseInt(e.target.value));

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAge(parseInt(e.target.value));

  /** Compute Body Mass Index
   *
   * We multiply by 10000 to convert to kg.m-2
   */
  const bmi = ((weight / (height * height)) * 10000).toFixed(2);

  /** Compute Body Fat Index using Deurenberg's formula */
  const bfi = (1.2 * Number(bmi) + 0.23 * age - 10.8 * genre - 5.4).toFixed(2);

  /** Save BMI and BFI values and the date */
  const save = (): void => setShowResults(!showResults);

  useEffect(() => {
    if (Number(bmi) < 18.5) {
      setBmiClassName(SKINNY);
    } else if (Number(bmi) < 25) {
      setBmiClassName(NORMAL);
    } else if (Number(bmi) < 30) {
      setBmiClassName(OVERWEIGHT);
    } else if (Number(bmi) < 40) {
      setBmiClassName(OBESITY);
    } else {
      setBmiClassName(MORBID_OBESITY);
    }
  }, [bmi]);

  return (
    <div className="calculator">
      <FadeIn delay={100}>
        <div className="genre">
          <div className={maleClassName.current}>
            <label htmlFor="male">
              <i className="fa fa-4x fa-mars"></i>
              <input
                type="radio"
                name="genre"
                id="male"
                value={1}
                onChange={handleGenreChange}
                checked={genre === 1}
              />
            </label>
          </div>
          <div className={femaleClassName.current}>
            <label htmlFor="female">
              <i className="fa fa-4x fa-venus"></i>
            </label>
            <input
              type="radio"
              name="genre"
              id="female"
              value={0}
              onChange={handleGenreChange}
              checked={genre === 0}
            />
          </div>
        </div>
        <div className="height">
          <label htmlFor="height">Height</label>
          <p>{height} cm</p>
          <input
            type="range"
            name="height"
            id="height"
            min={100}
            max={200}
            value={height}
            onChange={handleHeightChange}
          />
        </div>
        <div className="numeric-inputs">
          <div className="input-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              id="weight"
              min={1}
              value={weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              min={0}
              max={100}
              value={age}
              onChange={handleAgeChange}
            />
          </div>
        </div>

        <FadeIn>
          <div className="results">
            <div className="bmi">
              <h2>Your BMI is</h2>
              <p>{bmi}</p>
            </div>
            <div className="bfi">
              <h2>Your BFI is</h2>
              <p>{bfi} %</p>
            </div>
          </div>
          <div className="description">
            <h3>{bmiClassName}</h3>
          </div>
        </FadeIn>

        <button onClick={save}>Save Results</button>
      </FadeIn>
    </div>
  );
};
export default BMICalculator;
