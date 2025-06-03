import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  ReferenceInput,
  BooleanInput,
} from 'react-admin';

export const EventType = {
  MEETING: 'meeting',
  TASK: 'task',
  REMINDER: 'reminder',
  OTHER: 'other'
} as const;

export const ExclusivityLevel = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  RESTRICTED: 'restricted'
} as const;

export type EventType = typeof EventType[keyof typeof EventType];
export type ExclusivityLevel = typeof ExclusivityLevel[keyof typeof ExclusivityLevel];

export const EventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="titre" label="Titre" />
      <TextField source="typeEvent" label="Type" />
      <TextField source="organisateurNom" label="Organisateur" />
      <TextField source="lieuNom" label="Lieu" />
      <TextField source="niveauExclusivite" label="Niveau d'exclusivité" />
      <TextField source="statusActif" label="Statut" />
      <ReferenceField source="providerId" reference="providers" label="Prestataire" />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" label="Titre" validate={required()} />
      <SelectInput
        source="typeEvent"
        label="Type d'événement"
        choices={Object.values(EventType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <TextInput source="description" label="Description" multiline />
      
      <TextInput source="organisateurNom" label="Nom de l'organisateur" validate={required()} />
      <TextInput source="organisateurContact" label="Contact de l'organisateur" />
      <TextInput source="organisateurTel" label="Téléphone de l'organisateur" />
      
      <TextInput source="lieuNom" label="Nom du lieu" validate={required()} />
      <TextInput source="lieuAdresse" label="Adresse du lieu" validate={required()} />
      
      <ArrayInput source="dates" label="Dates">
        <SimpleFormIterator>
          <TextInput source="date" label="Date" type="date" validate={required()} />
          <TextInput source="heureDebut" label="Heure de début" type="time" validate={required()} />
          <TextInput source="heureFin" label="Heure de fin" type="time" validate={required()} />
          <NumberInput source="placesDisponibles" label="Places disponibles" validate={required()} />
          <NumberInput source="placesReservees" label="Places réservées" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <BooleanInput source="invitationSeule" label="Invitation uniquement" />
      <NumberInput source="prixParPersonne" label="Prix par personne" />
      
      <ArrayInput source="inclus" label="Inclus">
        <SimpleFormIterator>
          <TextInput source="item" label="Élément inclus" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <TextInput source="codeAcces" label="Code d'accès" />
      <TextInput source="dressCode" label="Dress code" />
      
      <ArrayInput source="langues" label="Langues">
        <SimpleFormIterator>
          <TextInput source="langue" label="Langue" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <SelectInput
        source="niveauExclusivite"
        label="Niveau d'exclusivité"
        choices={Object.values(ExclusivityLevel).map(level => ({
          id: level,
          name: level,
        }))}
        validate={required()}
      />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ReferenceInput source="providerId" reference="providers" label="Prestataire">
        <SelectInput optionText="nom" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" label="Titre" validate={required()} />
      <SelectInput
        source="typeEvent"
        label="Type d'événement"
        choices={Object.values(EventType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <TextInput source="description" label="Description" multiline />
      
      <TextInput source="organisateurNom" label="Nom de l'organisateur" validate={required()} />
      <TextInput source="organisateurContact" label="Contact de l'organisateur" />
      <TextInput source="organisateurTel" label="Téléphone de l'organisateur" />
      
      <TextInput source="lieuNom" label="Nom du lieu" validate={required()} />
      <TextInput source="lieuAdresse" label="Adresse du lieu" validate={required()} />
      
      <ArrayInput source="dates" label="Dates">
        <SimpleFormIterator>
          <TextInput source="date" label="Date" type="date" validate={required()} />
          <TextInput source="heureDebut" label="Heure de début" type="time" validate={required()} />
          <TextInput source="heureFin" label="Heure de fin" type="time" validate={required()} />
          <NumberInput source="placesDisponibles" label="Places disponibles" validate={required()} />
        </SimpleFormIterator>
      </ArrayInput>
      
      <BooleanInput source="invitationSeule" label="Invitation uniquement" />
      <NumberInput source="prixParPersonne" label="Prix par personne" />
      
      <ArrayInput source="inclus" label="Inclus">
        <SimpleFormIterator>
          <TextInput source="item" label="Élément inclus" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <TextInput source="codeAcces" label="Code d'accès" />
      <TextInput source="dressCode" label="Dress code" />
      
      <ArrayInput source="langues" label="Langues">
        <SimpleFormIterator>
          <TextInput source="langue" label="Langue" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <SelectInput
        source="niveauExclusivite"
        label="Niveau d'exclusivité"
        choices={Object.values(ExclusivityLevel).map(level => ({
          id: level,
          name: level,
        }))}
        validate={required()}
      />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <ReferenceInput source="providerId" reference="providers" label="Prestataire">
        <SelectInput optionText="nom" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
); 