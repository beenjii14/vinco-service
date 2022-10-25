import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from '../../src/models/User';
import { api, encryptPassword, server } from '../../src/utils';

const newUser = {
  name: faker.name.fullName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
};

let token = '';

describe('/api/v1/user', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    server.close();
    mongoose.connection.close();
    mongoose.disconnect();
  });

  test('Should create a new user', async () => {
    const passwordHash = await encryptPassword(faker.internet.password(), 10);
    newUser.password = passwordHash;
    await api
      .post('/api/v1/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const users = await User.find({});
    console.log('benji -> test -> users', users);
    expect(users).toHaveLength(1);
  });

  test('Should create token', async () => {
    await api
      .post('/api/v1/auth')
      .send({ email: newUser.email, password: newUser.password })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        token = response.body.token;
      });
  });

  test('Should create a new user admin', async () => {
    const passwordHash = await encryptPassword(faker.internet.password(), 10);
    newUser.password = passwordHash;
    newUser.role = 'admin';
    newUser.email = faker.internet.email();
    await api
      .post('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const users = await User.find({});
    expect(mongoose.Types.ObjectId.isValid(users[0]._id)).toBe(true);
    expect(users).toHaveLength(2);
  });

  test('Should not create a new user with an existing email', async () => {
    const passwordHash = await encryptPassword(faker.internet.password(), 10);
    newUser.password = passwordHash;
    await api
      .post('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Should get all users', async () => {
    const response = await api
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data).toHaveLength(2);
  });

  test('Should get all users admin', async () => {
    const response = await api
      .get('/api/v1/user?admin=true')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data).toHaveLength(1);
  });

  test('Should get a user by id', async () => {
    const users = await User.find({});
    const response = await api
      .get(`/api/v1/user/${users[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.data[0].name).toBe(newUser.name);
  });

  test('Must validate the id in the parameters', async () => {
    api
      .get('/api/v1/user/123')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('Should update a user by id', async () => {
    const users = await User.find({});
    const newName = faker.name.fullName();
    const response = await api
      .put(`/api/v1/user/${users[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName })
      .expect(200);
    expect(response.body.data.name).toBe(newName);
  });

  test('Should delete a user by id', async () => {
    const users = await User.find({});
    await api
      .delete(`/api/v1/user/${users[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const userAfterDelete = await User.find({});
    expect(userAfterDelete[0].active).toBe(false);
  });
});
