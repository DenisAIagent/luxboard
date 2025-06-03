import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { ProviderList, ProviderEdit, ProviderCreate } from './resources/Provider';
import { OfferList, OfferEdit, OfferCreate } from './resources/Offer';
import { EventList, EventEdit, EventCreate } from './resources/Event';
import { UserList, UserEdit, UserCreate } from './resources/User';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';

export const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    title="LuxBoard Admin"
    theme={{
      palette: {
        primary: {
          main: '#1a1a1a',
        },
        secondary: {
          main: '#c9a959',
        },
      },
    }}
  >
    <Resource
      name="providers"
      list={ProviderList}
      edit={ProviderEdit}
      create={ProviderCreate}
      icon={RestaurantIcon}
    />
    <Resource
      name="offers"
      list={OfferList}
      edit={OfferEdit}
      create={OfferCreate}
      icon={LocalOfferIcon}
    />
    <Resource
      name="events"
      list={EventList}
      edit={EventEdit}
      create={EventCreate}
      icon={EventIcon}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={PeopleIcon}
    />
  </Admin>
); 