import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthorProfile, AuthorLink, AuthorActivity } from '../components/AuthorProfile';
import AuthorPublications from '../components/AuthorPublications';
import '../style/AuthorProfilePage.css';

function AuthorProfilePage() {
  const { authorId } = useParams();

  return (
    <div className="author-profile-page">
      <div className="profile-container">
        <div className="center-section">
          <div className="main-info">
            <AuthorProfile authorId={authorId} />
              <AuthorActivity authorId={authorId} />
              <AuthorPublications authorId={authorId} />
          </div>
        </div>
          <AuthorLink authorId={authorId} />
      </div>
    </div>
  );
}

export default AuthorProfilePage;
