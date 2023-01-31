import classes from './MeetupDetail.module.scss';
import { MeetUp } from '@/interfaces/meetups';

function MeetupDetail(props: MeetUp) {
  
  return (
    <section className={classes.detail}>

      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
