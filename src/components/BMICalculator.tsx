import React, { FC, useState } from "react";

/** male =1, female = 0 */
const GENRE_DEFAULT = 0;
const HEIGHT_DEFAULT = 165;
const WEIGHT_DEFAULT = 60;
const AGE_DEFAULT = 18;

const BMICalculator: FC = () => {
  const [genre, setGenre] = useState(GENRE_DEFAULT);
  const [height, setHeight] = useState(HEIGHT_DEFAULT);
  const [weight, setWeight] = useState(WEIGHT_DEFAULT);
  const [age, setAge] = useState(AGE_DEFAULT);

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGenre(parseInt(e.target.value));

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
  const save = (): void => {
    localStorage.setItem(Date.now().toString(), bmi);
    localStorage.setItem(Date.now().toString(), bfi);
  };

  return (
    <div className="calculator">
      <h1>BMI Calculator</h1>
      <div className="genre">
        <label htmlFor="male">
          <i className="fa fa-4x fa-mars"></i>
        </label>
        <input
          type="radio"
          name="genre"
          id="male"
          value={1}
          onChange={handleGenreChange}
          checked={genre === 1}
        />
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
          <label htmlFor="weight">Weight</label>
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

      <div>
        <h2>Your BMI is</h2>
        <p>{bmi}</p>
        <h2>Your BFI is</h2>
        <p>{bfi} %</p>
      </div>

      <button onClick={save}>Save</button>
    </div>
  );
};
export default BMICalculator;
