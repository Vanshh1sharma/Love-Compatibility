import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Compatibility = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [person1, setPerson1] = useState({
    name: "",
    bio: "",
    zodiac: "",
    age: "",
  });
  
  const [person2, setPerson2] = useState({
    name: "",
    bio: "",
    zodiac: "",
    age: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!person1.name || !person1.bio || !person2.name || !person2.bio) {
      toast({
        title: "Missing Information",
        description: "Please fill in names and bios for both people! 💕",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-compatibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ person1, person2 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check compatibility");
      }

      const data = await response.json();
      
      // Navigate to results with the compatibility data
      navigate("/results", { 
        state: { 
          result: data.result,
          person1Name: person1.name,
          person2Name: person2.name 
        } 
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Oops! 💔",
        description: "Something went wrong. Please try again!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 text-primary/20 w-12 h-12 floating-heart" style={{ animationDelay: "0s" }} />
        <Heart className="absolute top-40 right-20 text-secondary/20 w-8 h-8 floating-heart" style={{ animationDelay: "1s" }} />
        <Heart className="absolute bottom-32 left-1/4 text-accent/20 w-10 h-10 floating-heart" style={{ animationDelay: "2s" }} />
        <Heart className="absolute bottom-20 right-1/3 text-primary/20 w-6 h-6 floating-heart" style={{ animationDelay: "1.5s" }} />
        <Sparkles className="absolute top-1/3 right-10 text-accent/30 w-8 h-8 floating-heart" style={{ animationDelay: "0.5s" }} />
        <Sparkles className="absolute bottom-1/3 left-20 text-secondary/30 w-6 h-6 floating-heart" style={{ animationDelay: "2.5s" }} />
      </div>

      <Card className="max-w-4xl w-full p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl glow-card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-primary fill-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Love Compatibility Bot
            </h1>
            <Heart className="w-10 h-10 text-accent fill-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Discover your cosmic love connection! ✨💕
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Person 1 */}
            <div className="space-y-4 p-6 rounded-2xl bg-primary/5 border-2 border-primary/20">
              <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
                <Heart className="w-6 h-6 fill-primary" /> Person 1
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="name1" className="text-base">Name</Label>
                <Input
                  id="name1"
                  placeholder="Enter name..."
                  value={person1.name}
                  onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio1" className="text-base">Bio</Label>
                <Textarea
                  id="bio1"
                  placeholder="Tell us about yourself..."
                  value={person1.bio}
                  onChange={(e) => setPerson1({ ...person1, bio: e.target.value })}
                  className="min-h-[120px] text-base resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age1" className="text-base">Age (Optional)</Label>
                <Input
                  id="age1"
                  type="number"
                  placeholder="Enter age..."
                  value={person1.age}
                  onChange={(e) => setPerson1({ ...person1, age: e.target.value })}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zodiac1" className="text-base">Zodiac Sign (Optional)</Label>
                <Input
                  id="zodiac1"
                  placeholder="e.g., Leo, Pisces..."
                  value={person1.zodiac}
                  onChange={(e) => setPerson1({ ...person1, zodiac: e.target.value })}
                  className="text-base"
                />
              </div>
            </div>

            {/* Person 2 */}
            <div className="space-y-4 p-6 rounded-2xl bg-secondary/5 border-2 border-secondary/20">
              <h2 className="text-2xl font-semibold text-secondary flex items-center gap-2">
                <Heart className="w-6 h-6 fill-secondary" /> Person 2
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="name2" className="text-base">Name</Label>
                <Input
                  id="name2"
                  placeholder="Enter name..."
                  value={person2.name}
                  onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio2" className="text-base">Bio</Label>
                <Textarea
                  id="bio2"
                  placeholder="Tell us about yourself..."
                  value={person2.bio}
                  onChange={(e) => setPerson2({ ...person2, bio: e.target.value })}
                  className="min-h-[120px] text-base resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age2" className="text-base">Age (Optional)</Label>
                <Input
                  id="age2"
                  type="number"
                  placeholder="Enter age..."
                  value={person2.age}
                  onChange={(e) => setPerson2({ ...person2, age: e.target.value })}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zodiac2" className="text-base">Zodiac Sign (Optional)</Label>
                <Input
                  id="zodiac2"
                  placeholder="e.g., Aries, Cancer..."
                  value={person2.zodiac}
                  onChange={(e) => setPerson2({ ...person2, zodiac: e.target.value })}
                  className="text-base"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full text-xl py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Heart className="w-6 h-6 mr-2 animate-pulse" />
                Consulting the Stars...
              </>
            ) : (
              <>
                <Heart className="w-6 h-6 mr-2 fill-white" />
                💘 Check Compatibility
                <Heart className="w-6 h-6 ml-2 fill-white" />
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Compatibility;
