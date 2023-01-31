
import { MeetUp } from '@/interfaces/meetups'
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'

const dummieMeetups: MeetUp[] = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://www.gruppenunterkuenfte.de/img-gruppenhaus/n1200x800/Johanniter-Hotel-Niederweisel__t1652.jpg",
    address: "Nieder-Weisel, Hoch Weisler Weg 1a",
    description: "Es ist toll!"
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://www.wetterauer-zeitung.de/bilder/2015/08/16/12055503/1061379101-102584-2Dea.jpg",
    address: "Nieder-Weisel, Hoch Weisler Weg 1a",
    description: "Es ist schön!"
  }
]


function Home(props: { meetups: MeetUp[]}) {
  /*const [loadedMeetups, setLoadedMeetups] = useState<MeetUp[]>([]);

  useEffect(() => {
    //send http and fetch
    //call setLoaded;eetups();
    setTimeout(() => {
      
      setLoadedMeetups(dummieMeetups);
    }, 2000);
  }, []);
  */

  return (
    //loadedMeetups.length <= 0 ? <div>noch nichts da</div> : 
    //<MeetupList meetups={loadedMeetups} />
    <Fragment>

      <Head>
        <title>React Meetups</title>
        <meta name='description' content='New Next.js example'/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )

  
}
//static site gneration -> innerhalb der Funktion kann irgendwas gemacht werden
//wird nur während build ausgeführt irgendwas mit fs oder so z.B:
//wird nur einmal beim build ausgeführt!!! Email Postfach wäre fhier fail weil imme rneues Deployment erforderlich
export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://cknt10:QFiSODxxCIXAHXQF@crawler1.cv24yzr.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  //konventionen
  return {
    props: {//muss immer objekt sein
      meetups: meetups.map(meetupDatase => ({
        title: meetupDatase.title,
        image: meetupDatase.image,
        address: meetupDatase.address,
        id: meetupDatase._id.toString()
      }))//dummieMeetups
    },
    revalidate: 10 //number of seconds bis react dieses info neu rerendert...sont würde sich das alle sniemals ändern -> react startet dann ein neuen Request
  };//pregenerted und stored und entsprechend auf Standby für Abfrage und somit schneller
}//seitens des clients wird nichts mehr gefetcht

//alternative, die serverseitig bei jeder Anfrage neue Statics generiert -> und nicht beim build
/*
export async function getServerSideProps(context:any) {//wird weiterhin nur auf dem Server ausgeführt
  const req = context.req;
  const res = context.res;//vielleicht will man hier was mit dem User machen oder parameter an die api weitergeben

  return {
    props: {//muss immer objekt sein
      meetups: dummieMeetups
    }
  };//kann cool sein, aber das Ganze wird in echtzeit ausgeführt ..der request muss erstmal durchgegen dann und das dauert
}
*/

export default Home;
