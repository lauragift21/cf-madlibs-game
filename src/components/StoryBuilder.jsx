import React, { useState } from "react";
import styles from './Storybuilder.module.css';

const StoryBuilder = ({ story }) => {
  const [inputValues, setInputValues] = useState({});
  const [completedStory, setCompletedStory] = useState('');
  const placeholders = story.content.match(/\[.*?\]/g) || [];

  const handleInputChange = (index, value) => {
    setInputValues({ ...inputValues, [index]: value });
  };

  const formStyle = {
    backgroundColor: story.color,
  }

  const labelStyle = {
    color: story.color,
    borderTop: `2px solid ${story.color}`
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let filledStory = story.content;
    Object.values(inputValues).forEach(value => {
      filledStory = filledStory.replace(/\[.*?\]/, value);
    });
    setCompletedStory(filledStory);
  };

  return (
      <div>
      <form className={styles.form} style={formStyle} onSubmit={handleSubmit}>
        <p>Fill in the blank fields below</p>
        <div className={styles.gridContainer}>
          {placeholders.map((placeholder, index) => (
            <div key={index} className={styles.inputGroup}>
              <input
                id={`input-${index}`}
                type="text"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <label className={styles.label} style={labelStyle} htmlFor={`input-${index}`}>
                {placeholder.replace(/[\[\]]/g, '')}
              </label>
            </div>
          ))}
        </div>
      </form>
      <a  className={styles.backButton} href="/stories">Back</a>
      <button className="button" style={formStyle} type="submit">Generate Story</button>
      {completedStory && <p className={styles.completedStory}>{completedStory}</p>}
    </div>
  );
};

export default StoryBuilder;
