import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, ArrowLeft } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, person1Name, person2Name } = location.state || {};

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-10 left-10 text-primary/30 w-16 h-16 floating-heart fill-primary" style={{ animationDelay: "0s" }} />
        <Heart className="absolute top-32 right-20 text-accent/30 w-12 h-12 floating-heart fill-accent" style={{ animationDelay: "1s" }} />
        <Heart className="absolute bottom-24 left-1/4 text-secondary/30 w-14 h-14 floating-heart fill-secondary" style={{ animationDelay: "2s" }} />
        <Heart className="absolute bottom-40 right-1/3 text-primary/30 w-10 h-10 floating-heart fill-primary" style={{ animationDelay: "1.5s" }} />
        <Sparkles className="absolute top-1/4 right-10 text-accent/40 w-10 h-10 floating-heart" style={{ animationDelay: "0.5s" }} />
        <Sparkles className="absolute bottom-1/4 left-16 text-secondary/40 w-8 h-8 floating-heart" style={{ animationDelay: "2.5s" }} />
        <Heart className="absolute top-1/2 left-1/3 text-primary/20 w-8 h-8 floating-heart fill-primary" style={{ animationDelay: "3s" }} />
        <Heart className="absolute bottom-1/2 right-1/4 text-accent/20 w-12 h-12 floating-heart fill-accent" style={{ animationDelay: "3.5s" }} />
      </div>

      <Card className="max-w-3xl w-full p-8 md:p-12 bg-card/95 backdrop-blur-sm shadow-2xl glow-card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse" />
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
            <Heart className="w-12 h-12 text-accent fill-accent animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Love Compatibility Report
          </h1>
          <p className="text-xl text-muted-foreground">
            {person1Name} 💕 {person2Name}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {result}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="text-lg py-6 px-8 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Try Again with New People
            <Heart className="w-5 h-5 ml-2 fill-white" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Results;
