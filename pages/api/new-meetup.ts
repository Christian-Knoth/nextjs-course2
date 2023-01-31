// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

type Data = {
  message: string,
  result: Object
}

export default async  function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "POST"){

    try {
      
      const data = req.body;
  
      const { title, image, adress, description} = data;
  
      const client = await MongoClient.connect('mongodb+srv://cknt10:QFiSODxxCIXAHXQF@crawler1.cv24yzr.mongodb.net/?retryWrites=true&w=majority');
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);
      console.log("result", result);

      client.close();

      res.status(200).json({ message: "inserted new message", result: result});

    } catch (error) {
      console.log("failed db connection");
    }
  }
  //res.status(200).json({ name: 'John Doe' })
}
