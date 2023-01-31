import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { MeetUp } from "@/interfaces/meetups";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function NewMeet (){
    const router = useRouter();

    async function onAddMeetup(enteredMeetupData: MeetUp) {
        console.log("new meet", enteredMeetupData);

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log("data", data);

        router.push('/');
    }

    return (
        <Fragment>
                  <Head>
                    <title>React New Meetup</title>
                    <meta name='description' content='Deploy a new Meetup'/>
                </Head>
            <NewMeetupForm onAddMeetup={onAddMeetup}/>
        </Fragment>
        )
}