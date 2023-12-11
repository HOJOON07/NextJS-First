import { timeStamp } from "console";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

interface SSGProps {
  message: string;
}

const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props;

  return (
    <div>
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon" />
      </Head>
      <main>
        <p>이 페이지는 정적 사이트 생성을 통해 빌드 시 생성된 페이지입니다.</p>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timeStamp = new Date().toLocaleString();
  const message = `${timeStamp}에 ${getStaticProps}가 실행되었습니다.`;
  console.log(message);
  return {
    props: {
      message,
    },
  };
};

export default SSG;
