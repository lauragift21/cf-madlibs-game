import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import styles from './Storybuilder.module.css';

const StoryBuilder = ({ story }) => {
  const placeholders = story.content.match(/\[.*?\]/g) || [];
  const [inputValues, setInputValues] = useState(new Array(placeholders.length).fill(''));
  const [completedStory, setCompletedStory] = useState('');
  const [buttonText, setButtonText] = useState('Share Story');
  //TODO: Replace with custom id
  const shareUrl = `/stories/${story.id}`;

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
      const replacement = inputValues[index] || 'Missing Text';
      filledStory = filledStory.replace(placeholder, `<span style="color:${story.color}" class="${styles.highlight}">${replacement}</span>`);      
    });
    setCompletedStory(filledStory);
  };

   const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setButtonText('Copied!');
      setTimeout(() => setButtonText('Copy Link'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
      {completedStory && <button style={formStyle} onClick={handleShare}>{buttonText}</button>}
    </div>
  );
};

export default StoryBuilder;
