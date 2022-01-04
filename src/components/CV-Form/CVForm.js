import React, { useState } from 'react';
import styles from './modules/CVForm.module.css';
import ObjectFactory from './objectFactory';
import CVOverview from './CVOverview';

const checkValidity = (target) => {
  const valid = target.validity.valid;
  const tagged = target.classList.contains(styles.invalid);
  if (valid && tagged) {
    target.classList.toggle(styles.invalid);
  } else if (!valid && !tagged) {
    target.classList.toggle(styles.invalid);
  }
};

const hyphenToCamelCase = (string) => {
  return string.replace(/-([a-z])/g, (m, s) => s.toUpperCase());
};

const trimLength = (string) => string.trim().length;

const arrayLength = (array) => array.length;

export default function CVForm() {
  const [submittedData, setSubmittedData] = useState(null);
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState({
    contact: ObjectFactory('contact'),
    skill: ObjectFactory('skill'),
    summary: [ObjectFactory('summary')],
    experience: [ObjectFactory('experience')],
    education: [ObjectFactory('education')],
  });

  const getSectionValue = (section) => {
    if (section === 'contact') {
      return data.contact;
    } else if (section === 'skill') {
      return data.skill;
    } else if (section === 'experience') {
      return data.experience;
    } else if (section === 'education') {
      return data.education;
    } else if (section === 'summary') {
      return data.summary;
    }
  };

  const setStateForObjectTypeSection = (section, name, value) => {
    setData({
      ...data,
      [section]: {
        ...getSectionValue(section),
        [name]: value,
      }
    });
  };

  const setStateForArrayTypeSection = () => {
  };


  const handleChange = (e) => {
    checkValidity(e.target);
    const section = e.target.getAttribute('data-section');
    const name = hyphenToCamelCase(e.target.name);
    const value = e.target.value;

    if ((section === 'contact') || (section === 'skill')) {
      setStateForObjectTypeSection(section, name, value);
    } else {
      setStateForArrayTypeSection(section, name, value);
    }
  };
  
  const { contact, summary, experience, education, skill } = data;

  return (
    <>{console.log(data)}
      {(preview === false) &&
        <form
          className={styles.CVForm}
          id='cvForm'
          noValidate
        >
          <section id='contact'>
            <h2>Contact Information</h2>
            <hr />
            <div>
              <label htmlFor='firstName'>First name</label>
              <input 
                type='text'
                name='first-name'
                id='firstName'
                data-section='contact'
                value={contact.firstName}
                onChange={handleChange}
                required
              />
              <label htmlFor='lastName'>Last name</label>
              <input 
                type='text'
                name='last-name'
                id='lastName'
                data-section='contact'
                value={contact.lastName}
                onChange={handleChange}
                required
              />
              <label htmlFor='email'>Email</label>
              <input 
                type='email'
                name='email'
                id='email'
                data-section='contact'
                value={contact.email}
                onChange={handleChange}
                required
              />
              <label htmlFor='phoneNumber'>Phone number</label>
              <input 
                type='tel'
                name='phone-number'
                id='phoneNumber'
                pattern='[0-9]{4}-[0-9]{3}-[0-9]{4}'
                data-section='contact'
                value={contact.phoneNumber}
                onChange={handleChange}
                required
              />
              <small>Format: 0999-999-9999</small>
              <label htmlFor='customLabel'>
                Personal website / LinkedIn / Social Media site
              </label>
              <input 
                type='text'
                name='custom-label'
                id='customLabel'
                data-section='contact'
                value={contact.customLabel}
                onChange={handleChange}
              />
              {contact.customLabel.trim() &&
                <>
                  <label htmlFor='customValue'>
                    {contact.customLabel}&nbsp;link
                  </label>
                  <input 
                    type='url'
                    name='custom-value'
                    id='customValue'
                    data-section='contact'
                    value={contact.customValue}
                    onChange={handleChange}
                  />
                </>
              }
            </div>
          </section>
          <section id='skill'>
            <h2>Hard Skills</h2>
            <hr />
            <div>
              <label htmlFor='skillName'>Skill</label>
              <input 
                type='text'
                name='skill-name'
                id='skillName'
                data-section='skill'
                value={skill.skillName}
                onChange={handleChange}
              />
              <button
                type='button'
                className={styles.addToList}
                disabled={trimLength(skill.skillName) > 0 ? false : true}
              >
                Add Skill
              </button>
              <details
                open={arrayLength(skill.list) > 0}
              >
                <summary>List of Skills</summary>
                {(arrayLength(skill.list) > 0)
                  ?
                    <div
                      className={styles.list}
                      id={'skillList'}
                    >
                      <ul>
                        {skill.list.map((skill) => 
                          <li key={skill.id}>{skill.skillName}</li>
                        )}
                      </ul>
                    </div>
                  : <div>(empty)</div>
                }
              </details>
            </div>
          </section>
        </form>
      }
      {preview === true &&
        <CVOverview 
          data={submittedData}
        />
      }
    </>
  );
};
