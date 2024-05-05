import { openDB } from 'idb';

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


export const putDb = async (content) => {
  try {
    console.log('PUT to the db');
    const jateDb = await openDB('jate', 1);
    const rw = jateDb.transaction('jate', 'readwrite');
    const store = rw.objectStore('jate');
    const req = store.put({ content });
    const res = await req;
    console.log('New record', res);
  } catch(err) {
    console.error('Failed to get data from the jate database', err);
  }

};

export const getDb = async () => {
  try {
  console.log('GET to the db');
  const jateDb = await openDB('jate', 1);
  const ro = jateDb.transaction('jate', 'readonly');
  const store = ro.objectStore('jate');
  const req = store.getAll();
  const res = await req;
  console.log('Data retrieved from db', res);
  } catch (err) {
  console.log('Failed to retrieve data from db');
  }
};

initdb();
