import styles from './modules/CVOverview.module.css';

const shortenUrl = (url) => url.replace(/(^\w+:|^)\/\/www./, '');
const removeExtraWhiteSpaces = (string) => string.replace(/\s+/g,' ').trim();
const stringMinusThreeChar = (char) => char.substring(0, char.length-3);

const removeDayFromDate = (date) => 
(date === 'PRESENT') ? 'present' : stringMinusThreeChar(date);

const dateDiv = (object) => (
  <div className={styles.dateDiv}>
    <p>
      {stringMinusThreeChar(object.startDate)}
      &nbsp;-&nbsp;
      {removeDayFromDate(object.endDate)}
    </p>
  </div>
);

const accomplishmentUl = (array) => {
  if (array.length > 0) {
    return (
      <ul>
        {array.map((list) => (
          <li key={list.id}>{list.sentence}</li>
        ))}
      </ul>
    );
  }
};

export default function CVOverview(props) {
  const { contact, summary, experience, education, skill } = props.data;
  
  return (
    <div className={styles.CVOverview}>
      <div className={styles.buttonDiv}>
        <button
          onClick={props.onClickEditBtn}
          className={styles.edit}
        >
          Edit CV
        </button>
        <button onClick={props.onClickPrintBtn}>
          Print | Save as PDF
        </button>
      </div>
      <div className={styles.container}>
        <section>
          <h1>
            {contact.firstName}&nbsp;{contact.lastName}
          </h1>
          <div className={styles.contactInnerContainerDiv}>
            <div className={styles.contactDynamicDiv}>
              <p>
                <strong>Phone</strong>&nbsp;&nbsp;
                {contact.phoneNumber}
              </p>
              
              {((contact.customLabel) && (contact.customValue)) &&
                <p>
                  <strong>{contact.customLabel}</strong>&nbsp;&nbsp;
                  {shortenUrl(contact.customValue)}
                </p>
              }
            </div>
            <p>
              <strong>E-mail</strong>&nbsp;&nbsp;
              {contact.email}
            </p>
          </div>
        </section>
        {(summary.length === 1) &&
          <section className={styles.summary}>
            <div className={styles.summaryInnerContainerDiv}>
              <p>
                {removeExtraWhiteSpaces(summary[0].paragraph)}
              </p>
            </div>
          </section>
        }
        {(experience.length > 0) &&
          <section>
            <h2>Experience</h2>
            {experience.map((object) => (
              <div
                key={object.id}
                className={styles.sectionInnerContainerDiv}
              >
                {dateDiv(object)}
                <div className={styles.expInnerContainerChildDiv}>
                  <p><strong>{object.jobTitle}</strong></p>
                  <p><i>{object.company}</i></p>
                  {accomplishmentUl(object.accomplishments)}
                </div>
              </div>
            ))}
          </section>
        }
        {(education.length > 0) &&
          <section>
            <h2>Education</h2>
            {education.map((object) => (
              <div
              key={object.id}
                className={styles.sectionInnerContainerDiv}
              >
                {dateDiv(object)}
                <div>
                  <p>
                    <strong>
                      {(object.academicDegree)
                        ? <>{object.academicDegree}&nbsp;</> : null
                      }
                      {(object.major ? <>{object.major}&nbsp;</> : null)}
                      {object.schoolName}
                    </strong>
                  </p>
                  {accomplishmentUl(object.accomplishments)}
                </div>
              </div>
            ))}
          </section>
        }
        {console.log(skill)}
        {(skill.list.length > 0) &&
          <section>
            <h2>Hard Skills</h2>
            <ul className={styles.skillsUl}>
              {skill.list.map((list) => (
                <li key={list.id}>{list.skillName}</li>
              ))}
            </ul>
          </section>
        }
      </div>
    </div>
  );
};
