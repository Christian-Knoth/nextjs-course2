import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { MeetUp } from "@/interfaces/meetups";

export default function NewMeet (){
    function onAddMeetup(enteredMeetupData: MeetUp) {
        console.log("new meet", enteredMeetupData);
    }

    return <NewMeetupForm onAddMeetup={onAddMeetup}/>
}