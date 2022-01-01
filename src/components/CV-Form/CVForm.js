import React, { useState } from 'react';
import styles from './modules/CVForm.module.css';
import ObjectFactory from './objectFactory';
import CVOverview from './CVOverview';

export default function CVForm() {
  
  const [data, setData] = useState({
    contact: ObjectFactory('contact'),
    summary: [ObjectFactory('summary')],
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [preview, setPreview] = useState(false);
  console.log(data)
  
  return (
    <>

    </>
  );
};
