import React, { useState } from "react";
import styles from './Storybuilder.module.css';

const StoryBuilder = ({ story }) => {
  const placeholders = story.content.match(/\[.*?\]/g) || [];
  const [inputValues, setInputValues] = useState(new Array(placeholders.length).fill(''));
  const [completedStory, setCompletedStory] = useState('');

  const formStyle = {
    backgroundColor: story.color,
  };

  const labelStyle = {
    color: story.color,
    borderTop: `2px solid ${story.color}`
  };

  const handleInputChange = (index, newValue) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = newValue;
    setInputValues(newInputValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filledStory = story.content;

    placeholders.forEach((placeholder, index) => {
      const replacement = inputValues[index] || 'Empty Text Field';
      filledStory = filledStory.replace(placeholder, `<span class="${styles.highlight}">${replacement}</span>`);      
    });
    setCompletedStory(filledStory);
  };

  return (
    <div>
      <form className={styles.form} style={formStyle} onSubmit={handleSubmit}>
        {!completedStory && (
          <div className={styles.gridContainer}>
            {placeholders.map((placeholder, index) => (
              <div key={index} className={styles.inputGroup}>
                <input
                  id={`input-${index}`}
                  type="text"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  value={inputValues[index] || ''}
                />
                <label className={styles.label} style={labelStyle} htmlFor={`input-${index}`}>
                  {placeholder.replace(/[\[\]]/g, '')}
                </label>
              </div>
            ))}
          </div>
        )}
        {!completedStory && (
          <>
            <button type="submit" className="button" style={labelStyle}>Generate Story</button>
          </>
        )}
        {completedStory && (
          <>
            <div className={styles.completedStory} dangerouslySetInnerHTML={{ __html: completedStory }}></div>
          </>
        )}
      </form>
      <a className={styles.backButton} href="/stories">Back</a>
    </div>
  );
};

export default StoryBuilder;
