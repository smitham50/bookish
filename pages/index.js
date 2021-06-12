import React, { useEffect } from 'react';
import axios from "axios";

export default function Home(props) {
  useEffect(() => {
    console.log('in effect', props);
  });

  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export async function getStaticProps() {
  const options = {
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=sound+inauthor:falkner",
    params: {
      key: process.env.GOOGLE_BOOKS_KEY,
      country: "US",
    },
  };

  let data;
  try {
    const resp = await axios.request(options);
    data = resp.data;
    console.log(resp.data);
  } catch (e) {
    console.error(e)
  }
  // console.log("in get static props", resp.data);

  return {
    props: {
      results: data || 'none'
    },
  };
}
