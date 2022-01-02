import { signInWithRedirect } from 'firebase/auth';
import { collection, doc } from 'firebase/firestore';

import {
  collectionRef, docRef, googleProvider, signInRedirectOAuth,
} from '.';

describe('firebase', () => {
  describe('collectionRef', () => {
    it('collection이 호출되어야만 한다', () => {
      collectionRef('id');

      expect(collection).toBeCalledWith(undefined, 'id');
    });
  });

  describe('docRef', () => {
    it('doc이 호출되어야만 한다', () => {
      docRef('collectionId', 'id');

      expect(doc).toBeCalledWith(undefined, 'collectionId', 'id');
    });
  });

  describe('signInRedirectOAuth', () => {
    it('signInWithRedirect가 호출되어야만 한다', () => {
      signInRedirectOAuth(googleProvider);

      expect(signInWithRedirect).toBeCalledWith({ languageCode: 'ko' }, googleProvider);
    });
  });
});
