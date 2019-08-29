import { ModelBuilder } from '../../helpers/ModelBuilder';
interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  avatar: string
  is_payed_user: string
  created_at: number
  updated_at: number
};

const User = new ModelBuilder<IUser>({
  modelName: 'User',
  tableName: 'users',
  selectableProps: [],
});


export { User };
