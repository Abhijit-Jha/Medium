import FullBlog from '../components/FullBlog.tsx';
import { useSpecificBlog } from '../hooks';
import { useParams } from 'react-router-dom';


const DetailedBlog = () => {
  const { id } = useParams();
  const { loading, specificBlog } = useSpecificBlog({ id: id || "" });
 if (loading || ! specificBlog){
  return <>
  Loading...........</>
 }
  return (
    <div>
      <FullBlog blog={specificBlog}  />
    </div>
  );
};

export default DetailedBlog;
