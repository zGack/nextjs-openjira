import { useSnackbar } from 'notistack';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider: FC<PropsWithChildren<Props>> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE );
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async ( description: string ) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({type: '[Entry] Add-Entry', payload: data});
  }

  const updateEntry = async( { _id, description, status }: Entry, showSnackbar = false ) => {

    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status})

      dispatch({ type: '[Entry] Entry-Updated', payload: data })


      if ( showSnackbar) {
        enqueueSnackbar('Tarea actualizada'  ,{
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
      }

    } catch (error) {
      console.log({ error });
    }
  }

  const deleteEntry = async( _id: string ) => {

    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`);

      dispatch({ type: '[Entry] Delete-Entry', payload: data })

    } catch (error) {
      console.log({ error });
    }
  }

  const refreshEntries = async() => {
    
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data })
  }

  useEffect(() => {
    refreshEntries();
  }, [])
  
  return (
    <EntriesContext.Provider value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}>
      { children }
    </EntriesContext.Provider>
    )
}