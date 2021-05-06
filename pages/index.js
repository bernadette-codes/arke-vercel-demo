import React, { useState, useEffect } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("Vercel & Next.js Demo");
  const [memeImage, setmemeImage] = useState("https://i.imgur.com/qcwCIUL.jpg");
  const [quoteContent, setQuoteContent] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  async function getMessage() {
    const res = await fetch("/api/message");
    const newMessage = await res.text();
    const parsedData = JSON.parse(newMessage)
    setMessage(parsedData.message);
    console.log("newMessage", parsedData)
  }

  async function getNewMeme() {
    setmemeImage('/placeholder-image.png');

    const res = await fetch("/api/meme");
    const newMeme = await res.text();
    const parsedData = JSON.parse(newMeme)
    setmemeImage(parsedData.image);
  }

  useEffect(() => {
    if (showQuote) {
      axios
        .get("https://api.quotable.io/random")
        .then((response) => {
          setQuoteContent(response.data.content);
        })
        .catch((error) => {
          setQuoteContent(error);
        });
      setShowQuote(false);
    }
  }, [showQuote]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Vercel with Next.js Demo</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.topic}>
          <h1 className={styles.title}>Vercel</h1>
          <ul className={styles.intro}>
            <li>What is Vercel?</li>
            <li>Features of Vercel</li>
            <li>Platform tour</li>
            <li>Demo</li>
          </ul>
        </div>

        <div className={styles.topic}>
          <h2 className={styles.subHeader}>What is Vercel????</h2>
          <ul className={styles.context}>
            <li>Deployment platform for static sites</li>
            <li>Host websites and web services that deploy instantly and scale automatically – all without any configuration</li>
            <li>Builds your project when you trigger a deploy</li>
          </ul>
        </div>

        <div className={styles.topic}>
          <h2 className={styles.subHeader}>Features of Vercel</h2>
          <ul className={styles.context}>
            <li>Add custom domain</li>
            <li>Environment: Production, Preview and Development</li>
            <li>Option to define Environment Variables specific to the environment</li>
            <li>Can deploy Serverless Functions to handle user authentication, form submission, database queries, custom slack commands, and more</li>
            <li>Analytics that collects metrics</li> 
            <li>Logging options</li>
          </ul>
        </div>  

        <div className={styles.topic}>
          <h2 onClick={getMessage} className={styles.demoText}>{message}</h2>

          <img src={memeImage} onClick={getNewMeme} className={styles.meme} />

          <button onClick={() => setShowQuote(true)}  className={styles.button}>Get Quote</button>

          <p className={styles.quote}>{quoteContent}</p>
        </div>







        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
       */}
      </main>
    </div>
  )
}
