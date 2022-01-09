import uniqid from 'uniqid';

const createContact = () => ({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  customLabel: '',
  customValue: '',
});

const createSummary = () => ({
  id: uniqid(),
  paragraph: '',
});

const createAccomplishment = () => ({
  id: uniqid(),
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
  skillName: '',
  list: [],
});

const createDefaultData = () => ({
  contact: ObjectFactory('contact'),
  skill: ObjectFactory('skill'),
  summary: [ObjectFactory('summary')],
  experience: [ObjectFactory('experience')],
  education: [ObjectFactory('education')],
});

const removeExtraWhiteSpaces = (string) => string.replace(/\s+/g,' ').trim();

const createDummy = ()  => {
  const dummy = {
    skill: createSkill(),
    summary: [createSummary()],
    experience: [createExperience()],
    education: [createEducation()],
  }
  dummy.contact = {
    firstName: 'John',
    lastName: 'Doe Jr.',
    email: 'johndoe@email.com',
    phoneNumber: '0909-123-1234',
    customLabel: 'LinkedIn',
    customValue: 'https://www.linkedin.com/in/johndoe',
  };
  dummy.skill.list = [
    { 
      id: uniqid(),
      skillName: `Email System, File-Sharing Systems, Database Management`
    },
    { id: uniqid(), skillName: 'Coordinating Conference Calls' },
    { id: uniqid(), skillName: 'Travel Arrangements' },
  ];
  const dummyPara = `Seeking position to help improve logistics 
    and internal communication. Saved Company, Inc. an average 15 hour per
    for four executives. Cut travel costs by 28%. Saved $112.000/yr by
    eliminating key clients misunderstandings with a new call system.`;
  dummy.summary[0].paragraph = removeExtraWhiteSpaces(dummyPara);
  dummy.experience[0].jobTitle = 'Personal Executive Assistant';
  dummy.experience[0].company = 'Company, Inc.';
  dummy.experience[0].accomplishments = [
    {
      id: uniqid(), 
      sentence: `Fulfilled all executive assistant duties for four top
        executives in an international firm.`,
    },{
      id: uniqid(), 
      sentence: `Improved communication between executives/customers.`,
    },{
      id: uniqid(), 
      sentence: `Coordinated travel arrangements, internationally and
        domestically. Reduced lost executive time to travel snags by 28%.`,
    },
  ];
  dummy.experience[0].startDate = '2018-04-05';
  dummy.experience[0].endDate = '2021-06-05';
  dummy.education[0].academicDegree = 'BA';
  dummy.education[0].major = 'Business Admin';
  dummy.education[0].schoolName = 'Wellesley College';
  dummy.education[0].accomplishments = [
    {
      id: uniqid(),
      sentence: 'Pursued a passion for accounting and financial management.',
    },{
      id: uniqid(),
      sentence: 'Excelled in business law and ethics.',
    },{
      id: uniqid(),
      sentence: 'My article, "Know What they Want" was reprinted by Forbes.',
    },{
      id: uniqid(),
      sentence: `Board member, Punch's Alley student-managed night club.`,
    },
  ];
  dummy.education[0].startDate = '2014-04-05';
  dummy.education[0].endDate = '2018-01-05';
  return dummy;
};

export default function ObjectFactory(string) {
  if (string === 'contact') {
    return createContact();
  } else if (string === 'summary') {
    return createSummary();
  } else if (string === 'accomplishment') {
    return createAccomplishment();
  } else if (string === 'experience') {
    return createExperience();
  } else if (string === 'education') {
    return createEducation();
  } else if (string === 'skill') {
    return createSkill();
  } else if (string === 'data') {
    return createDefaultData();
  } else if (string === 'dummy') {
    return createDummy();
  }
};
