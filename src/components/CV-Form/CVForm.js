import React, { useState } from 'react';
import uniqid from 'uniqid';
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
  const [data, setData] = useState(ObjectFactory('data'));
  const [dummyData, setDummyData] = useState(false);

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

  const setStateForArrayTypeSection = (section, name, value, index) => {
    const newSectionValue = [ ...getSectionValue(section) ];
    let newValue = value;

    if (name === 'accomplishment') {
      newValue = {
        id: uniqid(),
        sentence: value,
      };
    }

    newSectionValue[index] = {
      ...newSectionValue[index],
      [hyphenToCamelCase(name)]: newValue,
    };

    setData({
      ...data,
      [section]: [ ...newSectionValue ],
    });
  };

  const handleChange = (e) => {
    checkValidity(e.target);
    const section = e.target.getAttribute('data-section');
    const name = hyphenToCamelCase(e.target.name);
    const value = e.target.value;

    if ((section === 'contact') || (section === 'skill')) {
      setStateForObjectTypeSection(section, name, value);
    } else {
      const index = e.target.parentElement.getAttribute('data-index');
      setStateForArrayTypeSection(section, name, value, index);
    }
  };

  const handleCheckboxChange = (e) => {
    const section = e.target.getAttribute('data-section');
    const name = hyphenToCamelCase(e.target.name);
    const index = e.target.getAttribute('data-index');

    if (e.target.checked) {
      setStateForArrayTypeSection(section, name, 'PRESENT', index);
    } else {
      setStateForArrayTypeSection(section, name, '', index);
    }
  };

  const removeOneStateSectionValue = (e) => {
    const section = e.target.getAttribute('data-section');
    const sectionValue = getSectionValue(section);
    const index = e.target.parentElement.getAttribute('data-index');

    sectionValue.splice(index, 1);

    setData({
      ...data,
      [section]: [ ...sectionValue ],
    });
  };

  const addOneStateSectionValue = (e) => {
    const section = e.target.getAttribute('data-section');
    setData({
      ...data,
      [section]: [
        ...getSectionValue(section),
        ObjectFactory(section),
      ],
    });
  };

  const addToAccomplishments = (e) => {
    const section = e.target.getAttribute('data-section');
    const index = e.target.getAttribute('data-index');
    const sectionValue = getSectionValue(section);

    sectionValue[index].accomplishments = 
      sectionValue[index].accomplishments
        .concat(sectionValue[index].accomplishment);
    
    sectionValue[index].accomplishment = ObjectFactory('accomplishment');

    setData({
      ...data,
      [section]: [ ...sectionValue ],
    });
  };

  const addToSkillList = () => {
    setData({
      ...data,
      skill: {
        list: [
          ...data.skill.list,
          {
            id: uniqid(),
            skillName: data.skill.skillName,
          }
        ],
        skillName: '',
      }
    });
  }

  const removeFromList = (e) => {
    const section = e.target.getAttribute('data-section');
    const index = e.target.getAttribute('data-index');
    let sectionValue = getSectionValue(section);

    if (section === 'skill') {
      sectionValue.list.splice(index, 1);
    } else {
      const listIndex = e.target.getAttribute('data-list-index');
      sectionValue[index].accomplishments.splice(listIndex, 1);
      sectionValue = [ ...sectionValue ];
    }
    
    setData({
      ...data,
      [section]: sectionValue,
    });
  };

  const handleSubmit = () => {
    const formInputs = document.querySelectorAll('#cvForm input');
    let invalid = 0;
    let  invalidInputs = [];

    formInputs.forEach((input) => {
      checkValidity(input);
      if (!input.validity.valid) {
        invalid += 1;
        invalidInputs.push(input);
      }
    });

    if (invalid === 0) {
      setSubmittedData(data);
      setPreview(true);
    } else {
      invalidInputs[0].focus();
    }
  };

  const loadDummy = () => {
    if (window.confirm('Continue to use dummy data?') === true) {
      setDummyData(true);
      setData(ObjectFactory('dummy'));
    }
  };

  const setPreviewToFalse = () => {
    setPreview(false);
  };

  const printCV = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('Reset all inputs?') === true) {
      setData(ObjectFactory('data'));
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
          {(dummyData === false) &&
            <button
              type='button'
              className={styles.submit}
              onClick={loadDummy}
            >
              &gt; Fill all inputs with dummy data &lt;
            </button>
          }
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
              {(contact.customLabel.trim()) &&
                <>
                  <label htmlFor='customValue'>
                    {contact.customLabel}&nbsp;URL
                  </label>
                  <input 
                    type='url'
                    name='custom-value'
                    id='customValue'
                    data-section='contact'
                    value={contact.customValue}
                    onChange={handleChange}
                    required
                  />
                  <small>
                    e.g. https://www.example.com/johndoe
                  </small>
                </>
              }
            </div>
          </section>
          <section id='summary'>
            <h2>Summary</h2>
            <hr />
            {summary.map((object, index) => (
              <div 
                key={object.id} 
                data-index={index}
              >
                <textarea
                  form='cvForm'
                  name='paragraph'
                  data-section='summary'
                  value={object.paragraph}
                  onChange={handleChange}
                ></textarea>
                <button
                  type='button'
                  className={styles.delete}
                  data-section='summary'
                  onClick={
                    (e) => {
                      if ((object.paragraph.length > 60)) {
                        if (window.confirm('Remove summary?') === true) 
                        removeOneStateSectionValue(e);
                      } else {
                        removeOneStateSectionValue(e);
                      }
                    }
                  }
                >
                  Remove Summary
                </button>
              </div>
            ))}
            {(summary.length === 0) &&
              <button
                type='button'
                data-section='summary'
                onClick={addOneStateSectionValue}
              >
                Add Summary
              </button>
            }
          </section>
          <section id='experience'>
            <h2>Experience</h2>
            <hr />
            {experience.map((object, index) => {
              const num = index + 1;
              return (
                <div
                  key={object.id}
                  data-index={index}
                >
                  {(experience.length > 1) &&
                    <span>{`#${num}`}</span>
                  }
                  <label htmlFor={`jobTitle${num}`}>Job Title</label>
                  <input 
                    type='text'
                    name='job-title'
                    id={`jobTitle${num}`}
                    data-section='experience'
                    value={object.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={`company${num}`}>Company</label>
                  <input 
                    type='text'
                    name='company'
                    id={`company${num}`}
                    data-section='experience'
                    value={object.company}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={`expStartDate${num}`}>Start Date</label>
                  <input 
                    type='date'
                    name='start-date'
                    id={`expStartDate${num}`}
                    data-section='experience'
                    value={object.startDate}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={`expEndDate${num}`}>End Date</label>
                  {(object.endDate !== 'PRESENT') &&
                    <input 
                      type='date'
                      name='end-date'
                      id={`expEndDate${num}`}
                      data-section='experience'
                      value={object.endDate}
                      onChange={handleChange}
                      required
                    />
                  }
                  <small>
                    <input 
                      type='checkbox'
                      name='end-date'
                      id={`expCheckboxEndDate${num}`}
                      data-section='experience'
                      data-index={index}
                      checked={(object.endDate === 'PRESENT')
                        ? true : false 
                      }
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`expCheckboxEndDate${num}`}>
                      PRESENT
                    </label>
                  </small>
                  <label htmlFor={`expAccomplishment${num}`}>
                      Accomplishment
                  </label>
                  <input 
                    type='text'
                    name='accomplishment'
                    id={`expAccomplishment${num}`}
                    data-section='experience'
                    value={object.accomplishment.sentence}
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className={styles.addToList}
                    data-section='experience'
                    data-index={index}
                    disabled={
                      (trimLength(object.accomplishment.sentence) > 0) 
                      ? false : true
                    }
                    onClick={addToAccomplishments}
                  >
                    Add to List
                  </button>
                  <details
                    open={arrayLength(object.accomplishments) > 0}
                  >
                    <summary>List of Accomplishments</summary>
                    {(arrayLength(object.accomplishments) > 0)
                      ?
                        <div
                          className={styles.list}
                          id={`expList${num}`}
                        >
                          <ul>
                            {object.accomplishments.map((item, listIndex) => 
                              <li key={item.id}>
                                {item.sentence}
                                <span 
                                  data-section='experience'
                                  data-index={index}
                                  data-list-index={listIndex}
                                  className={styles.spanDelete}
                                  tabIndex={0}
                                  onClick={removeFromList}
                                >x</span>
                              </li>
                              
                            )}
                          </ul>
                        </div>
                      : <div><p>(empty)</p></div>
                    }
                  </details>
                  <button
                    type='button'
                    className={styles.delete}
                    data-section='experience'
                    data-index={index}
                    onClick={removeOneStateSectionValue}
                  >
                    {(arrayLength(experience) === 1)
                      ? 'Remove Experience'
                      : `Delete #${num}`
                    }
                  </button>
                </div>
              );
            })}
            <button
              type='button'
              data-section='experience'
              onClick={addOneStateSectionValue}
            >
              {(arrayLength(experience) === 0)
                ? 'Add Experience'
                : 'Add More'
              }
            </button>
          </section>
          <section id='education'>
            <h2>Education</h2>
            <hr />
            {education.map((object, index) => {
              const num = index + 1;
              return (
                <div
                  key={object.id}
                  data-index={index}
                >
                  {(education.length > 1) &&
                    <span>{`#${num}`}</span>
                  }
                  <label htmlFor={`academicDegree${num}`}>
                    Academic Degree
                  </label>
                  <input 
                    type='text'
                    name='academic-degree'
                    id={`academicDegree${num}`}
                    data-section='education'
                    value={object.academicDegree}
                    onChange={handleChange}
                  />
                  <label htmlFor={`major${num}`}>Major</label>
                  <input 
                    type='text'
                    name='major'
                    id={`major${num}`}
                    data-section='education'
                    value={object.major}
                    onChange={handleChange}
                  />
                  <label htmlFor={`schoolName${num}`}>School Name</label>
                  <input 
                    type='text'
                    name='school-name'
                    id={`schoolName${num}`}
                    data-section='education'
                    value={object.schoolName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={`educStartDate${num}`}>Start Date</label>
                  <input 
                    type='date'
                    name='start-date'
                    id={`educStartDate${num}`}
                    data-section='education'
                    value={object.startDate}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={`educEndDate${num}`}>End Date</label>
                  {(object.endDate !== 'PRESENT') &&
                    <input 
                      type='date'
                      name='end-date'
                      id={`educEndDate${num}`}
                      data-section='education'
                      value={object.endDate}
                      onChange={handleChange}
                      required
                    />
                  }
                  <small>
                    <input 
                      type='checkbox'
                      name='end-date'
                      id={`educCheckboxEndDate${num}`}
                      data-section='education'
                      data-index={index}
                      checked={(object.endDate === 'PRESENT')
                        ? true : false 
                      }
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`educCheckboxEndDate${num}`}>
                      PRESENT
                    </label>
                  </small>
                  <label htmlFor={`educAccomplishment${num}`}>
                      Accomplishment
                  </label>
                  <input 
                    type='text'
                    name='accomplishment'
                    id={`educAccomplishment${num}`}
                    data-section='education'
                    value={object.accomplishment.sentence}
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className={styles.addToList}
                    data-section='education'
                    data-index={index}
                    disabled={
                      (trimLength(object.accomplishment.sentence) > 0) 
                      ? false : true
                    }
                    onClick={addToAccomplishments}
                  >
                    Add to List
                  </button>
                  <details
                    open={arrayLength(object.accomplishments) > 0}
                  >
                    <summary>List of Accomplishments</summary>
                    {(arrayLength(object.accomplishments) > 0)
                      ?
                        <div
                          className={styles.list}
                          id={`educList${num}`}
                        >
                          <ul>
                            {object.accomplishments.map((item, listIndex) => 
                              <li key={item.id}>
                                {item.sentence}
                                <span 
                                  data-section='education'
                                  data-index={index}
                                  data-list-index={listIndex}
                                  className={styles.spanDelete}
                                  tabIndex={0}
                                  onClick={removeFromList}
                                >x</span>
                              </li>
                              
                            )}
                          </ul>
                        </div>
                      : <div><p>(empty)</p></div>
                    }
                  </details>
                  <button
                    type='button'
                    className={styles.delete}
                    data-section='education'
                    data-index={index}
                    onClick={removeOneStateSectionValue}
                  >
                    {(arrayLength(education) === 1)
                      ? 'Remove Education'
                      : `Delete #${num}`
                    }
                  </button>
                </div>
              );
            })}
            <button
              type='button'
              data-section='education'
              onClick={addOneStateSectionValue}
            >
              {(arrayLength(education) === 0)
                ? 'Add Education'
                : 'Add More'
              }
            </button>
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
                onClick={addToSkillList}
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
                        {skill.list.map((object, index) => 
                          <li
                            key={object.id}
                            >
                            {object.skillName}
                            <span 
                              data-section='skill'
                              data-index={index}
                              className={styles.spanDelete}
                              tabIndex={0}
                              onClick={removeFromList}
                            >x</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  : <div><p>(empty)</p></div>
                }
              </details>
            </div>
          </section>
          <button
            type='button'
            className={styles.submit}
            onClick={handleSubmit}
          >
            Create CV
          </button>
          <button
            type='reset'
            className={styles.reset}
            onClick={handleReset}
          >
            Reset Form
          </button>
        </form>
      }
      {(preview === true) &&
        <CVOverview 
          data={submittedData}
          onClickEditBtn={setPreviewToFalse}
          onClickPrintBtn={printCV}
        />
      }
    </>
  );
};
