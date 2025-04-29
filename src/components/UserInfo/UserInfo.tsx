import { User } from '../../Types/User';

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <>
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </>
  );
};
