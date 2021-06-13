import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';

const Image = styled.img`
  margin: 1rem;
`;

function joinWords(keywords) {
  return keywords.split(' ').join('+');
}

export default function Home(props) {
  const [searchTerms, setSearchTerms] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [books, setBooks] = useState(null);

  const renderResults = () => {
    const validBooks = books.filter(book => book.volumeInfo.imageLinks)

    return validBooks.map((book, i) => {
      return <Image key={i} src={book.volumeInfo.imageLinks.smallThumbnail} alt=""/>
    });
  }

  useEffect(() => {
    console.log('in effect', props, books);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const keywords = joinWords(searchTerms);
    const author = joinWords(searchAuthor);
    const options = {
      method: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${keywords}+inauthor:${author}`,
      params: {
        key: process.env.GOOGLE_BOOKS_KEY,
        country: "US",
      },
    };

    let results, error;

    try {
      results = await axios.request(options);
    } catch(e) {
      error = e;
    }
    
    if (!error) {
      setBooks(results.data.items);
    } else {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-terms">Search Terms</label>
        <input
          id="search-terms"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {books && renderResults()}
    </div>
  );
}
