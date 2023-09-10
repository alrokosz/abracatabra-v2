import { Cross1Icon } from '@radix-ui/react-icons';

type RemoveButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button onClick={onClick}>
      <Cross1Icon color="limegreen" />
    </button>
  );
}
