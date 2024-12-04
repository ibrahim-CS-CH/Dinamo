interface IUser {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
