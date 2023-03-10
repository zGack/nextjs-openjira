import moongose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';

type Data = 
  | { message: string }
  | IEntry
  | null

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;
  
  if ( !moongose.isValidObjectId( id ) ) {
    return res.status(400).json({ message: 'ID no valid' })
  }

  switch ( req.method ) {
    case 'GET':
      return getEntry( req, res );

    case 'PUT':
      return updateEntry( req, res );

    case 'DELETE':
      return deleteEntry( req, res );

    default:
      return res.status(400).json({ message: 'Metodo invalido' })
  }
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {

  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById( id );

  if ( !entryToUpdate ){
    await db.disconnect();
    return res.status(400).json({ message: 'No hay entrada con ese ID' + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate( 
      id, 
      { 
        description, 
        status 
      }, 
      { 
        runValidators: true, 
        new: true 
      }
    ); 
    await db.disconnect();
    res.status(200).json( updatedEntry! );
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message});
  }
  
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {

  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById( id );
  await db.disconnect();

  if ( !entry ){
    return res.status(400).json({ message: 'No hay entrada con ese ID' + id });
  }

  try {
    res.status(200).json( entry );
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message});
  }
  
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {

  const { id } = req.query;

  await db.connect();

  const entryToDelete = await Entry.findByIdAndDelete( id );

  await db.disconnect();

  if ( !entryToDelete ){
    return res.status(400).json({ message: 'No hay entrada con ese ID' + id });
  }

  try {
    res.status(200).json( entryToDelete );
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message});
  }
  
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
}