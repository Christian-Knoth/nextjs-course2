import { MeetUp } from '@/interfaces/meetups';
import { MutableRefObject, useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.scss';

function NewMeetupForm(props: any) {
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  function getCurrent (ref: MutableRefObject<null | HTMLInputElement>){
    return ref && ref.current && ref.current.value || "";
  }

  function submitHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const meetupData: MeetUp = {
      title: getCurrent(titleInputRef),
      image: getCurrent(imageInputRef),
      address: getCurrent(addressInputRef),
      description: getCurrent(descriptionInputRef),
      id: ''
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
