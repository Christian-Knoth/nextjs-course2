import Layout from '@/components/layout/Layout'
import { MeetUp } from '@/interfaces/meetups'
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

export default function Home() {
  return (
    <MeetupList meetups={dummieMeetups} />
  )
}
