import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MeetUp } from "@/interfaces/meetups";
import { MongoClient, ObjectId, ObjectID } from "mongodb";

function Meet (props: {meetupData: MeetUp}){
    const meetup = props.meetupData;
    console.log("meetup", meetup);
    return (
        <MeetupDetail
            id={meetup.id}
            title={meetup.title}
            image={meetup.image}
            address={meetup.address}
            description={meetup.description}
        />
    );
};

/*
alle möglichen Paths will man vorher wissen (getServerSideProps wäre immer noch zu oft)
-> und diese sollte man vorher wissen, braucht extra db request
*/
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://cknt10:QFiSODxxCIXAHXQF@crawler1.cv24yzr.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    //unteres muss man halt wissen
    const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

    console.log("statnas", meetups.map(meetup => ({
            
        params: { meetupId: meetup._id.toString() },
    })));

    client.close();

    return {
        fallback: false, //false -> wenn einer abgefrate prop nicht supported wird dann schickt er 404 raus
        //true, dann probiert next js dynmisch für den eingeangen request eine SEite zu bauen -> man kann insofern sachen vorher rendern lassen oder  just in time bei z-B selteneren Anfragen
        paths: meetups.map(meetup => ({
            
            params: { meetupId: meetup._id.toString() },
        }))/*[
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            },
        ]*/
    }
}

//oben werden die paths bezogen (um zu wissen was überhaupt geht) und dann wird hier unten entsprechend gerendert
export async function getStaticProps(context: any) {//wenn das eine  pages-Seite ist und diese dynmaisch ist dann gibt es einen context den man nutzen kann(), sieht aber anders aus)
    
    const meetupId = context.params.meetupId;
    console.log("meetupIdmomentan",meetupId);

    const client = await MongoClient.connect('mongodb+srv://cknt10:QFiSODxxCIXAHXQF@crawler1.cv24yzr.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
  
    const meetupsCollection = db.collection('meetups');
  
    //unteres muss man halt wissen
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId.createFromHexString(meetupId)}/*{}, { projection: {_id: meetupId}}*/);


    client.close();


    console.log("sel",selectedMeetup);
    return {
        props: {
            meetupData:  selectedMeetup ? {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            } : {}
        }
    }
}

export default Meet