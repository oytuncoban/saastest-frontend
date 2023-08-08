/* eslint-disable import/prefer-default-export */

export type LoginData = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
};

export type LoginResponse = {
  data: Pick<LoginData, 'email'>;
};

export function login(data: LoginData) {
  return new Promise((resolve: (value: LoginResponse) => void) => {
    setTimeout(() => {
      resolve({
        data: {
          email: data.email,
        },
      });
    }, 1000);
  });
}
