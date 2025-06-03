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
} from 'react-admin';

export const OfferType = {
  DISCOUNT: 'discount',
  BONUS: 'bonus',
  GIFT: 'gift',
  OTHER: 'other'
} as const;

export const ValueType = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  POINTS: 'points'
} as const;

export type OfferType = typeof OfferType[keyof typeof OfferType];
export type ValueType = typeof ValueType[keyof typeof ValueType];

export const OfferList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="titre" label="Titre" />
      <ReferenceField source="providerId" reference="providers" label="Prestataire" />
      <TextField source="typeOffre" label="Type" />
      <TextField source="valeurType" label="Type de valeur" />
      <NumberInput source="valeurMontant" label="Montant" />
      <DateField source="dateDebut" label="Date de début" />
      <DateField source="dateFin" label="Date de fin" />
      <TextField source="statusActif" label="Statut" />
    </Datagrid>
  </List>
);

export const OfferEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" label="Titre" validate={required()} />
      <ReferenceInput source="providerId" reference="providers" label="Prestataire">
        <SelectInput optionText="nom" validate={required()} />
      </ReferenceInput>
      <SelectInput
        source="typeOffre"
        label="Type d'offre"
        choices={Object.values(OfferType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <SelectInput
        source="valeurType"
        label="Type de valeur"
        choices={Object.values(ValueType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <NumberInput source="valeurMontant" label="Montant" />
      <TextInput source="codePromo" label="Code promo" />
      
      <TextInput source="dateDebut" label="Date de début" type="datetime-local" validate={required()} />
      <TextInput source="dateFin" label="Date de fin" type="datetime-local" validate={required()} />
      
      <ArrayInput source="joursValides" label="Jours valides">
        <SimpleFormIterator>
          <TextInput source="jour" label="Jour" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <TextInput source="heuresValides" label="Heures valides" />
      
      <ArrayInput source="conditions" label="Conditions">
        <SimpleFormIterator>
          <TextInput source="condition" label="Condition" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <NumberInput source="nombreUtilisations" label="Nombre d'utilisations" />
      <NumberInput source="limiteUtilisations" label="Limite d'utilisations" />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const OfferCreate = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="titre" label="Titre" validate={required()} />
      <ReferenceInput source="providerId" reference="providers" label="Prestataire">
        <SelectInput optionText="nom" validate={required()} />
      </ReferenceInput>
      <SelectInput
        source="typeOffre"
        label="Type d'offre"
        choices={Object.values(OfferType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <SelectInput
        source="valeurType"
        label="Type de valeur"
        choices={Object.values(ValueType).map(type => ({
          id: type,
          name: type,
        }))}
        validate={required()}
      />
      <NumberInput source="valeurMontant" label="Montant" />
      <TextInput source="codePromo" label="Code promo" />
      
      <TextInput source="dateDebut" label="Date de début" type="datetime-local" validate={required()} />
      <TextInput source="dateFin" label="Date de fin" type="datetime-local" validate={required()} />
      
      <ArrayInput source="joursValides" label="Jours valides">
        <SimpleFormIterator>
          <TextInput source="jour" label="Jour" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <TextInput source="heuresValides" label="Heures valides" />
      
      <ArrayInput source="conditions" label="Conditions">
        <SimpleFormIterator>
          <TextInput source="condition" label="Condition" />
        </SimpleFormIterator>
      </ArrayInput>
      
      <NumberInput source="limiteUtilisations" label="Limite d'utilisations" />
      
      <ArrayInput source="photos" label="Photos">
        <SimpleFormIterator>
          <TextInput source="url" label="URL de la photo" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
); 