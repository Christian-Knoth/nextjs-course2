import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";

export default function Meet (){
    return (
        <MeetupDetail
            id={"1"}
            title={"First Meetup"}
            image={"https://www.wetterauer-zeitung.de/bilder/2015/08/16/12055503/1061379101-102584-2Dea.jpg"}
            address={"Somewhere"}
            description={"Schön hier"}
        />
    );
}