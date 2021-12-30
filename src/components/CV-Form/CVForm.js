import React, { useState } from 'react';
import styles from './modules/CVForm.module.css';
import ObjectFactory from './objectFactory';
import CVOverview from './CVOverview';

export default function CVForm() {
  const [state, setState] = useState();

  console.log(ObjectFactory('contact'));
  console.log(ObjectFactory('summary'));
  console.log(ObjectFactory('experience'));
  console.log(ObjectFactory('education'));
  console.log(ObjectFactory('skill'));

  return (
    <>

    </>
  );
};
