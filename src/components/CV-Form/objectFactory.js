import uniqid from 'uniqid';

const createContact = () => ({
  firstName: '',
  lastName: '',
  suffix: '',
  email: '',
  phoneNumber: '',
  // add a custom? social media/ personal website / e.g. label: content
});

const createSummary = () => ({
  id: uniqid(),
  summary: '',
});

const createAccomplishment = () => ({
  id:uniqid(),
  sentence: '',
});

const createDate = () => ({
  startDate: '',
  endDate: '',
});

const createExperience = () => ({
  id: uniqid(),
  jobTitle: '',
  company: '',
  accomplishment: createAccomplishment(),
  accomplishments: [],
  ...createDate(),
});

const createEducation = () => ({
  id: uniqid(),
  academicDegree: '',
  major: '',
  schoolName: '',
  accomplishment: createAccomplishment(),
  accomplishments: [],
  ...createDate(),
});

const createSkill = () => ({
  skill: {
    id: uniqid(),
    text: '',
  },
  skillList: [],
});

export default function ObjectFactory(string) {
  let object;
  if (string === 'contact') {
    object = createContact();
  } else if (string === 'summary') {
    object = createSummary();
  } else if (string === 'accomplishment') {
    object = createAccomplishment();
  } else if (string === 'experience') {
    object = createExperience();
  } else if (string === 'education') {
    object = createEducation();
  } else if (string === 'skill') {
    object = createSkill();
  }
  return object;
};
