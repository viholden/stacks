import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Events.css';

const POPULAR_TAGS = [
  'Currently Reading',
  'Book Review',
  'Book Club',
  'Library Event',
  'BookTok',
  'Reading Challenge',
  'Author Event',
  'Book Recommendation',
  'Reading Sprint',
  'Book Haul'
];

function Events() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  // Post creation state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Feed state
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Edit state
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState([]);
  
  // Comment state
  const [commentInputs, setCommentInputs] = useState({});
  const [ editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Load posts function (extracted so it can be called after mutations)
  async function loadPosts() {
    try {
      // Use simple getDocs to avoid needing a Firestore composite index
      const postsSnapshot = await getDocs(collection(db, 'posts'));
      
      const postsData = await Promise.all(
        postsSnapshot.docs.map(async (postDoc) => {
          const postData = postDoc.data();
          
          // Get user profile
          let userData = null;
          try {
            const userDoc = await getDoc(doc(db, 'users', postData.userId));
            userData = userDoc.exists() ? userDoc.data() : null;
          } catch (e) {
            // ignore user fetch errors
          }
          
          // Get comments (simple getDocs, no orderBy to avoid index)
          let comments = [];
          try {
            const commentsSnapshot = await getDocs(
              collection(db, 'posts', postDoc.id, 'comments')
            );
            
            if (!commentsSnapshot.empty) {
              comments = await Promise.all(
                commentsSnapshot.docs.map(async (commentDoc) => {
                  const commentData = commentDoc.data();
                  let commentUserData = null;
                  try {
                    const commentUserDoc = await getDoc(doc(db, 'users', commentData.userId));
                    commentUserData = commentUserDoc.exists() ? commentUserDoc.data() : null;
                  } catch (e) {
                    // ignore
                  }
                  return {
                    id: commentDoc.id,
                    ...commentData,
                    userData: commentUserData
                  };
                })
              );
              // Sort comments by createdAt client-side
              comments.sort((a, b) => {
                const aTime = a.createdAt?.seconds || 0;
                const bTime = b.createdAt?.seconds || 0;
                return aTime - bTime;
              });
            }
          } catch (e) {
            // Comments subcollection may not exist
          }
          
          return {
            id: postDoc.id,
            ...postData,
            userData,
            comments
          };
        })
      );
      
      // Sort posts by createdAt descending (newest first) client-side
      postsData.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
      
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  // Load posts on mount and refresh interval
  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    loadPosts().finally(() => setLoading(false));
    
    // Refresh posts every 30 seconds
    const interval = setInterval(loadPosts, 30000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Filter posts by tag
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(posts);
    } else if (activeFilter === 'following') {
      const following = userProfile?.following || [];
      setFilteredPosts(posts.filter(post => 
        following.includes(post.userId) || post.userId === currentUser.uid
      ));
    } else {
      setFilteredPosts(posts.filter(post => 
        post.tags?.includes(activeFilter)
      ));
    }
  }, [activeFilter, posts, userProfile, currentUser]);

  // Handle post image upload
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image must be under 5MB');
        return;
      }
      setPostImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Resize & compress image to base64 (no Storage needed)
  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const maxW = 800, maxH = 800
          const scale = Math.min(maxW / img.width, maxH / img.height, 1)
          const w = Math.round(img.width * scale)
          const h = Math.round(img.height * scale)
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          canvas.getContext('2d').drawImage(img, 0, 0, w, h)
          resolve(canvas.toDataURL('image/jpeg', 0.8))
        }
        img.onerror = reject
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  };

  // Add/remove tags
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  // Create post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = null;
      if (postImage) {
        imageUrl = await uploadImage(postImage);
      }

      await addDoc(collection(db, 'posts'), {
        userId: currentUser.uid,
        content: postContent.trim(),
        tags: selectedTags,
        imageUrl,
        likes: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Reset form and close modal
      setPostContent('');
      setSelectedTags([]);
      setPostImage(null);
      setImagePreview(null);
      setShowCreateModal(false);
      await loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit post
  const startEditingPost = (post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
    setEditTags(post.tags || []);
  };

  const savePostEdit = async (postId) => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        content: editContent.trim(),
        tags: editTags,
        updatedAt: serverTimestamp()
      });
      setEditingPost(null);
      await loadPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deleteDoc(doc(db, 'posts', postId));
      await loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  // Add comment
  const addComment = async (postId) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        userId: currentUser.uid,
        text: commentText,
        createdAt: serverTimestamp()
      });
      
      setCommentInputs({ ...commentInputs, [postId]: '' });
      await loadPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment.');
    }
  };

  // Edit comment
  const startEditingComment = (commentId, text) => {
    setEditingComment(commentId);
    setEditCommentText(text);
  };

  const saveCommentEdit = async (postId, commentId) => {
    try {
      await updateDoc(doc(db, 'posts', postId, 'comments', commentId), {
        text: editCommentText.trim(),
        updatedAt: serverTimestamp()
      });
      setEditingComment(null);
      await loadPosts();
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment.');
    }
  };

  // Delete comment
  const deleteComment = async (postId, commentId) => {
    if (!confirm('Delete this comment?')) return;
    
    try {
      await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
      await loadPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment.');
    }
  };

  // Like post (bonus feature)
  const toggleLike = async (postId, likes) => {
    const hasLiked = likes?.includes(currentUser.uid);
    const newLikes = hasLiked
      ? likes.filter(uid => uid !== currentUser.uid)
      : [...(likes || []), currentUser.uid];

    try {
      await updateDoc(doc(db, 'posts', postId), { likes: newLikes });
      await loadPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  if (!currentUser) return null;

  return (
    <div className="events-page">
      <div className="events-container">
        <h1>Community Events & Posts</h1>

        {/* Floating Action Button */}
        <button 
          className="fab-button"
          onClick={() => setShowCreateModal(true)}
          aria-label="Create new post"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Create Post</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowCreateModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="create-post-card">
                <div className="post-header">
                  <div className="user-avatar">
                    {userProfile?.profilePictureUrl ? (
                      <img src={userProfile.profilePictureUrl} alt="Your avatar" />
                    ) : (
                      <div className="avatar-placeholder">
                        {userProfile?.displayName?.[0] || userProfile?.username?.[0] || '?'}
                      </div>
                    )}
                  </div>
                  <div className="user-info">
                    <strong>{userProfile?.displayName || userProfile?.username || 'You'}</strong>
                  </div>
                </div>

                <form onSubmit={handleCreatePost}>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What are you reading? Share book events, library resources, recommendations..."
                    rows={4}
                    required
                  />

                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Upload preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setPostImage(null);
                          setImagePreview(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="post-tags-section">
                    <label>Tags:</label>
                    <div className="tag-buttons">
                      {POPULAR_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <div className="custom-tag-input">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        placeholder="Custom tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                      />
                      <button type="button" onClick={addCustomTag} className="btn-secondary">
                        Add Tag
                      </button>
                    </div>
                    {selectedTags.length > 0 && (
                      <div className="selected-tags">
                        {selectedTags.map(tag => (
                          <span key={tag} className="selected-tag">
                            #{tag}
                            <button onClick={() => toggleTag(tag)}>✕</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="post-actions">
                    <label className="image-upload-btn">
                      📷 Add Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      type="submit"
                      className="btn-primary btn-large"
                      disabled={isSubmitting || !postContent.trim()}
                    >
                      {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Posts
          </button>
          <button
            className={`filter-btn ${activeFilter === 'following' ? 'active' : ''}`}
            onClick={() => setActiveFilter('following')}
          >
            Following
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="posts-feed">
          {loading ? (
            <p className="loading-text">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="no-posts">No posts yet. Be the first to share!</p>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div
                    className="user-avatar clickable"
                    onClick={() => navigate(`/user/${post.userData?.username}`)}
                  >
                    {post.userData?.profilePictureUrl ? (
                      <img src={post.userData.profilePictureUrl} alt={post.userData.username} />
                    ) : (
                      <div className="avatar-placeholder">
                        {post.userData?.displayName?.[0] || post.userData?.username?.[0] || '?'}
                      </div>
                    )}
                  </div>
                  <div className="user-info">
                    <strong
                      className="clickable-username"
                      onClick={() => navigate(`/user/${post.userData?.username}`)}
                    >
                      {post.userData?.displayName || post.userData?.username || 'Anonymous'}
                    </strong>
                    <span className="post-time">
                      {post.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                  {post.userId === currentUser.uid && (
                    <div className="post-actions-menu">
                      {editingPost === post.id ? (
                        <>
                          <button onClick={() => savePostEdit(post.id)} className="save-btn">
                            Save
                          </button>
                          <button onClick={() => setEditingPost(null)} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditingPost(post)} className="edit-btn">
                            Edit
                          </button>
                          <button onClick={() => deletePost(post.id)} className="delete-btn">
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingPost === post.id ? (
                  <div className="edit-post-form">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                    />
                    <div className="edit-tags">
                      {POPULAR_TAGS.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          className={`tag-btn ${editTags.includes(tag) ? 'active' : ''}`}
                          onClick={() => {
                            if (editTags.includes(tag)) {
                              setEditTags(editTags.filter(t => t !== tag));
                            } else {
                              setEditTags([...editTags, tag]);
                            }
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="post-content">{post.content}</p>
                    {post.imageUrl && (
                      <div className="post-image">
                        <img src={post.imageUrl} alt="Post" />
                      </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="post-tag"
                            onClick={() => setActiveFilter(tag)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Like button */}
                <div className="post-footer">
                  <button
                    className={`like-btn ${post.likes?.includes(currentUser.uid) ? 'liked' : ''}`}
                    onClick={() => toggleLike(post.id, post.likes)}
                  >
                    ❤️ {post.likes?.length || 0}
                  </button>
                  <span className="comment-count">
                    💬 {post.comments?.length || 0} comments
                  </span>
                </div>

                {/* Comments Section */}
                <div className="comments-section">
                  {post.comments && post.comments.length > 0 && (
                    <div className="comments-list">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="comment">
                          <div className="comment-header">
                            <div
                              className="user-avatar small clickable"
                              onClick={() => navigate(`/user/${comment.userData?.username}`)}
                            >
                              {comment.userData?.profilePictureUrl ? (
                                <img src={comment.userData.profilePictureUrl} alt={comment.userData.username} />
                              ) : (
                                <div className="avatar-placeholder">
                                  {comment.userData?.displayName?.[0] || comment.userData?.username?.[0] || '?'}
                                </div>
                              )}
                            </div>
                            <div className="comment-info">
                              <strong
                                className="clickable-username"
                                onClick={() => navigate(`/user/${comment.userData?.username}`)}
                              >
                                {comment.userData?.displayName || comment.userData?.username || 'Anonymous'}
                              </strong>
                              {editingComment === comment.id ? (
                                <div className="edit-comment-form">
                                  <input
                                    type="text"
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                  />
                                  <button onClick={() => saveCommentEdit(post.id, comment.id)} className="save-btn">
                                    Save
                                  </button>
                                  <button onClick={() => setEditingComment(null)} className="cancel-btn">
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <p className="comment-text">{comment.text}</p>
                              )}
                            </div>
                            {comment.userId === currentUser.uid && editingComment !== comment.id && (
                              <div className="comment-actions">
                                <button
                                  onClick={() => startEditingComment(comment.id, comment.text)}
                                  className="edit-btn-small"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteComment(post.id, comment.id)}
                                  className="delete-btn-small"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="add-comment">
                    <div className="user-avatar small">
                      {userProfile?.profilePictureUrl ? (
                        <img src={userProfile.profilePictureUrl} alt="You" />
                      ) : (
                        <div className="avatar-placeholder">
                          {userProfile?.displayName?.[0] || userProfile?.username?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="btn-secondary"
                      disabled={!commentInputs[post.id]?.trim()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
