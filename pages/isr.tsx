import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { url } from "inspector";

interface ISRProps {
  message: string;
}

const ISR: NextPage<ISRProps> = (props) => {
  const { message } = props;
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  const onSubmit = () => {
    router.push("/ssr");

    router.push({
      pathname: "/ssg",
      query: { keyword: "hello" },
    });

    router.back();
    // 이동 시작 시의 이벤트를 구독한다,
    router.events.on("routeChangeStart", (url, { shallow }) => {
      // url에는 이동 대상자의 경로를 부여할 수 있다.
      // shallow는 얕은 라우팅의 경우에는 true가 된다.
    });
    // 이동 완료시에 이벤트를 구독한다.
    router.events.on("routeChangeComplete", (url, { shallow }) => {});
  };

  return (
    <div>
      <Head>
        <title></title>
        <link rel="icon" href="/favcion.ico" />
      </Head>
      <main>
        <p>이 페이지는 ISR을 통해 빌드 시 생성된 페이지입니다.</p>
        <p>{message}</p>
      </main>
      <Link href="/ssr">
        <a>go to ssr</a>
      </Link>
      <Link
        href={{
          pathname: "/ssg",
          query: { keyword: "hello" },
        }}
      ></Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
  const timeStamp = new Date().toLocaleString();
  const message = `${timeStamp}에 이 페이지의 getStaticProps가 실행됐습니다.`;

  return {
    props: {
      message,
    },
    revalidate: 60,
  };
};

export default ISR;
