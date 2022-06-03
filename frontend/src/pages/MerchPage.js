import { useParams } from 'react-router-dom';

function MerchPage() {
  const area = useParams();
  const { slug } = area;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
export default MerchPage;
