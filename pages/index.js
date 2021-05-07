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
          <h2 className={styles.subHeader}>What is Vercel?</h2>
          {process.env.API_KEY}
          <ul className={styles.context}>
            <li>Deployment platform for static sites</li>
            <li>Host websites and web services that deploy instantly and scale automatically – all without any configuration</li>
            <li>Triggers a deploy when you commit a change to git</li>
          </ul>
        </div>

        <div className={styles.topic}>
          <h2 className={styles.subHeader}>Features of Vercel</h2>
          <ul className={styles.context}>
            <li>Add custom domain</li>
            <li>Environment: Production, Preview and Development --- this is Preview!</li>
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

      </main>
    </div>
  )
}
