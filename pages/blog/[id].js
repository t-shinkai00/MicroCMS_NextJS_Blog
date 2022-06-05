import { client } from "../../libs/client";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{`publishedAt: ${blog.publishedAt}`}</p>
      <p className={styles.updatedAt}>{`updatedAt: ${blog.updatedAt}`}</p>
      {console.log(blog.image)}
      <Image
        src={blog.image.url}
        alt={blog.title}
        height={blog.image.height}
        width={blog.image.width}
      />
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  // fallback: falseはgetStaticPathsで返されないパスをすべて404ページで返す
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
