import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove, push } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';

const TravelArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const db = getDatabase();

  useEffect(() => {
    // Reference to the article and comments
    const articleRef = ref(db, `travelEntries/${id}`);
    const commentsRef = ref(db, `travelEntries/${id}/comments`);

    // Fetch article data
    const onArticleValueChange = onValue(articleRef, (snapshot) => {
      if (snapshot.exists()) {
        setArticle(snapshot.val());
      } else {
        console.log('Article not found');
      }
    }, (error) => {
      console.error('Error fetching article:', error);
    });

    // Fetch comments data
    const onCommentsValueChange = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      const commentsList = data ? Object.values(data) : [];
      setComments(commentsList);
    }, (error) => {
      console.error('Error fetching comments:', error);
    });

    // Cleanup listeners on component unmount
    return () => {
      onArticleValueChange();
      onCommentsValueChange();
    };
  }, [id, db]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentsRef = ref(db, `travelEntries/${id}/comments`);
      const newCommentKey = push(commentsRef).key;
      await update(ref(db, `travelEntries/${id}/comments/${newCommentKey}`), { text: newComment });
      setNewComment('');
    }
  };

  const handleDeleteArticle = async () => {
    await remove(ref(db, `travelEntries/${id}`));
    navigate('/articles'); // Redirect to list page
  };

  const handleEditArticle = () => {
    navigate(`/edit-article/${id}`); // Redirect to edit page
  };

  return (
    <div className="p-4">
      {article ? (
        <>
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p>{article.description}</p>
          {article.photoURL && <img src={article.photoURL} alt={article.title} className="w-full h-auto mt-4" />}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Comments</h2>
            <div className="mt-2">
              {comments.map((comment, index) => (
                <p key={index} className="border p-2 rounded-lg mb-2">{comment.text}</p>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Add a comment..."
            />
            <button 
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Comment
            </button>
            {/* Replace 'CURRENT_USER_ID' with the actual logic to get the current user ID */}
            {article.authorId === 'CURRENT_USER_ID' && (
              <>
                <button onClick={handleEditArticle} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Edit Article</button>
                <button onClick={handleDeleteArticle} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Delete Article</button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TravelArticleDetail;
