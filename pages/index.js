import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BlogCard from '../components/Blogcard'

import { GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clagmabn01him01une12q24en/master')

const QUERY = gql`
{
  posts { 
    id,
    title,
    slug,
    content { 
      html
    },
    author {
      name,
      avatar {
        url
      }
    }
    coverPhoto {
        url
    }
  }
}
`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY)
  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map(post => (
          <BlogCard key={post.id} {...post}/>
        ))}
      </main>

    </div>
  )
}
