import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeNote = () => ({
  __typename: 'Note',
  id: 'abc123',
  user: null,
  title: 'Morning Visit',
  description: 'Client was great!'
});

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN']
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  LocalStorageMock,
  fakeNote,
  fakeUser
};
