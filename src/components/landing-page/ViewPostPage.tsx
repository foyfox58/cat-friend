import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  SmilePlus,
  Copy,
  Loader2,
  X,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

import "./ViewPostPage.css";

const AUTHOR_IMAGE =
  "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";

/* ================= TYPES ================= */

interface CommentItem {
  name: string;
  comment: string;
  image: string;
}

/* ================= PAGE ================= */

export default function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, []);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${postId}`
      );
      setPost(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (!post) return null;

  return (
    <>
      {/* ===== Full width image ===== */}
      <img src={post.image} alt={post.title} className="post-image" />

      <div className="view-post-container">
        <div className="post-content-layout">
          {/* ===== MAIN CONTENT ===== */}
          <div>
            <div className="post-meta">
              <span className="post-category">{post.category}</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-GB")}
              </span>
            </div>

            <h1 className="post-title">{post.title}</h1>
            <p className="post-description">{post.description}</p>

            <ReactMarkdown className="markdown">
              {post.content}
            </ReactMarkdown>

            <Share
              likesAmount={post.likes}
              setDialogState={setIsDialogOpen}
            />

            <Comment setDialogState={setIsDialogOpen} />
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="post-sidebar">
            <AuthorBio />
          </aside>
        </div>
      </div>

      <CreateAccountModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
      />
    </>
  );
}

/* ================= SHARE ================= */

function Share({
  likesAmount,
  setDialogState,
}: {
  likesAmount: number;
  setDialogState: (state: boolean) => void;
}) {
  const link = encodeURI(window.location.href);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);

    toast.custom((t) => (
      <div className="toast-success">
        <div>
          <h2>Copied!</h2>
          <p>This article has been copied to your clipboard.</p>
        </div>
        <button onClick={() => toast.dismiss(t)}>
          <X size={18} />
        </button>
      </div>
    ));
  };

  return (
    <div className="share-wrapper">
      <button className="like-btn" onClick={() => setDialogState(true)}>
        <SmilePlus size={18} />
        {likesAmount}
      </button>

      <div className="share-right">
        <button className="copy-btn" onClick={handleCopy}>
          <Copy size={16} />
          Copy link
        </button>

        <a
          className="social facebook"
          href={`https://facebook.com/share.php?u=${link}`}
          target="_blank"
          rel="noreferrer"
        >
          <Facebook size={16} />
        </a>

        <a
          className="social linkedin"
          href={`https://linkedin.com/sharing/share-offsite/?url=${link}`}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={16} />
        </a>

        <a
          className="social twitter"
          href={`https://twitter.com/share?url=${link}`}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter size={16} />
        </a>
      </div>
    </div>
  );
}

/* ================= COMMENT ================= */

function Comment({
  setDialogState,
}: {
  setDialogState: (state: boolean) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentItem[]>([
    {
      name: "Jacob Lash",
      comment:
        "I loved this article! It really explains why my cat is so independent yet loving.",
      image: "https://i.pravatar.cc/40?img=12",
    },
    {
      name: "Ahri",
      comment:
        "Such a great read! I've always wondered why my cat slow blinks at me.",
      image: "https://i.pravatar.cc/40?img=32",
    },
    { name: "Mimi mama", 
      comment: "This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!", 
      image: "https://i.pravatar.cc/40?img=47", },
  ]);

  const handleSend = () => {
    if (!commentText.trim()) return;

    setDialogState(true);

    setComments([
      ...comments,
      {
        name: "Guest User",
        comment: commentText,
        image: "https://i.pravatar.cc/40",
      },
    ]);

    setCommentText("");
  };

  return (
    <div className="comment-section">
      <h3>Comment</h3>

      <Textarea
        placeholder="What are your thoughts?"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onFocus={() => setDialogState(true)}
      />

      <div className="comment-action">
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>

      <div className="comment-list">
        {comments.map((c, i) => (
          <div key={i} className="comment-item">
            <img src={c.image} alt={c.name} />
            <div>
              <strong>{c.name}</strong>
              <p>{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= AUTHOR ================= */

function AuthorBio() {
  return (
    <div className="author-box">
      <span className="author-label">Author</span>
      <div className="author-header">
        <img src={AUTHOR_IMAGE} alt="Author" />
        <strong>Thompson P.</strong>
      </div>
      <p>
        I am a pet enthusiast and freelance writer who specializes in animal
        behavior and care.
      </p>
    </div>
  );
}

/* ================= MODAL ================= */

function CreateAccountModal({
  dialogState,
  setDialogState,
}: {
  dialogState: boolean;
  setDialogState: (state: boolean) => void;
}) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="dialog">
        <AlertDialogTitle>Create an account to continue</AlertDialogTitle>

        <button className="dialog-btn">Create account</button>

        <AlertDialogDescription>
          Already have an account? <a href="/login">Log in</a>
        </AlertDialogDescription>

        <AlertDialogCancel className="dialog-close">
          <X />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* ================= LOADING ================= */

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <Loader2 className="spinner" />
      <p>Loading...</p>
    </div>
  );
}
