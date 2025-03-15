
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Flag, UserRound } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies: number;
  userLiked: boolean;
}

interface CharacterCommentProps {
  characterId: string;
  comments: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "SaiyanPride88",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SaiyanPride",
    date: "2 days ago",
    content: "Goku is definitely the best character for beginners. His Kamehameha has such a short cooldown and decent damage. I've been winning a lot of matches with him on my team!",
    likes: 24,
    replies: 3,
    userLiked: false
  },
  {
    id: "2",
    author: "VegetaFan123",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=VegetaFan",
    date: "5 days ago",
    content: "I prefer Vegeta over Goku. His Final Flash does more damage, and his Saiyan Pride ability gives a better attack boost. The only downside is the longer cooldowns.",
    likes: 19,
    replies: 7,
    userLiked: true
  },
  {
    id: "3",
    author: "FusionMaster",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=FusionMaster",
    date: "1 week ago",
    content: "Has anyone tried pairing this character with Piccolo and Gohan? The synergy is amazing, especially when you use Gohan's Father-Son Kamehameha after Piccolo's Hellzone Grenade to finish off weakened enemies.",
    likes: 42,
    replies: 12,
    userLiked: false
  }
];

const CharacterComment: React.FC<CharacterCommentProps> = ({ characterId }) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: "You",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Player",
        date: "Just now",
        content: newComment,
        likes: 0,
        replies: 0,
        userLiked: false
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked
        };
      }
      return comment;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-bold text-lg mb-4">Community Discussion</h3>
      
      <div className="mb-4">
        <Textarea
          placeholder="Share your thoughts about this character..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button 
          onClick={handleSubmitComment} 
          disabled={!newComment.trim() || isSubmitting}
          className="bg-dbz-blue hover:bg-dbz-blue/90"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
      
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <div className="bg-dbz-blue rounded-full flex items-center justify-center h-full overflow-hidden">
                    {comment.avatar ? (
                      <img src={comment.avatar} alt={comment.author} />
                    ) : (
                      <UserRound className="text-white h-5 w-5" />
                    )}
                  </div>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{comment.author}</div>
                  <div className="text-xs text-gray-500">{comment.date}</div>
                </div>
              </div>
              {comment.author === "You" && (
                <Badge variant="outline" className="text-xs">Your Comment</Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
            
            <div className="flex gap-3 text-xs text-gray-500">
              <button 
                className={`flex items-center hover:text-dbz-blue transition-colors ${comment.userLiked ? 'text-dbz-blue font-medium' : ''}`}
                onClick={() => handleLikeComment(comment.id)}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                {comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}
              </button>
              <button className="flex items-center hover:text-dbz-blue transition-colors">
                <MessageSquare className="h-3 w-3 mr-1" />
                {comment.replies} {comment.replies === 1 ? 'Reply' : 'Replies'}
              </button>
              <button className="flex items-center hover:text-dbz-red transition-colors ml-auto">
                <Flag className="h-3 w-3 mr-1" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterComment;
