'use client';

import { useState } from 'react';
import { Loader2, Send, SmilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogOverlay } from '@/components/ui/dialog';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { toast } from "sonner";

interface FeedbackOption {
  id: number;
  label: string;
  emoji: string;
}

const feedbackOptions: FeedbackOption[] = [
  { id: 1, label: 'Very Calm', emoji: '😌' },
  { id: 2, label: 'A Little Better', emoji: '🙂' },
  { id: 3, label: 'No Change', emoji: '😐' },
  { id: 4, label: 'Anxious', emoji: '😟' },
  { id: 5, label: 'Very Anxious', emoji: '😰' },
];

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackModal({
  open,
  onOpenChange,
}: FeedbackModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedOption) return;

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        mood: feedbackOptions.find(opt => opt.id === selectedOption)?.label,
        moodId: selectedOption,
        comment: comment || null,
        createdAt: serverTimestamp() as Timestamp,
      });
      setIsSubmitted(true);
    } catch {
      toast.error(
        'Error submitting feedback. Please try again later.',
        {
          description: 'We encountered an error while submitting your feedback. Please try again later.',
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedOption(null);
          setComment('');
          setIsSubmitted(false);
        }
        onOpenChange(open);
      }}
    >
      <DialogOverlay className="bg-background/5 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        onEscapeKeyDown={(e) => {
          if (isSubmitted) e.preventDefault();
        }}
        onInteractOutside={(e) => {
          if (isSubmitted) e.preventDefault();
        }}
        className="border border-primary/20 shadow-lg shadow-primary/10"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-60"></div>
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-3xl opacity-60 animate-pulse-slow"></div>
        </div>

        <DialogHeader className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30 rounded-full"></div>
              <SmilePlus className="text-primary relative z-10 h-8 w-8" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            How did you feel after this session?
          </DialogTitle>
        </DialogHeader>

        <div className="relative z-10">
          {!isSubmitted ? (
            <>
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-2 mt-4">
                  {feedbackOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.id)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                        selectedOption === option.id
                          ? 'bg-gradient-to-br from-primary/20 to-secondary/20 scale-110 shadow-md'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      aria-pressed={selectedOption === option.id}
                    >
                      <span className="text-2xl mb-1">{option.emoji}</span>
                      <span className="text-xs text-center">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Tell us more (optional):
                  </p>
                  <Textarea
                    placeholder="I felt lighter... more clear... more present..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none border-primary/20 focus:border-primary/50 focus:ring-primary/50 bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                >
                  Cancel
                </Button>

                <Button
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
                  onClick={handleSubmit}
                  disabled={isLoading || !selectedOption}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 animate-spin" /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2" /> Send Feedback
                    </span>
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="text-lg font-medium">Thank you.</p>
              <p className="text-muted-foreground">
                Your response helps SonicSoal evolve into a healing experience
                that truly resonates.
              </p>
              <p className="text-muted-foreground">
                Stay tuned for personalized frequency journeys coming soon.
              </p>
              {/* New continue button centered below messages */}
              <div className="mt-6">
                <Button
                  onClick={() => onOpenChange(false)}
                  className="px-6 py-2"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
