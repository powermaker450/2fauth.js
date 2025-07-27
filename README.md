# 2fauth.js

A JavaScript module for interacting with a [2FAuth](https://2fauth.app) instance.

## Usage
1. Initialize your project using `npm` and/or `tsc`.
```bash
mkdir new-project
cd new-project

npm init -y
tsc --init
```

2. Install the module.
```bash
# with npm
npm add @povario/2fauth.js

# OR with pnpm
pnpm add @povario/2fauth.js
```

3. Get your API URL and token and have fun:
```ts
import { TwoAuthApi } from "@povario/2fauth.js";

async function main() {
  const api = new TwoAuthApi("http://your-api-url-here", "your-token-here");
  const res = await api.accounts.getAll();

  console.log(res);
}

main();
```

## Additional info
I won't go into the full documentation of the 2FAuth API, as that can be viewed [here](https://docs.2fauth.app/resources/rapidoc.html). However, the following documented API routes correspond to the following method calls:

### Groups

- **GET** `/api/v1/groups`:
```ts
await api.groups.getAll();
```

- **POST** `/api/v1/groups`:
```ts
await api.groups.create("groupName");
```

- **GET** `/api/v1/groups/{id}`:
```ts
// with "1" being a group ID

await api.groups.get(1);
```

- **PUT** `/api/v1/groups/{id}`:
```ts
// with "1" being a group ID

await api.groups.update(1, "newGroupName");
```

- **DELETE** `/api/v1/groups/{id}`:
```ts
// with "1" being a group ID

await api.groups.delete(1);
```

- **POST** `/api/v1/groups/{id}/assign`:
```ts
// with "1" being a group ID and "1, 2, 3" being IDs of accounts

await api.groups.assign(1, [1, 2, 3]);
```

- **GET** `/api/v1/groups/{id}/twofaccounts`:
```ts
// with "1" being a group ID and setting the method to return accounts with their secrets as well

await api.groups.getAccounts<true>(1, true);
```

---

### Icons

- **POST** `/api/v1/icons`:
```ts
// with "image" being a FormData containing a single image

await api.icons.upload(image);
```

- **POST** `/api/v1/icons/default`:
```ts
await api.icons.query({
  service: "1password",
  iconCollection: "selfh"
});
```

- **DELETE** `/api/v1/icons/{filename}`:
```ts
await api.icons.delete("filename.png");
```

---

### OTP

- **GET** `/api/v1/twofaccounts/{id}/otp`:
```ts
// with "1" being an account ID

await api.otp.get(1);
```

- **POST** `/api/v1/twofaccounts/otp`:
```ts
// with an object containing a TOTP account

await api.otp.create({
  service: "MySite",
  account: "john.doe",
  icon: "ZMlzmrPsrWSWVt4fZouFVrt2w38D0PnXiyZQvDcY.png",
  otp_type: "totp",
  secret: "GJTGC5LUNA",
  digits: 6,
  algorithm: "sha1",
  period: 30,
  counter: 15,
  group_id: 1
});
```

---

### QRCode

- **GET** `/api/v1/twofaccounts/{id}/qrcode`:
```ts
// with "1" being an account ID

await api.qrcode.get(1);
```

- **POST** `/api/v1/qrcode/decode`:
```ts
// with "qrCode" being a FormData containing a QR Code image

await api.qrcode.decode(qrCode);
```

---

### Settings

- **GET** `/api/v1/settings`:
```ts
await api.settings.getAll();
```

- **POST** `/api/v1/settings`:
```ts 
// with an object containing an example setting

await api.settings.add({
  key: "useEncryption",
  value: true
});
```

- **GET** `/api/v1/settings/{name}`:
```ts
await api.settings.get("settingName");
```

- **PUT** `/api/v1/settings/{name}`:
```ts
await api.settings.update("settingName", "newSettingValue");
```

- **DELETE** `/api/v1/settings/{name}`:
```ts
await api.settings.delete("settingName");
```

---

### TwoFAccounts

- **GET** `/api/v1/twofaccounts`:
```ts
// setting the method to return the accounts with their secrets

await api.accounts.getAll<true>();
```

- **POST** `/api/v1/twofaccounts`:
```ts
// with a TOTP account object

await api.accounts.create({
  service: "MySite",
  account: "john.doe",
  icon: "ZMlzmrPsrWSWVt4fZouFVrt2w38D0PnXiyZQvDcY.png",
  otp_type: "totp",
  digits: 6,
  algorithm: "sha1",
  secret: "GJTGC5LUNA",
  period: 30,
  counter: null
});
```

- **DELETE** `/api/v1/twofaccounts`:
```ts
// with "1, 2, 3" being account IDs

await api.accounts.deleteMany([1, 2, 3]);
```

- **GET** `/api/v1/twofaccounts/{id}`:
```ts
// with "1" being an account ID, and returning the secret with it

await api.accounts.get<true>(1, true);
```

- **PUT** `/api/v1/twofaccounts/{id}`:
```ts
// with "1" being an account ID, and updating the account username

await api.accounts.update(1, {
  account: "john.doe",
});
```

- **DELETE** `/api/v1/twofaccounts/{id}`:
```ts
// with "1" being an account ID

await api.accounts.delete(1);
```

- **POST** `/api/v1/twofaccounts/migration`:
```ts
// with a Google Authenticator payload, and returning the secret

await api.accounts.migrate<true>(
  "otpauth-migration://offline?data=w0SnrWITY/RFhILYWNjb3VudF9iaXMaC3NlcnZpY2VfYmlzIAEoATACEAEYASAA",
  true,
);
```

- **POST** `/api/v1/twofaccounts/preview`:
```ts
// with an example OTPAuth URI

await api.accounts.preview("otpauth://totp/MySite:john.doe?secret=GJTGC5LUNA&issuer=MySite&period=30&algorithm=sha1&digits=6&image=https://www.example.com/image.png");
```

- **POST** `/api/v1/twofaccounts/reorder`:
```ts
// with "1, 2, 3" being account IDs

await api.accounts.reorder([1, 2, 3]);
```

- **PATCH** `/api/v1/twofaccounts/withdraw`:
```ts
// with "1, 2, 3" being account IDs

await api.accounts.withdraw([1, 2, 3]);
```

- **GET** `/api/v1/twofaccounts/export`:
```ts
// with "1, 2, 3" being account IDs, and the export type set to "otpauth"

await api.accounts.export<"otpauth">([1, 2, 3], true);
```

- **GET** `/api/v1/groups/{id}/twofaccounts`:
```ts
// with "1" being a group ID, and setting the method to return secrets

await api.accounts.getAllInGroup<true>(1, true);
```

---

### User

- **GET** `/api/v1/user`:
```ts
await api.self.getSelf();
```

---

### User Preference

- **GET** `/api/v1/user/preferences`:
```ts
await api.prefs.getAll();
```

- **GET** `/api/v1/user/preferences/{name}`:
```ts
await api.prefs.get("settingName");
```

- **PUT** `/api/v1/user/preferences/{name}`:
```ts
// explicitly setting the type

await api.prefs.update<string, Setting<string>>("settingName", "newSettingValue");
```

---

### Users

- **GET** `/api/v1/users`:
```ts
await api.users.getAll();
```

- **POST** `/api/v1/users`:
```ts
await api.users.create({
  name: "Name",
  email: "example@example.com",
  password: "password",
  password_confirmation: "password",
  is_admin: false
});
```

- **GET** `/api/v1/users/{id}`:
```ts
// with "1" as a user ID

await api.users.get(1);
```

- **DELETE** `/api/v1/users/{id}`:
```ts
// with "1" as a user ID

await api.users.delete(1);
```

- **PATCH** `/api/v1/users/{id}/promote`:
```ts
// with "1" as a user ID

await api.users.editAdmin(1, true)
```

- **PATCH** `/api/v1/users/{id}/password/reset`:
```ts
// with "1" as a user ID

await api.users.resetPassword(1);
```

- **DELETE** `/api/v1/users/{id}/pats`:
```ts
// with "1" as a user ID

await api.users.revokeATs(1);
```

- **GET** `/api/v1/users/{id}/authentications`:
```ts
// with "1" as a user ID, "5" as the maximum amount of records to return, and "2" as the period of time in months to search

await api.users.getLoginHistory(1, 5, 2);
```

- **DELETE** `/api/v1/users/{id}/credentials`:
```ts
// with "1" as a user ID

await api.users.revokeWebAuthn(1);
```
