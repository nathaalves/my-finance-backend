import supertest from 'supertest';
import { app } from '../../src/app';
import { generateToken } from '../../src/utils/handleToken';
import {
  generateTransactionInfo,
  generateUuid,
} from '../factories/transactionFactory';
import {
  generateSignupInformations,
  generatePayload,
} from '../factories/userFactory';
import { setTests } from '../setTests';

const request = supertest(app);

setTests();

describe('Add transaction', () => {
  it('should add a transaction with success', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const { body: content } = await request.get('/content').set({
      Authorization: `Bearer ${accessToken}`,
    });

    const transactionInfo = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const result = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('id');
  });

  it('should not allow add a transaction if body have invalid informations', async () => {
    const transactionInfo = generateTransactionInfo({
      categoryId: 'inválid-id',
      description: '',
      note: '',
    });

    const result = await request
      .post('/transaction/create')
      .send(transactionInfo);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toHaveProperty('details');
  });

  it('should not allow add a transaction if token was not sent', async () => {
    const transactionInfo = generateTransactionInfo();

    const result = await request
      .post('/transaction/create')
      .send(transactionInfo);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token não encontrado.');
  });

  it('should not allow add a transaction if token is invalid', async () => {
    const transactionInfo = generateTransactionInfo();

    const result = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: 'Bearer invalid-token',
      });

    expect(result.status).toBe(498);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token expirado ou inválido.');
  });

  it('should not allow add a transaction if session does not exists', async () => {
    const payload = generatePayload();
    const token = generateToken(payload);
    const transactionInfo = generateTransactionInfo();

    const result = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Sessão não encontrada.');
  });
});

describe('Delete transaction', () => {
  it('should delete transaction with success', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const { body: content } = await request.get('/content').set({
      Authorization: `Bearer ${accessToken}`,
    });

    const transactionInfo = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const {
      body: { id: transactionId },
    } = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    const result = await request
      .delete(`/transaction/delete/${transactionId}`)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Transação deletada com sucesso.');
  });

  it('should not allow delete transaction if id param is invalid', async () => {
    const result = await request.delete(`/transaction/delete/invalidId`);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toHaveProperty('details');
  });

  it('should not allow delete transaction if token was not sent', async () => {
    const transactionId = generateUuid();

    const result = await request.delete(`/transaction/delete/${transactionId}`);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token não encontrado.');
  });

  it('should not allow delete transaction if token is invalid', async () => {
    const transactionId = generateUuid();

    const result = await request
      .delete(`/transaction/delete/${transactionId}`)
      .set({
        Authorization: `Bearer invalid-token`,
      });

    expect(result.status).toBe(498);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token expirado ou inválido.');
  });

  it('should not allow delete transaction if session does not exists', async () => {
    const payload = generatePayload();
    const token = generateToken(payload);
    const transactionId = generateUuid();

    const result = await request
      .delete(`/transaction/delete/${transactionId}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Sessão não encontrada.');
  });

  it('should not allow delete transaction if transaction does not exists', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const transactionId = generateUuid();

    const result = await request
      .delete(`/transaction/delete/${transactionId}`)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Transação não encontrada.');
  });

  it('should not allow delete transaction if it does not belongs user', async () => {
    const signupInformationsUser1 = generateSignupInformations();
    const { email: emailUser1, password: passwordUser1 } =
      signupInformationsUser1;

    await request.post('/auth/signup').send(signupInformationsUser1);

    const {
      body: { accessToken: accessTokenUser1 },
    } = await request
      .post('/auth/signin')
      .send({ email: emailUser1, password: passwordUser1 });

    const { body: content } = await request.get('/content').set({
      Authorization: `Bearer ${accessTokenUser1}`,
    });

    const transactionInfo = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const {
      body: { id: transactionId },
    } = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessTokenUser1}`,
      });

    const signupInformationsUser2 = generateSignupInformations();
    const { email: emailUser2, password: passwordUser2 } =
      signupInformationsUser2;

    await request.post('/auth/signup').send(signupInformationsUser2);

    const {
      body: { accessToken: accessTokenUser2 },
    } = await request
      .post('/auth/signin')
      .send({ email: emailUser2, password: passwordUser2 });

    const result = await request
      .delete(`/transaction/delete/${transactionId}`)
      .set({
        Authorization: `Bearer ${accessTokenUser2}`,
      });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Transação não pertence ao usuário.');
  });
});

describe('Update transaction', () => {
  it('should update transaction with success', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const { body: content } = await request.get('/content').set({
      Authorization: `Bearer ${accessToken}`,
    });

    const transactionInfo = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const {
      body: { id: transactionId },
    } = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    const transactionInfoToUpdate = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfoToUpdate)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(result.status).toBe(200);
    expect(transactionInfoToUpdate.description).toBe(result.body.description);
    expect(transactionInfoToUpdate.note).toBe(result.body.note);
    expect(transactionInfoToUpdate.value).toBe(result.body.value);
  });

  it('should not allow update transaction if id param is invalid', async () => {
    const result = await request.put(`/transaction/update/invalidId`);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toHaveProperty('details');
  });

  it('should not allow update transaction if body is invalid', async () => {
    const transactionInfo = generateTransactionInfo({
      description: '',
      note: '',
      categoryId: 'inivavlid-id',
    });
    const transactionId = generateUuid();

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toHaveProperty('details');
  });

  it('should not allow update transaction if token was not sent', async () => {
    const transactionInfo = generateTransactionInfo();
    const transactionId = generateUuid();

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo);

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token não encontrado.');
  });

  it('should not allow update transaction if token is invalid', async () => {
    const transactionInfo = generateTransactionInfo();
    const transactionId = generateUuid();

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo)
      .set({
        Authorization: `Bearer invalid-token`,
      });

    expect(result.status).toBe(498);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Token expirado ou inválido.');
  });

  it('should not allow update transaction if session does not exists', async () => {
    const payload = generatePayload();
    const token = generateToken(payload);
    const transactionId = generateUuid();
    const transactionInfo = generateTransactionInfo();

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Sessão não encontrada.');
  });

  it('should not allow update transaction if transaction does not exists', async () => {
    const signupInformations = generateSignupInformations();
    const { email, password } = signupInformations;
    const transactionId = generateUuid();
    const transactionInfo = generateTransactionInfo();

    await request.post('/auth/signup').send(signupInformations);

    const {
      body: { accessToken },
    } = await request.post('/auth/signin').send({ email, password });

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(result.status).toBe(404);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Transação não encontrada.');
  });

  it('should not allow update transaction if it does not belongs to user', async () => {
    const signupInformationsUser1 = generateSignupInformations();
    const { email: emailUser1, password: passwordUser1 } =
      signupInformationsUser1;

    await request.post('/auth/signup').send(signupInformationsUser1);

    const {
      body: { accessToken: accessTokenUser1 },
    } = await request
      .post('/auth/signin')
      .send({ email: emailUser1, password: passwordUser1 });

    const { body: content } = await request.get('/content').set({
      Authorization: `Bearer ${accessTokenUser1}`,
    });

    const transactionInfo = generateTransactionInfo({
      categoryId: content.inflow.categories[0].id,
    });

    const {
      body: { id: transactionId },
    } = await request
      .post('/transaction/create')
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessTokenUser1}`,
      });

    const signupInformationsUser2 = generateSignupInformations();
    const { email: emailUser2, password: passwordUser2 } =
      signupInformationsUser2;

    await request.post('/auth/signup').send(signupInformationsUser2);

    const {
      body: { accessToken: accessTokenUser2 },
    } = await request
      .post('/auth/signin')
      .send({ email: emailUser2, password: passwordUser2 });

    const result = await request
      .put(`/transaction/update/${transactionId}`)
      .send(transactionInfo)
      .set({
        Authorization: `Bearer ${accessTokenUser2}`,
      });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('Transação não pertence ao usuário.');
  });
});
