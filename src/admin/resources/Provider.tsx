import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  email,
} from 'react-admin';

export const Category = {
  HOTEL: 'hotel',
  RESTAURANT: 'restaurant',
  ACTIVITY: 'activity',
  TRANSPORT: 'transport',
  SHOPPING: 'shopping',
  OTHER: 'other'
} as const;

export const TarifUnit = {
  HOUR: 'hour',
  DAY: 'day',
  NIGHT: 'night',
  PERSON: 'person',
  GROUP: 'group'
} as const;

export const ValidationStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export type Category = typeof Category[keyof typeof Category];
export type TarifUnit = typeof TarifUnit[keyof typeof TarifUnit];
export type ValidationStatus = typeof ValidationStatus[keyof typeof ValidationStatus];

export const ProviderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="nom" label="Nom" />
      <TextField source="category" label="Catégorie" />
      <EmailField source="contactEmail" label="Email" />
      <TextField source="contactTelephone" label="Téléphone" />
      <TextField source="statusValidation" label="Statut" />
      <ReferenceField source="createdById" reference="users" label="Créé par" />
    </Datagrid>
  </List>
);

export const ProviderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nom" label="Nom" validate={required()} />
      <SelectInput
        source="category"
        label="Catégorie"
        choices={Object.values(Category).map(category => ({
          id: category,
          name: category,
        }))}
        validate={required()}
      />
      <TextInput source="description" label="Description" multiline />
      
      <TextInput source="adresseRue" label="Rue" />
      <TextInput source="adresseCodePostal" label="Code postal" />
      <TextInput source="adresseVille" label="Ville" />
      <TextInput source="adressePays" label="Pays" />
      
      <TextInput source="contactTelephone" label="Téléphone" />
      <TextInput source="contactEmail" label="Email" validate={email()} />
      <TextInput source="contactSiteWeb" label="Site web" />
      <TextInput source="contactPersonne" label="Personne à contacter" />
      
      <NumberInput source="tarifMinimum" label="Tarif minimum" />
      <NumberInput source="tarifMaximum" label="Tarif maximum" />
      <SelectInput
        source="tarifUnite"
        label="Unité de tarif"
        choices={Object.values(TarifUnit).map(unit => ({
          id: unit,
          name: unit,
        }))}
      />
      <TextInput source="tarifDevise" label="Devise" />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ArrayInput source="specialites" label="Spécialités">
        <SimpleFormIterator>
          <TextInput source="nom" label="Spécialité" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <NumberInput source="capaciteMax" label="Capacité maximale" />
      <NumberInput source="rating" label="Note" />
      <NumberInput source="nombreAvis" label="Nombre d'avis" />
      
      <SelectInput
        source="statusValidation"
        label="Statut de validation"
        choices={Object.values(ValidationStatus).map(status => ({
          id: status,
          name: status,
        }))}
      />
    </SimpleForm>
  </Edit>
);

export const ProviderCreate = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nom" label="Nom" validate={required()} />
      <SelectInput
        source="category"
        label="Catégorie"
        choices={Object.values(Category).map(category => ({
          id: category,
          name: category,
        }))}
        validate={required()}
      />
      <TextInput source="description" label="Description" multiline />
      
      <TextInput source="adresseRue" label="Rue" />
      <TextInput source="adresseCodePostal" label="Code postal" />
      <TextInput source="adresseVille" label="Ville" />
      <TextInput source="adressePays" label="Pays" />
      
      <TextInput source="contactTelephone" label="Téléphone" />
      <TextInput source="contactEmail" label="Email" validate={email()} />
      <TextInput source="contactSiteWeb" label="Site web" />
      <TextInput source="contactPersonne" label="Personne à contacter" />
      
      <NumberInput source="tarifMinimum" label="Tarif minimum" />
      <NumberInput source="tarifMaximum" label="Tarif maximum" />
      <SelectInput
        source="tarifUnite"
        label="Unité de tarif"
        choices={Object.values(TarifUnit).map(unit => ({
          id: unit,
          name: unit,
        }))}
      />
      <TextInput source="tarifDevise" label="Devise" />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ArrayInput source="specialites" label="Spécialités">
        <SimpleFormIterator>
          <TextInput source="nom" label="Spécialité" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <NumberInput source="capaciteMax" label="Capacité maximale" />
    </SimpleForm>
  </Edit>
); 