import { Rnd } from 'react-rnd';

const Chat = (): JSX.Element => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#f0f0f0',
    visually: 'hidden',
  };

  return (
    <Rnd
      style={style}
      default={{
        x: 150,
        y: 205,
        width: 500,
        height: 190,
      }}
      minWidth={500}
      minHeight={190}
      bounds="window"
    >
      RND
    </Rnd>
  );
};

export default Chat;
