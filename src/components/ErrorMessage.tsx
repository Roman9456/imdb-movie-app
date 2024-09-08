type Props = {
  error: string;
};

export default function ErrorMessage({ error }: Props) {
  return <div className="error">{error}</div>;
}
