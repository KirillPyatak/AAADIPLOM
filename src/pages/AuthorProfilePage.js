import React from 'react';
import AuthorProfile from '../components/AuthorProfile';
import AuthorPublications from '../components/AuthorPublications';
import { useParams } from 'react-router-dom';

function AuthorProfilePage() {
  const { authorId } = useParams();

  return (
    <div>
      <h2>Author Profile</h2>
      <AuthorProfile authorId={authorId} />
      <AuthorPublications authorId={authorId} />
    </div>
  );
}

export default AuthorProfilePage;
