import FullBlog from '../components/FullBlog.tsx';
import { useSpecificBlog } from '../hooks';
import { useParams } from 'react-router-dom';
// import { BlogInterface } from '../hooks'; 

const DetailedBlog = () => {
  const { id } = useParams();
  const { loading, specificBlog } = useSpecificBlog({ id: id || "" });
 if (loading){
  return <>
  Loading...........</>
 }
  return (
    <div>
      <FullBlog blog={specificBlog} loading={false} />
    </div>
  );
};

export default DetailedBlog;
