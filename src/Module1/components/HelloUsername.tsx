/**
 * Create a component which accepts a username prop and renders a greeting using h1
 * If no username is passed, then it must have a default value of 'World'
 */

type Props = {
  name?: string;
};

const HelloUsername: React.FC<Props> = ({ name = 'World' }) => {
  return <h1>Hello {name}!</h1>;
};

export default HelloUsername;
