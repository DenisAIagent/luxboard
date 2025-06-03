import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  email,
} from 'react-admin';

export const Role = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  CONCIERGE: 'concierge',
  USER: 'user'
} as const;

export type Role = typeof Role[keyof typeof Role];

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Rôle" />
      <DateField source="createdAt" label="Créé le" />
      <DateField source="updatedAt" label="Mis à jour le" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={[required(), email()]} />
      <PasswordInput source="password" label="Mot de passe" />
      <SelectInput
        source="role"
        label="Rôle"
        choices={Object.values(Role).map(role => ({
          id: role,
          name: role,
        }))}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={[required(), email()]} />
      <PasswordInput source="password" label="Mot de passe" validate={required()} />
      <SelectInput
        source="role"
        label="Rôle"
        choices={Object.values(Role).map(role => ({
          id: role,
          name: role,
        }))}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
); 