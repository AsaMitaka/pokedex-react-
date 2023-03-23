import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <section>
      <h1>Error</h1>
      <p>Opps, page dont find</p>
      <button onClick={handleBack}>Go Back</button>
    </section>
  );
}
