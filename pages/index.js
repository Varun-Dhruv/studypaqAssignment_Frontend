import Head from "next/head";
import Image from "next/image";
import { render } from "react-dom";
import useFetch from "../components/useFetch";
import styles from "../styles/Home.module.css";
import Error from "../components/Error";

export const getStaticProps = async () => {
  //const res = await fetch("https://www.reddit.com/r/images/new.json?limit=30");

  let url = `http://${process.env.HOST}:${process.env.PORT}/images/`;
  let username = process.env.USER_NAME;
  let password = process.env.PASSWORD;

  let headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64")
  );
  const res = await fetch(url, {
    method: "GET",
    headers: headers,
    //credentials: 'user:passwd'
  });
  let err = false;
  if (res.status != 200) {
    err = true;
  }
  
  const data = await res.json();
  console.log(data);
  //const data=JSON.parse(JSON.stringify(res));
  return {
    props: { "images": data.images, error: err },
  };
};

export default function Home({ images, error }) {
  return (
    <div>
      <h1 className={styles.containertop}>Images</h1>
      <div className={styles.imagescontainer}>
        <div className={styles.container_centered}>
          {!error ? (
            images.map((url, key) => {
              return (
                <Image
                  key={key}
                  src={url}
                  className={styles.image}
                  width={250}
                  height={250}
                />
              );
            })
          ) : (
            <div>
              <Error />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
