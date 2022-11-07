import Head from 'next/head';
import ErrorPage from 'next/error'
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    const router = useRouter();
    if (!router.isFallback && !postData?.id) {
        return <ErrorPage statusCode={404} />
    }
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <h2 className={utilStyles.headingXl}>{postData.title}</h2>
        <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </Layout>
}

export function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData,
        }
    }
}