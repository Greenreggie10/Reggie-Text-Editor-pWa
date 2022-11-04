import { openDB } from 'idb';
// import 'regenerator-runtime/runtime';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  if (!content) {
    console.error('putDb not implemented');
  }
  console.log('POST to the database');
  // Create a connection to the database and specify the version we want to use.
  const textDB = await openDB('jate', 1);
  // Create a new transaction and specify the store and data privileges.
  const tx = textDB.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .add() method on the store and pass in the content.
  const request = store.put({id: 1, value: content});
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the IndexedDB database and the version we want to use.
  const textDB = await openDB('jate', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = textDB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result?.value);
  return result?.value;
};


initdb();
