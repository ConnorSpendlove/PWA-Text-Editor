const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jateDB')) {
        db.createObjectStore('jateDB', { keyPath: 'id', autoIncrement: true });
        console.log('jateDB database created');
      } else {
        console.log('jateDB database already exists');
      }
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  try {
    const editorDb = await openDB('jateDB', 1);
    const tx = editorDb.transaction('jateDB', 'readwrite');
    const store = tx.objectStore('jateDB');
    const request = store.put({ editor: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch (error) {
    console.error('Error putting data to the database:', error);
    throw error; // Rethrow the error to handle it outside of this function if needed
  }
};

export const getDb = async () => {
  console.log('GET from the database');
  try {
    const editorDb = await openDB('jateDB', 1);
    const tx = editorDb.transaction('jateDB', 'readonly');
    const store = tx.objectStore('jateDB');
    const request = store.getAll();
    const result = await request;
    console.log('Retrieved data from the database:', result);
    return result;
  } catch (error) {
    console.error('Error getting data from the database:', error);
    throw error; // Rethrow the error to handle it outside of this function if needed
  }
};

initdb();
