import Layout from '../../components/Layout';

const Post = ({ id }) => {
  return (
    <Layout title={`Post ${id}`}>
      <h1>Post #{id}</h1>
      <p>This is post number {id}.</p>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default Post;
