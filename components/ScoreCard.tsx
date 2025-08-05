import { Card, CardContent } from "@/components/ui/card";

export default function ScoreCard({ score }: { score: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <h3 className="text-xl font-semibold">Resume Score</h3>
        <p className="text-4xl font-bold text-blue-600">{score}/100</p>
      </CardContent>
    </Card>
  );
}
